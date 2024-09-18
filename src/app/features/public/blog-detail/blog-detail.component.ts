import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPosts } from '../../blog-post/models/get-blog-post.model.request';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  url:string | null=null;
  $blogdetail?:Observable<BlogPosts>
  $blogpostList?:Observable<BlogPosts[]>
  constructor(private route:ActivatedRoute, private blogpostService: BlogpostService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        this.url = params.get('url');
      }
    })
    if(this.url){
      this.$blogdetail = this.blogpostService.getBlogByUrl(this.url)
      this.$blogpostList = this.blogpostService.getAllPost()
    }
  }

  getDetailPost():void{
    this.route.paramMap.subscribe({
      next:(params) =>{
        this.url = params.get('url');
        if(this.url){
          this.$blogdetail = this.blogpostService.getBlogByUrl(this.url)
          this.$blogpostList = this.blogpostService.getAllPost()
        }
      }
    })
  }
}
