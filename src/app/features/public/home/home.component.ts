import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPosts } from '../../blog-post/models/get-blog-post.model.request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  blogs$?:Observable<BlogPosts[]>
  constructor(private blogpostService:BlogpostService){}

  ngOnInit(): void {
    this.blogs$ = this.blogpostService.getAllPost();
  }

}
