import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Haul } from 'src/app/models/haul';

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
    //return of({"Yeet": "yeet"})
    return this.http.get<Product>(`${environment.apiURL}url/weidian/${id}`)
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

  getHaulsFromUserID(userID: string) {
    return this.firestore.collection("hauls", ref => ref.where('owner', '==', userID))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          let data = a.payload.doc.data() as Haul;
          let uid = a.payload.doc.id;
          return { uid, ...data }
        }))
      )
  }

  deleteHaulFromID(haulID: string) {
    return this.firestore.collection("hauls").doc(haulID).delete()
      .then(result => {
        console.log("It deleted");
      }).catch(error => {
        console.log("There was an error deleting");
      })
  }

}
