import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
// import { NewsArticle } from '../app/models';
import {NewsArticle} from '../app/models/news'
import { switchMap, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class NewsServiceService {

   apiUrl = 'http://127.0.0.1:1337/api/news-apps';

  private newsSubject = new BehaviorSubject<any>([]);
  news$: Observable<any> = this.newsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getNews().subscribe(news => {
      this.newsSubject.next(news);
    });
  }

  createLocalState(news: any){
    return this.newsSubject.next(news)
  }

  getLocalState(): Observable<any> {
  return this.newsSubject.asObservable();
}

  createNews(news: any): Observable<NewsArticle> {
    return this.http.post<any>('http://127.0.0.1:1337/api/news-apps', news, httpOptions);
  }

  // this is the get news that works with the endpoint
  getNews(): Observable<any> {
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get<any>('http://127.0.0.1:1337/api/news-apps' ))
    );
    // return this.http.get<any>('http://127.0.0.1:1337/api/news-apps' );
  }

// Get a specific news article by ID
  getNewsById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    
    return this.http.get<any>(url);
  }

  // Update an existing news article
  updateNews(id:number, news: any): Observable<NewsArticle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, news, httpOptions);
  }

  // Delete a news article by ID
  deleteNews(id: number): Observable<any> {
    // const url = `${this.apiUrl}/${id}`;
    console.log(id)
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

