import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Product, ProductListItem } from 'src/app/models/product';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  constructor(private api: ApiService) { }
  
  @Input() productID: ProductListItem;
  
  public product: Product;

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
  public minimised: boolean = false;

  ngOnInit(): void {
    switch (this.productID.origin) {
      case "TaoBao":
        this.api.getTaoBaoItemFromID(this.productID.ID).subscribe(response => {
          this.product = response
        })
        break;
      case "Weidian":
        this.api.getWeidianItemFromID(this.productID.ID).subscribe(response => {
          console.log(response);
        })
        break;
    
      default:
        break;
    }
    
  }

  onSubmit() {
    // console.log(this.productForm.value);
    return(this.productForm.value);
  }

}
