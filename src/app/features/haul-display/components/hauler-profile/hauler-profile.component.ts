import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/models/user';

@Component({
  selector: 'app-hauler-profile',
  templateUrl: './hauler-profile.component.html',
  styleUrls: ['./hauler-profile.component.scss']
})
export class HaulerProfileComponent implements OnInit {

  constructor() { }

  @Input() profile: Profile;

  ngOnInit(): void {
  }

}
