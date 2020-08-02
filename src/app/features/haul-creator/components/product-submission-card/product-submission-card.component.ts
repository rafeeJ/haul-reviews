import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  constructor() { }

  taobaoLinkControl = new FormControl('', [
    Validators.pattern(/.*[taobao.com|tmall.com].*[?id=\d*]/)
  ]);

  ngOnInit(): void {
  }

  public title: string

  onLostFocus() {
    if(this.taobaoLinkControl.hasError('pattern')) {
      console.log("Please enter valid URL");
      this.title = "VALID URL PLEASE"
    } else {
      this.title = "Thanks bitch"
      //  1. Check if the product is in db
      //  if(db): return product
      //  else: invoke GCP script to parse 
      //  store product in db
      //  return product
    }
    
  }

}
