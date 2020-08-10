import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getProductFromDB(id: number, origin: string) {
    return this.firestore.collection("products", 
      ref => 
        ref.where('ID','==', id)
        .where('origin', '==', origin)).get()
  }

  getHaulfromID(id: string) {
    return this.firestore.collection("hauls").doc(id).get()
  }

  getProfileFromID(id: string) {
    return this.firestore.collection("profiles").doc(id).get()
  }

  getImgurAlbumFromID(id: number) {
    let token = (process.env.IMGUR_ID || environment.imgurID)
    let header = new HttpHeaders().set("Authorization", `Client-ID ${token}`)
    return this.http.get(`https://api.imgur.com/3/album/{{albumHash}}/images`, {headers: header})
  }

}
