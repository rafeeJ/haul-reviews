import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private firestore: AngularFirestore ) { }

  getTaoBaoItemFromID(id: number) {
    return this.http.get<Product>(`${environment.apiURL}url/taobao/${id}`)
  }
  
  getWeidianItemFromID(id: number) {
    return of({"Yeet": "yeet"})
    //return this.http.get<Product>(`${environment.apiURL}url/taobao/${id}`)
  }

  getHaulfromID(id: string) {
    return this.firestore.collection("hauls").doc(id).get()
  }

  getProfileFromID(id: string) {
    return this.firestore.collection("profiles").doc(id).get()
  }

}
