import { Component, OnInit, Input } from '@angular/core';
import { ProductSubmission } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-product-dispplay-card',
  templateUrl: './product-dispplay-card.component.html',
  styleUrls: ['./product-dispplay-card.component.scss']
})
export class ProductDispplayCardComponent implements OnInit {

  constructor(private api: ApiService) { }
  
  @Input() product: ProductSubmission;
  public pics = []

  ngOnInit(): void {
    if (this.product.inhandPhotoURL==="" && this.product.inspectionPhotoURL==="") {
      this.api.getTaoBaoImagesFromID(this.product.ID).subscribe((res: Array<string>) => {
        for(let pic of res) {
          this.pics.push({thumbImage: "https:" + pic})          
        }
        console.log(this.pics);
      })
    }
  }

}
