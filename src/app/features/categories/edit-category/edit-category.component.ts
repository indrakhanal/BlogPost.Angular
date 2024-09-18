import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { GetCategoryRequest } from '../models/get-category-request.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  id:string | null = null
  paramMapSubscription?:Subscription
  editCategorySubscription?:Subscription
  singleCategory?:GetCategoryRequest
  constructor(private route:ActivatedRoute, 
    private categoryServices: CategoryService,
    private router:Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = params.get('id')
        this.id?this.categoryServices.getCategoryById(this.id)
        .subscribe({
          next:(res) =>{
            this.singleCategory = res
          },
          error:(err) => {
            alert(err)
          }
        })
        :null
      }
    })
  }

  onFormSumbit():void{
    const updateCategoryRequest: UpdateCategoryRequest = {
      name:this.singleCategory?.name ?? '',
      urlHandler: this.singleCategory?.urlHandler ?? ''
    }
    this.editCategorySubscription = this.route.paramMap.subscribe({
      next:(params) =>{
        this.id = params.get("id");
        this.id?this.categoryServices.updateCategory(this.id, updateCategoryRequest).subscribe({
          next:(res)=>{
            Swal.fire({  
              position: 'top-end',  
              icon: 'success',  
              title: 'Data Update Successfully!',  
              showConfirmButton: false,  
              timer: 1500
            })  
            this.router.navigateByUrl('/admin/categories')
          },
          error:(err) =>{
            alert(err)
          }
        })
        :null
      }
    })

  }
  ngOnDestroy():void {
    this.paramMapSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
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
          this.categoryServices.deleteCategory(context).subscribe({
            next:(res) => {
              Swal.fire({  
                position: 'top-end',  
                icon: 'success',  
                title: 'Data Deleted Successfully!',  
                showConfirmButton: false,  
                timer: 1500  
              })  
              this.router.navigateByUrl('admin/categories')
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
