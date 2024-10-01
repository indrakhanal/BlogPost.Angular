import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BlogPosts } from '../models/get-blog-post.model.request';
import { UpdateBlogPost } from '../models/update-blog-post.model.request';


@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http:HttpClient) { }

  addBlogPost(model:AddBlogPost):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/blogPost?addAuth=true`, model)
  }
  getAllPost(sortBy?:string, sortDirection?:string, blogSize?:number, isHome?:boolean):Observable<BlogPosts[]>{
    let params = new HttpParams();
    if(sortBy && sortDirection){
      params = params.set('sortBy', sortBy)
      params = params.set('sortDirection', sortDirection)
    }
    if(isHome===true && blogSize){
      params = params.set('blogSize', blogSize)
      params = params.set('isHome', true)
    }
    return this.http.get<BlogPosts[]>(`${environment.apiBaseUrl}/api/blogPost`, {
      params:params
    })
  }
  getBlogById(id:string):Observable<BlogPosts>{
    return this.http.get<BlogPosts>(`${environment.apiBaseUrl}/api/blogPost/${id}`)
  }

  getBlogByUrl(url:string):Observable<BlogPosts>{
    return this.http.get<BlogPosts>(`${environment.apiBaseUrl}/api/blogPost/${url}`)
  }

  updateBlogPost(id:string, updateObj:UpdateBlogPost):Observable<BlogPosts>{
    return this.http.put<BlogPosts>(`${environment.apiBaseUrl}/api/blogPost/${id}?addAuth=true`, updateObj)
  }

  deleteBlogPost(id:string):Observable<BlogPosts>{
    return this.http.delete<BlogPosts>(`${environment.apiBaseUrl}/api/blogPost/${id}?addAuth=true`)
  }
}
