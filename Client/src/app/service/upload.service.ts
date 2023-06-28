import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // private baseUrl = "http://localhost:3000/upload-image"

  private baseUrl = "https://api.imgbb.com/1/upload";
  private apiKey = "6aaf9d24265db1fbb4d98bf1b34017be";



  constructor(private http: HttpClient) { };

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // FormData is a data structure that can be used to store key-value pairs. We use it to build an object which corresponds 
    // to an HTML form with append() method.

    // – We set reportProgress: true to exposes progress events. Notice that this progress event are expensive 
    // (change detection for each event), so you should only use when you want to monitor it.

    // – We call the request(PostRequest) & get() method of HttpClient to send an HTTP POST & Get request to the Node.js 
    // File Upload server.


    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.apiKey}`
      key : this.apiKey
    })

    // console.log(headers)

    // const request = new HttpRequest('POST', `${this.baseUrl}`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // })

    // return this.http.request(request)

    const upload = this.http.post<any>(this.baseUrl, formData, { headers }).pipe(
      map(response => response.image.url)
    )



    return upload

  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}     
