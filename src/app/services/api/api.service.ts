import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTaoBaoItemFromID(id: number) {
    return this.http.get<Product>(`${environment.apiURL}url/taobao/${id}`)
  }
  getWeidianItemFromID(id: number) {
    return of({"Yeet": "yeet"})
    //return this.http.get<Product>(`${environment.apiURL}url/taobao/${id}`)
  }
}
