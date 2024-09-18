import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPosts } from '../models/get-blog-post.model.request';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit  {

  $blogPosts?:Observable<BlogPosts[]>;
  constructor (private blogPostServices: BlogpostService){

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.$blogPosts = this.blogPostServices.getAllPost();
  }

}
