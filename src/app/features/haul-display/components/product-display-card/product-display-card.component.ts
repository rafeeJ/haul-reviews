import { Component, OnInit, Input } from '@angular/core';
import { ProductSubmission } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-product-display-card',
  templateUrl: './product-display-card.component.html',
  styleUrls: ['./product-display-card.component.scss']
})
export class ProductDisplayCardComponent implements OnInit {

  constructor(private api: ApiService) { }
  
  @Input() product: ProductSubmission;
  public pics = []

  ngOnInit(): void {
    if(this.product.inhandPhotoURL != "") {
      this.api.getImgurAlbumFromID(this.product.inhandPhotoURL.match(/\/a\/(\w{5,7})/)[1])
        .subscribe((res:object) => {
        res["data"].forEach(image => {
          this.pics.push({thumbImage: image["link"]})    
        })
      })
    } else if(this.product.inspectionPhotoURL != "") {
      this.api.getImgurAlbumFromID(this.product.inspectionPhotoURL.match(/\/a\/(\w{5,7})/)[1])
        .subscribe((res:object) => {
        res["data"].forEach(image => {
          this.pics.push({thumbImage: image["link"]})    
        })
      })
    } else if (this.product.inhandPhotoURL==="" && this.product.inspectionPhotoURL==="") {
      if (this.product.origin === "TaoBao") {
        this.api.getTaoBaoImagesFromID(this.product.ID).subscribe((res: Array<string>) => {
          for(let pic of res) {
            this.pics.push({thumbImage: "https:" + pic})          
          }
        })
      } else {
        this.pics.push({thumbImage: "https://avatars2.githubusercontent.com/u/33718664?s=200&v=4"})
      }
    }
  }

  visitProduct() {
    switch (this.product.origin) {
      case "TaoBao":
        window.open(`//item.taobao.com/item.htm?id=${this.product.ID}`, '_blank')
        break;
      case "Weidian":
        window.open(`//weidian.com/item.html?itemID=${this.product.ID}`, '_blank')
        break;
      default:
        break;
    }
  }

}
