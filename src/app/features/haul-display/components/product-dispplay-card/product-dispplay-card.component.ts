import { Component, OnInit, Input } from '@angular/core';
import { ProductSubmission } from 'src/app/models/product';

@Component({
  selector: 'app-product-dispplay-card',
  templateUrl: './product-dispplay-card.component.html',
  styleUrls: ['./product-dispplay-card.component.scss']
})
export class ProductDispplayCardComponent implements OnInit {

  constructor() { }
  @Input() product: ProductSubmission;

  ngOnInit(): void {
  }

}
