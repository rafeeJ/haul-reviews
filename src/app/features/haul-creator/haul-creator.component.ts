import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductSubmissionCardComponent } from './components/product-submission-card/product-submission-card.component';
import { ProductSubmission, ProductListItem } from 'src/app/models/product';

@Component({
  selector: 'app-haul-creator',
  templateUrl: './haul-creator.component.html',
  styleUrls: ['./haul-creator.component.scss']
})
export class HaulCreatorComponent implements OnInit {

  public products: Array<ProductListItem> = [];
  @ViewChildren("productCard") cardArray: QueryList<ProductSubmissionCardComponent>

  constructor(private api: ApiService) { }

  urlSubmitter = new FormGroup({
    productURL: new FormControl('', [Validators.pattern(/.+(taobao|weidian)\.com.*(itemID|id)=\S+/i)])
  })

  validateURL() {
    if (this.urlSubmitter.valid) {
      let URL: string = this.urlSubmitter.value["productURL"]
      if (URL.toLowerCase().indexOf('weidian') > 0) {
        let listItem: ProductListItem = { ID: Number(URL.match(/(?<=itemID=)\d{5,}/)[0]), origin: "Weidian" }
        this.products.push(listItem)
      } else if (URL.toLowerCase().indexOf('taobao') > 0) {
        let listItem: ProductListItem = { ID: Number(URL.match(/(?<=id=)\d{5,}/)[0]), origin: "TaoBao" }
        this.products.push(listItem)
      }
      this.urlSubmitter.reset()
    }
  }

  submitHaul() {
    let products = this.cardArray.toArray()
    products.forEach(product => {
      let formData = product.onSubmit()
      let productSubmission: ProductSubmission;

      productSubmission.ID = product.productID.ID
      productSubmission.title = product.product.title
      productSubmission.size = formData["productSize"]
      productSubmission.colour = formData["productColour"]
      productSubmission.price = formData["productPrice"]
      productSubmission.weight = formData["productWeight"]
      productSubmission.comments = formData["productComment"]
      productSubmission.inspectionPhotoURL = formData["productInspection"]
      productSubmission.inhandPhotoURL = formData["productPhoto"]
      productSubmission.recommend = formData["productRecommend"]

    })


  }

  ngOnInit(): void {
  }

}
