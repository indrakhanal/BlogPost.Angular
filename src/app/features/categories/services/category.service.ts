import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetCategoryRequest } from '../models/get-category-request.model';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories?addAuth=true`, model)
  }

  getCategory(query?:string, sortBy?:string, sortDirection?:string,
    pageSize?:number, pageNumber?:number):Observable<GetCategoryRequest[]>{
    let params = new HttpParams();
    if(query){
      params = params.set('FilterQuery', query)
    }
    if(sortBy && sortDirection){
      params = params.set('sortBy', sortBy)
      params = params.set('sortDirection', sortDirection)
    }
    if(pageSize){
      params = params.set('pageSize', pageSize)
    }
    if(pageNumber){
      params = params.set('pageNumber', pageNumber)
    }
    return this.http.get<GetCategoryRequest[]>(`${environment.apiBaseUrl}/api/categories`, {
      params:params
    })
  }

  getCategoryById(id:string):Observable<GetCategoryRequest>{
    return this.http.get<GetCategoryRequest>(`${environment.apiBaseUrl}/api/categories/${id}`)
  }

  updateCategory(id:string, updateObj:UpdateCategoryRequest):Observable<GetCategoryRequest>{
    return this.http.put<GetCategoryRequest>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`, updateObj)
  }
  
  deleteCategory(id:string):Observable<GetCategoryRequest>{
    return this.http.delete<GetCategoryRequest>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`)
  }

  getCategoryCount():Observable<number>{
    return this.http.get<number>(`${environment.apiBaseUrl}/api/categories/count?addAuth=true`)
  }
}
