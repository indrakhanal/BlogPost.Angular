import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  getCategory():Observable<GetCategoryRequest[]>{
    return this.http.get<GetCategoryRequest[]>(`${environment.apiBaseUrl}/api/categories`)
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
}
