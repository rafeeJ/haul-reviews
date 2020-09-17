import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Haul } from 'src/app/models/haul';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-hauls',
  templateUrl: './my-hauls.component.html',
  styleUrls: ['./my-hauls.component.scss']
})
export class MyHaulsComponent implements OnInit {

  constructor(private api: ApiService,
              private auth: AuthService,
              public dialog: MatDialog) { }

  private user: User;
  public hauls: Array<any> = [];

  ngOnInit(): void {
    this.auth.user$.subscribe(res => {
      this.user = res
      this.loadHauls()
    })    
  }

  loadHauls() {
    this.api.getHaulsFromUserID(this.user.uid)
      .subscribe(res => {
        this.hauls = res
      })
  }

  delete(productId) {
    this.dialog.open(EditDialogComponent,
      { data: {
        id: productId
      }
    });
  }
}
