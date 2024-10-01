import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogpostService } from '../services/blogpost.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../categories/services/category.service';
import { GetCategoryRequest } from '../../categories/models/get-category-request.model';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  editor: Editor | any;
  html?: '' | any;
  model:AddBlogPost
  categories$?:Observable<GetCategoryRequest[]>;
  private addBlogPostSubscription?: Subscription
  constructor(private blogPostServices: BlogpostService,
    private router:Router,
    private categoryServices: CategoryService){
    this.model = {
      title:'',
      shortDescription: '',
      content:'',
      urlHandlerget:'',
      featureImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate: new Date(),
      categories:[]
    }
  }



  ngOnInit(): void {
    this.editor = new Editor();
    this.categories$ = this.categoryServices.getCategory();
  }
  onFormSumbit():void{
    this.addBlogPostSubscription = this.blogPostServices.addBlogPost(this.model).subscribe({
      next:(res) =>{
        console.log(res)
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: 'Post Added Successfully!',  
          showConfirmButton: false,  
          timer: 1500
        })  
        this.router.navigateByUrl('admin/blog-posts')
      },
      error:(err) =>{
        console.log(err)
      }
    })

  }

  ngOnDestroy(): void {
    this.editor?.destroy()
  }
}
