import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from './news-service.service';
import { NewsArticle } from './models/news';
import { CreateNewsAppComponent } from './create-news-app/create-news-app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { NewsDetailsComponent } from './news-details/news-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreateNewsAppComponent, NewsListComponent, NewsDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  newsArticles: NewsArticle[] =[]
  error: any;

  ngOnInit() {

  }
}
