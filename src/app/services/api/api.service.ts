import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

import { pipe, BehaviorSubject } from 'rxjs'
import { map, last, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItemFromID(id: number) {
    const loaded = new BehaviorSubject(false);
    
    const request = new HttpRequest('GET', 
    `${environment.apiURL}TaoBao_Parser?id=${id}`, 
    { reportProgress: true });

    //  Returns an observable<httpevent>
    return this.http.request(request)
    //.pipe(
      // For each httpevent, call the getEventMessage() function
      //map(event => this.getEventMessage(event)),
      
      //tap(message => this.showProgress(message))
      //last()
    //)
    //return this.http.get<Product>(`${environment.apiURL}TaoBao_Parser?id=${id}`)
  }

  // showProgress(message) {
  //   console.log(message)
  // }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Fetching has begun`;
      case HttpEventType.DownloadProgress:
        return `downloaded "${event.loaded}" bytes`;
      case HttpEventType.Response:
        return event.body
      default:
        return `surprising download event: ${event.type}.`;
    }
  }
}
