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
  loadBlogs$?:Observable<BlogPosts[]>
  blogsize=6
  isClicked= false
  constructor(private blogpostService:BlogpostService){}

  ngOnInit(): void {
    this.blogs$ = this.blogpostService.getAllPost(undefined, undefined, this.blogsize, true);
  }
  loadBlogs():void{
    this.isClicked = true
    var context = this;
    context.blogsize+=3;
    setTimeout(function(){
      context.loadBlogs$ = context.blogpostService.getAllPost(undefined, undefined, context.blogsize, true);
      context.isClicked = false
    },2000);
  }
}
