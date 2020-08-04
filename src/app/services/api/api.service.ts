import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItemFromID(id: number) {
    return this.http.get<Product>(`${environment.apiURL}TaoBao_Parser?id=${id}`)
  }
}
