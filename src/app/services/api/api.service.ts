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

  getTaoBaoImagesFromID(id: number) {
    return this.http.get(`${environment.apiURL}url/taobao/${id}/images`)
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

  getImgurAlbumFromID(hash: string) {    
    let token = environment.imgurID
    let header = new HttpHeaders().set("Authorization", `Client-ID ${token}`)
    return this.http.get(`https://api.imgur.com/3/album/${hash}/images`, {headers: header})
  }

}
