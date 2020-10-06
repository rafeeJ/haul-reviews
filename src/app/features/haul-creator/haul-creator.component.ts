import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductSubmissionCardComponent } from './components/product-submission-card/product-submission-card.component';
import { Product, ProductListItem, ProductSubmission } from 'src/app/models/product';
import { HaulCreatorService } from './services/haul-creator.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import * as faker from 'faker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-haul-creator',
  templateUrl: './haul-creator.component.html',
  styleUrls: ['./haul-creator.component.scss']
})
export class HaulCreatorComponent implements OnInit {

  constructor(private api: ApiService,
    private hauls: HaulCreatorService,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  public products: Array<ProductListItem> = [];
  private user: User;
  public hasError = false;
  public deleted: Array<number> = [];
  @ViewChildren("productCard") cardArray: QueryList<ProductSubmissionCardComponent>

  urlSubmitter = new FormGroup({
    productURL: new FormControl('', [Validators.pattern(/.+(taobao|weidian)\.com.*(itemID|id)=\S+/i), Validators.required])
  })

  deleteItem($event) {
    this.deleted.push($event)
  }

  validateURL() {
    if (this.urlSubmitter.valid) {
      let URL: string = this.urlSubmitter.value["productURL"]
      if (URL.toLowerCase().indexOf('weidian') > 0) {
        let ID = Number(URL.match(/itemID=([\d]+)/)[1])
        this.api.getWeidianItemFromID(ID)
          .subscribe(response => {
            let product = response as Product
            this.products.push(product)
            this._snackBar.open(`Added ${product.title} successfully`, "Ok", {
              duration: 2000,
            });
          })
      } else if (URL.toLowerCase().indexOf('taobao') > 0) {
        let ID = Number(URL.match(/id=([\d]+)/)[1])
        let origin = "TaoBao"
        this.api.getProductFromDB(ID, origin)
          .subscribe(res => {
            // If it does not exist in the DB
            if (res.docs.length === 0) {
              // Scrape it from TaoBao
              this.api.getTaoBaoItemFromID(ID)
                .subscribe(response => {
                  // If response is rip, then the item no longer exists on TaoBao.
                  if (response === "rip") {
                    return false;
                  } else {
                    let product = response as Product
                    this.products.push(product)
                    this._snackBar.open(`Added ${product.title} successfully`, "Ok", {
                      duration: 2000,
                    });
                    this.hauls.createProduct(response)
                  }
                })
              // Otherwise, return it from the Database. 
            } else {
              //console.debug("Getting from DB")
              let product = res.docs[0].data() as Product
              this.products.push(product)
              this._snackBar.open(`Added ${product.title} successfully`, "Ok", {
                duration: 2000,
              });
            }
          });
      }
      this.urlSubmitter.reset()
    }
  }

  submitHaul(haulName) {
    let products = this.cardArray.toArray()
    let haulItems = [];

    // For each Product Card component that exists
    for (const [idx, product] of products.entries()) {
      //console.log(`Index is: ${idx} and product is ${product.product.title}`);
      if (!this.deleted.includes(idx)) {
        // If this given product is invalid, note it.
        if (!product.productForm.valid) {
          product.hasError = true
          this.hasError = true
          break;
        } else {
          console.log(product.hasError);
          product.hasError = false
          // If everything is valid, submit it
          var formData = product.onSubmit()
          haulItems.push(formData)
        }
      } else {
        console.log("Skipped");
      }
    }

    if (!this.hasError) {
      let data = {}
      data["title"] = haulName || `${faker.hacker.adjective()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`
      data["productList"] = haulItems
      data["owner"] = this.user.uid

      this.hauls.createHaul(data)
        .then(res => {
          //console.log(res.id);
          this.router.navigate([`/haul/${res.id}`])
        })
    }
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(res => this.user = res)
  }

}
