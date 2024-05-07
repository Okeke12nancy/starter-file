import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsArticle } from '../models/news';
import { NewsServiceService } from '../news-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-news-app',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './create-news-app.component.html',
  styleUrl: './create-news-app.component.css'
})
export class CreateNewsAppComponent {
    @Output() isModalClose = new EventEmitter <boolean>()
  newsArticles: any = [];
  isLoading: boolean = false;

  newArticle: any = {
    title: '',
    content: '',
    author: '',
    imageUrl: '',
  };


  constructor(
    private newsService: NewsServiceService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    // console.log(this.newArticle);
  }

  isEmpty(value: string | null): boolean {
    return value === '' || value === null;
  }

  onSubmit() {
    // console.log(this.newArticle);
    if (
      this.isEmpty(this.newArticle.title) ||
      this.isEmpty(this.newArticle.content) ||
      this.isEmpty(this.newArticle.author) ||
      this.isEmpty(this.newArticle.imageUrl)
    ) {
      this.toastr.warning(
        'Please fill in all required fields: Title, Content, and Author.'
      );
      return; // Prevent further processing if fields are empty
    } else {
      console.log(this.newArticle);
      const article: any = {
        title: this.newArticle.title,
        content: this.newArticle.content,
        author: this.newArticle.author,
        // date: new Date(),
        imageUrl: this.newArticle.imageUrl,
      };
      // console.log(article);
      this.isLoading = true;
      this.newsArticles.push(article);
      this.newsService.createNews({data : article}).subscribe(() => {
        this.newArticle.title = '';
        this.newArticle.content = '';
        this.newArticle.author = '';
        this.newsArticles.imageUrl = '';
        this.isLoading = false;
        this.closeModal()
      });
      this.toastr.success('Article Created');
    }
  }

  closeModal() {
    this.isModalClose.emit(false)
  }

}
