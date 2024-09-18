import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {
  model : AddCategoryRequest
  private addCategorySubscription?: Subscription

  constructor(private categoryServices: CategoryService,
    private router: Router){
    this.model = {
      name:'',
      urlHandler:''
    }
  }
 
  onFormSumbit (){
    this.addCategorySubscription= this.categoryServices.addCategory(this.model)
    .subscribe({
      next: (response) => {
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: 'Data Added Successfully!',  
          showConfirmButton: false,  
          timer: 1500
        })  
        this.router.navigateByUrl('/admin/categories')
      },
      error:(res) =>{
        alert(res)
      }
    }
    )
  }
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe()
  }
}
