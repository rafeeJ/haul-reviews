import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-submission-card',
  templateUrl: './product-submission-card.component.html',
  styleUrls: ['./product-submission-card.component.scss']
})
export class ProductSubmissionCardComponent implements OnInit {

  constructor() { }

  taobaoLinkControl = new FormControl('', [
    Validators.pattern(/.*[taobao.com|tmall.com].*[?id=\d*]/)
  ]);

  ngOnInit(): void {
  }

}
