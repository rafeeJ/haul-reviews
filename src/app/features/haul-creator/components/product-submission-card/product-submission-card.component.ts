import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  @Input() productID: number;
  public product: Product;

  constructor(private api: ApiService) {
  }

  productForm = new FormGroup({
    productSize: new FormControl(''),
    productColour: new FormControl(''),
    productPrice: new FormControl(''),
    productWeight: new FormControl(''),
    productComment: new FormControl(''),
    productInspection: new FormControl(''),
    productPhoto: new FormControl(''),
    productRecommend: new FormControl(''),
  })

  public title: string;
  public validURL: boolean = false;
  
  taobaoLinkControl = new FormControl('', [
    //Validators.pattern(/.*[taobao.com|tmall.com].*[?id=\d*]/),
    Validators.pattern(/.+(taobao|tmall)\.com.*(id=\S+)/),
    Validators.required
  ]);

  validateURL(URL: string) {
    if(this.taobaoLinkControl.hasError('required')) {
      console.log("enter a URL please");
      this.validURL = false;
    } else if(this.taobaoLinkControl.hasError('pattern')) {
      console.log("enter a valid taobao URL");
      this.validURL = false;
    } else if(!this.taobaoLinkControl.hasError('required') && !this.taobaoLinkControl.hasError('pattern')){
      this.validURL = true;
      this.api.getItemFromID(Number(URL.match(/(?<=id=)\d{5,}/)[0]))
       .subscribe(response => {
        this.product = response
       })
    }
  }

  ngOnInit(): void {
    this.api.getItemFromID(this.productID).subscribe(response => {
      this.product = response
    })
  }

  

  onSubmit() {
    console.log(this.productForm.value)
  }

}
