import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, Profile } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {

  constructor(private auth: AuthService, private api: ApiService) { }

  public profile: Profile;

  profileEditor = new FormGroup({
    displayName: new FormControl(''),
    build: new FormControl(''),
    height: new FormControl(''),
    public: new FormControl('')
  })

  ngOnInit(): void {
    this.auth.user$
      .subscribe((res: User) => {
        this.api.getProfileFromID(res.uid)
          .subscribe(res => {
            this.profile = res.data() as Profile
            console.debug(this.profile);
        })
      })
  }

  makeChanges() {
    console.debug(this.profileEditor.value);
    this.api.updateProfileData(this.profile.uid, this.profileEditor.value)
  }

}
