import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Product, ProductListItem, ProductSubmission } from 'src/app/models/product';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  constructor(private api: ApiService) { }
  
  @Input() productDetails: ProductListItem;
  public product: Product;
  public inHand = false;

  productForm = new FormGroup({
    productSize: new FormControl(''),
    productColour: new FormControl(''),
    productPrice: new FormControl('', [Validators.pattern(/[\d]+/)]),
    productWeight: new FormControl('', [Validators.pattern(/[\d]+/)]),
    productComment: new FormControl(''),
    productInspection: new FormControl(''),
    productPhoto: new FormControl(''),
    productRecommend: new FormControl(''),
  })

  public minimised: boolean = false;

  ngOnInit(): void {
    switch (this.productDetails.origin) {
      case "TaoBao":
        this.api.getTaoBaoItemFromID(this.productDetails.ID).subscribe(response => {
          this.product = response
        })
        break;
      case "Weidian":
        this.api.getWeidianItemFromID(this.productDetails.ID).subscribe(response => {
          console.log(response);
        })
        break;
      default:
        break;
    }
    
  }

  onSubmit() {
    // console.log(this.productForm.value);
    let formData = this.productForm.value
    let submission = {}

      submission["ID"] = this.product.ID
      submission["title"] = this.product.title;
      submission["origin"] = this.productDetails.origin
      submission["size"] = formData["productSize"]
      submission["colour"] = formData["productColour"]
      submission["price"] = formData["productPrice"]
      submission["weight"] = formData["productWeight"]
      submission["comments"] = formData["productComment"]
      submission["inspectionPhotoURL"] = formData["productInspection"]
      submission["inhandPhotoURL"] = formData["productPhoto"]
      submission["recommend"] = formData["productRecommend"]
    
    return(submission);
  }

}
