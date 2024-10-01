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
  totalCount$?:number
  pageSize = 7;
  pageNumber = 1;
  matchPage = 1;
  $sortKey = ''
  numList:number[]= [];
  constructor (private categoryServices: CategoryService){

  }
  ngOnInit(): void {
    this.categoryServices.getCategoryCount().subscribe({
      next:(res)=>{
        this.categories$ = this.categoryServices.getCategory(
          undefined,
          undefined, 
          undefined,
          this.pageSize,
          this.pageNumber
        );
        this.totalCount$ = res;
        this.numList = new Array(Math.ceil(res/this.pageSize))
      }
    })
  }

  onSearch(query:string) {
    this.categories$ = this.categoryServices.getCategory(query)
  }
  sortData(query:string, sortBy:string, sortDirection:string):void{
    this.$sortKey = sortDirection
    this.categories$ = this.categoryServices.getCategory(query, sortBy, sortDirection)
  }

  getPage(pageNumber:number, pageSize:number):void{
    this.matchPage = pageNumber
    this.categories$ = this.categoryServices.getCategory(undefined,
       undefined,
        undefined,
         pageSize,
          pageNumber)
  }

  getNextPage() {
    if(this.matchPage+1 > this.numList.length){
      return
    }
    this.matchPage +=1;
    this.categories$ = this.categoryServices.getCategory(
      undefined,
       undefined,
        undefined,
         this.pageSize,
          this.matchPage
          )

    }
    getPreviousPage() {
    if(this.matchPage ===1){
      return;
    }
    this.matchPage -=1;
    this.categories$ = this.categoryServices.getCategory(
      undefined,
       undefined,
        undefined,
         this.pageSize,
          this.matchPage
      )
    }
}
