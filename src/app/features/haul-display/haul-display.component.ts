import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Title, Meta } from '@angular/platform-browser';
import { Profile } from 'src/app/models/user';
import { Haul } from 'src/app/models/haul';
//import { MetafrenzyService } from 'ngx-metafrenzy';

@Component({
  selector: 'app-haul-display',
  templateUrl: './haul-display.component.html',
  styleUrls: ['./haul-display.component.scss']
})
export class HaulDisplayComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private api: ApiService,
              private title: Title,
              private meta: Meta
              //private readonly meta: MetafrenzyService
              ) {
               }

  public haul: Haul;
  public creatorProfile: Profile;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let haulID = params.get("haulId")
      if(params.get("haulId")) {
        this.api.getHaulfromID(haulID).subscribe(res => {
          console.debug(res.data());
          this.haul = res.data() as Haul
          this.getProfileData(res.data()["owner"])
          this.title.setTitle(this.haul.title)
          this.meta.addTags([
            {property: 'og:title', content: this.haul.title},
            {property: 'og:url', content: `https://www.reviewmyrep.fashion/haul/${haulID}`},
            {property: 'og:image', content: `https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s800-c85.jpg`},
            {property: 'og:type', content: 'article'},
          ])
        })
      }
    })
  }

  getProfileData(id) {
    this.api.getProfileFromID(id).subscribe(res => {
      this.creatorProfile = res.data() as Profile
      this.meta.addTag({property: 'og:description', content: `Click to checkout the haul from ${this.creatorProfile.displayName}`})
    })
  }

}
