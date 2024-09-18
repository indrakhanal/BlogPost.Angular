import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPosts } from '../models/get-blog-post.model.request';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { GetCategoryRequest } from '../../categories/models/get-category-request.model';
import { CategoryService } from '../../categories/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model.request';
import Swal from 'sweetalert2';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit, OnDestroy {
  editor: Editor | any;
  html?: '' | any;
  id:string | null = null
  singleBlogObj?:BlogPosts
  categories$?:Observable<GetCategoryRequest[]>;
  selectedBlog?:string[];
  paramMapSubscription?:Subscription
  editBlogSubscription?:Subscription
  
  constructor(private blogServices:BlogpostService,
    private catServices:CategoryService,
    private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.editor = new Editor();
    this.paramMapSubscription = this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = params.get("id")
        this.id?this.blogServices.getBlogById(this.id).subscribe({
          next:(res) =>{
            this.singleBlogObj = res
            this.selectedBlog = res.categories.map(x=>x.id)
          },
          error:(err)=>{
            alert(err)
          }
        }):null
      }
    })
    this.categories$ = this.catServices.getCategory();
  }

  ngOnDestroy():void {
    this.paramMapSubscription?.unsubscribe();
    this.editor.destroy();
  }

  onFormSumbit():void{
    const updateBlogRequest: UpdateBlogPost = {
      title:this.singleBlogObj?.title??'',
      urlHandlerget:this.singleBlogObj?.urlHandlerget??'',
      shortDescription:this.singleBlogObj?.shortDescription??'',
      content:this.singleBlogObj?.content??'',
      featureImageUrl:this.singleBlogObj?.featureImageUrl??'',
      publishedDate:this.singleBlogObj?.publishedDate??new Date(),
      author:this.singleBlogObj?.author?? '',
      isVisible:this.singleBlogObj?.isVisible??false,
      categories:this.selectedBlog??new Array()
    }
    this.editBlogSubscription = this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = params.get("id")
        this.id?this.blogServices.updateBlogPost(this.id, updateBlogRequest).subscribe({
          next:(res) =>{
            Swal.fire({  
              position: 'top-end',  
              icon: 'success',  
              title: 'Data Update Successfully!',  
              showConfirmButton: false,  
              timer: 1500
            })  
            this.router.navigateByUrl('/admin/blog-posts')
          },
          error:(err)=>{
            alert(err)
          }
        })
        :null
      }
    })
  }

  onDelete():void{
    if(this.id){
      const context = this.id
      Swal.fire({  
        title: 'Are you sure want to Delete?',  
        text: '!',  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Yes',  
        cancelButtonText: 'No'  
      }).then((result) => {  
        if (result.value) {  
          this.blogServices.deleteBlogPost(context).subscribe({
            next:(res) => {
              Swal.fire({  
                position: 'top-end',  
                icon: 'success',  
                title: 'Data Deleted Successfully!',  
                showConfirmButton: false,  
                timer: 1500  
              })  
              this.router.navigateByUrl('admin/blog-posts')
            },
            error: (err) =>{
              Swal.fire(  
                'Error!',  
                'Something Went Wrong. Please retry.',  
                'error'  
              ) 
            }
          })
        }  
      })  
    }
  }

}
