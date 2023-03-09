import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlShortnerService {
  serviceUrl: string = '';
  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:8080/url/shortner';
  }

  getShortUrl(url: string) {
    return this.http.post<any>(this.serviceUrl, url);
  }

  getUrls() {
    return this.http.get<any>(this.serviceUrl);
  }

  updateTotalVisits(id: number) {
    return this.http.patch<any>(this.serviceUrl + '/' + id, id);
  }

  deleteUrl(id: number) {
    return this.http.delete<any>(this.serviceUrl + '/' + id);
  }
}
