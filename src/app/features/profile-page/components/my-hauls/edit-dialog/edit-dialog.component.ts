import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private api: ApiService,
              public dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {
  }

  deleteHaul() {
    this.api.deleteHaulFromID(this.data["id"])
    this.dialogRef.close()
  }

}
