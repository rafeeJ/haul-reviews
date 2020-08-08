import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-haul-display',
  templateUrl: './haul-display.component.html',
  styleUrls: ['./haul-display.component.scss']
})
export class HaulDisplayComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private api: ApiService) { }

  public haul;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let haulID = params.get("haulId")
      if(params.get("haulId")) {
        this.api.getHaulfromID(haulID).subscribe(res => {
          console.log(res.data());
          this.haul = res.data()
        })
      }
    })
  }

}
