import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-haul-creator',
  templateUrl: './haul-creator.component.html',
  styleUrls: ['./haul-creator.component.scss']
})
export class HaulCreatorComponent implements OnInit {

  public products: Array<Number> = [];

  constructor(private api: ApiService) { }

  urlSubmitter = new FormGroup({
    productURL: new FormControl('', [Validators.pattern(/.+(taobao|tmall)\.com.*(id=\S+)/)])
  })

  onSubmit() {
    if(this.urlSubmitter.valid) {
      let ID = Number(this.urlSubmitter.value["productURL"].match(/(?<=id=)\d{5,}/)[0])
      this.products.push(ID)
      this.urlSubmitter.reset()
    } 
  }

  ngOnInit(): void {
  }

}
