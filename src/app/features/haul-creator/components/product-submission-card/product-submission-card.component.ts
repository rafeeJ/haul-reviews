import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Product } from 'src/app/models/product';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  constructor(private api: ApiService) { }

  public title: string;
  public validURL: boolean = false;
  public product;

  public loading: boolean = null;

  taobaoLinkControl = new FormControl('', [
    //Validators.pattern(/.*[taobao.com|tmall.com].*[?id=\d*]/),
    Validators.pattern(/.+(taobao|tmall)\.com.*(id=\S+)/),
    Validators.required
  ]);

  validateURL(URL: string) {
    if (this.taobaoLinkControl.hasError('required')) {
      console.log("enter a URL please");
      this.validURL = false;
    } else if (this.taobaoLinkControl.hasError('pattern')) {
      console.log("enter a valid taobao URL");
      this.validURL = false;
    } else if (!this.taobaoLinkControl.hasError('required') && !this.taobaoLinkControl.hasError('pattern')) {
      this.validURL = true;
      this.fillForm(URL)
    }
  }

  fillForm(URL: string) {
    this.api.getItemFromID(Number(URL.match(/(?<=id=)\d{5,}/)[0]))
      .subscribe(response => {
        if (response.type == HttpEventType.Sent) {
          this.loading = true;
        }
        if (response.type == HttpEventType.Response) {
          this.product = response.body
          this.loading = false;
        }
      })

  }

  ngOnInit(): void {
  }



  submit() {

  }

}
