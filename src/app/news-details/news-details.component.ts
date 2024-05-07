import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsServiceService } from '../news-service.service';
import { NewsListComponent } from '../news-list/news-list.component';
import { CreateNewsAppComponent } from '../create-news-app/create-news-app.component';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [
    NewsListComponent,
    CreateNewsAppComponent,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css',
})
export class NewsDetailsComponent {
  newsArticles: any = [];
  deleteModalOpen: boolean = false;
  editModalOpen: boolean = false;
  articleId: any = '';
  articleDetails: any = {};

  constructor(
    private newsService: NewsServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const articleId = params['id'];
      this.newsService.getNewsById(articleId).subscribe((latestNews) => {
        this.articleDetails = latestNews.data.attributes;
        console.log(this.articleDetails.imageUrl);
      });
    });
  }

  deleteNews() {
    this.route.params.subscribe((params) => {
      const articleId = params['id'];
      this.newsService.deleteNews(articleId).subscribe(() => {
        this.newsArticles = this.newsArticles.filter(
          (news: any) => news.id !== articleId
        );
        this.router.navigate(['']);
        this.toastr.success('Article Deleted');
      });
    });
  }

  edit() {
    this.editModalOpen = true;
  }

  backToHomepage() {
    this.router.navigate(['']);
  }

  editNews() {
    this.route.params.subscribe((params) => {
      const articleId = params['id'];
      this.newsService.updateNews(articleId, {data:this.articleDetails}).subscribe(() => {
        this.editModalOpen = false;
        this.toastr.success('Article Updated ');
      });
    });
  }

  deleteModalToggle(open: boolean) {
    this.deleteModalOpen = open;
  }
  cancel() {
    this.deleteModalOpen = false;
  }
  deleteConfirm() {
    this.deleteModalOpen = true;
  }
}
