import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import {GetCategoryRequest} from '../models/get-category-request.model'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  // categories?:GetCategoryRequest[]
  categories$?:Observable<GetCategoryRequest[]>;
  constructor (private categoryServices: CategoryService){

  }
  ngOnInit(): void {
   this.categories$ = this.categoryServices.getCategory()
  }
}
