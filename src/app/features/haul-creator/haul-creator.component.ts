import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductSubmissionCardComponent } from './components/product-submission-card/product-submission-card.component';
import { Product, ProductListItem, ProductSubmission } from 'src/app/models/product';
import { HaulCreatorService } from './services/haul-creator.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-haul-creator',
  templateUrl: './haul-creator.component.html',
  styleUrls: ['./haul-creator.component.scss']
})
export class HaulCreatorComponent implements OnInit {

  constructor(private api: ApiService, 
              private hauls: HaulCreatorService, 
              private auth: AuthService,
              private router: Router) { }

  public products: Array<ProductListItem> = [];
  private user: User;
  @ViewChildren("productCard") cardArray: QueryList<ProductSubmissionCardComponent>

  urlSubmitter = new FormGroup({
    productURL: new FormControl('', [Validators.pattern(/.+(taobao|weidian)\.com.*(itemID|id)=\S+/i)])
  })

  validateURL() {
    if (this.urlSubmitter.valid) {
      let URL: string = this.urlSubmitter.value["productURL"]
      if (URL.toLowerCase().indexOf('weidian') > 0) {
        let listItem: ProductListItem = { ID: Number(URL.match(/itemID=([\d]+)/)[1]), origin: "Weidian" }
        this.products.push(listItem)
      } else if (URL.toLowerCase().indexOf('taobao') > 0) {
        let listItem: ProductListItem = { ID: Number(URL.match(/id=([\d]+)/)[1]), origin: "TaoBao" }
        this.products.push(listItem)
      }
      this.urlSubmitter.reset()
    }
  }

  submitHaul(haulName) {
    let products = this.cardArray.toArray()
    let haulItems = [];
    // For each Product Card component that exists
    products.forEach(product => {
      var formData = product.onSubmit()
      haulItems.push(formData)
    })

    if(haulName) {
      let data = {}
      data["title"] = haulName
      data["productList"] = haulItems
      data["owner"] = this.user.uid
      this.hauls.createHaul(data)
        .then(res => {
          console.log(res.id);
          this.router.navigate([`/haul/${res.id}`])
        })
    }
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(res => this.user = res)
  }

}
