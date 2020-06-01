import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: string = 'http://localhost:8084';

  constructor(private http: HttpClient) { }

  public getResource(url) {
    return this.http.get(this.host + url);
  }


  uploadPhotoProduct(file, idProduct): Observable<any> {
    const formdata = new FormData();
    console.log(idProduct);
    formdata.append('image', file);
    /* const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idProduct, formdata, {
       reportProgress: true,
       responseType: 'text'
     });*/
    return this.http.post(this.host + '/uploadPhoto/' + idProduct.id, formdata);
    //return this.http.post(this.host + '/Test', { test: "test" });



  }
}
