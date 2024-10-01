import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, Event as NavigationEvent } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { SearchBlogPosts } from '../../models/blog-search.models';
import { Observable } from 'rxjs';
import { BlogPosts } from 'src/app/features/blog-post/models/get-blog-post.model.request';
import { BlogpostService } from 'src/app/features/blog-post/services/blogpost.service';
import { HttpRequest } from '@angular/common/http';
import {filter} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  query:string = ''
  url:string | null=null
  suggestions:SearchBlogPosts[] = []
  user?:User; 
  $blogdetail?:Observable<BlogPosts>
  $blogpostList?:Observable<BlogPosts[]>
  $isVisualization:boolean = false
  $currentUrl:string=''
  constructor(private authService: AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private blogpostService:BlogpostService,
    private titleService: Title){
    }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event:NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event:NavigationEnd) => {
         this.$currentUrl = event.urlAfterRedirects
         if(this.$currentUrl === '/visualization-d3'){
          this.$isVisualization = true
          this.titleService.setTitle('Visualization D3');
         }else if(this.$currentUrl === '/'){
          this.titleService.setTitle('Home')
         }
         else{
          this.titleService.setTitle('blog post');
         }
      });
   
    this.authService.user().subscribe({
      next:(response) => {
        this.user= response
      }
    })
    this.user = this.authService.getUser()
  }

  onQueryChange(){
    if(this.query.length>1){
      this.authService.searchBlog(this.query).subscribe({
        next:(res) =>{
          this.suggestions = res;
        }
      })
    }else{
      this.suggestions = []
    }
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  getDetailPostSearch(url:string) {
    this.route.paramMap.subscribe({
      next:(params) =>{
        // this.url = params.get('url');
        if(url){
          // this.$blogdetail = this.blogpostService.getBlogByUrl(this.url)
          // this.$blogpostList = this.blogpostService.getAllPost()
          window.location.href = url;
        }
      }
    })
    }

}
