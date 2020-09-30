import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { Product, ProductListItem, ProductSubmission } from 'src/app/models/product';
import { HaulCreatorService } from '../../services/haul-creator.service';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  constructor(private api: ApiService, private sneaker: HaulCreatorService) { }

  @Input() product: Product;

  public inHand = false;
  public hasError = false;

  productForm = new FormGroup({
    productSize: new FormControl(''),
    productColour: new FormControl(''),
    productPrice: new FormControl('', [Validators.pattern(/[\d]+/), Validators.required]),
    productWeight: new FormControl('', [Validators.pattern(/[\d]+/)]),
    productComment: new FormControl(''),
    productInspection: new FormControl('', [Validators.pattern(/(https?:\/\/w{0,3}.?)?imgur.com\/a\/(.{5,7})\/?/)]),
    productPhoto: new FormControl('', [Validators.pattern(/(https?:\/\/w{0,3}.?)?imgur.com\/a\/(.{5,7})\/?/)]),
    productRecommend: new FormControl(''),
  })

  public minimised: boolean = false;

  ngOnInit(): void {
  }

  onSubmit() {
    let formData = this.productForm.value
    let submission = {}

    submission["ID"] = this.product.ID
    submission["title"] = this.product.title;
    submission["origin"] = this.product.origin

    submission["size"] = formData["productSize"]
    submission["colour"] = formData["productColour"]
    submission["price"] = formData["productPrice"]

    submission["weight"] = formData["productWeight"]
    submission["inspectionPhotoURL"] = formData["productInspection"]

    submission["inHand"] = this.inHand;
    submission["inhandPhotoURL"] = formData["productPhoto"]
    submission["recommend"] = formData["productRecommend"]

    submission["comments"] = formData["productComment"]

    return (submission);
  }

}
