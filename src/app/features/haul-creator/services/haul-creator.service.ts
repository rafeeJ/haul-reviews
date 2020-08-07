import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HaulCreatorService {

  constructor( private firestore: AngularFirestore ) { }

  createHaul(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("hauls")
        .add(data)
        .then(res => {}, err => reject(err))
    })
  }
}
