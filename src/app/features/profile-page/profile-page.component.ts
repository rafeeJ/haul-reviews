import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  selected: number

  ngOnInit(): void {
    this.route.fragment.subscribe(res => {
      if(res === "profile") {
        this.selected = 0
      } else {
        this.selected = 1
      }
    })
  }

}
