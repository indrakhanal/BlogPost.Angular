import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { AddCategoryComponent } from './features/categories/add-category/add-category.component';
import { EditCategoryComponent } from './features/categories/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogComponent } from './features/blog-post/edit-blog/edit-blog.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailComponent } from './features/public/blog-detail/blog-detail.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './features/auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'blog/:url',
    component:BlogDetailComponent
  },
  {
    path:'admin/categories',
    component: CategoryListComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/categories/add',
    component:AddCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/blog-posts',
    component:BlogpostListComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/blog-posts/add',
    component: AddBlogpostComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/blog-posts/:id',
    component:EditBlogComponent,
    canActivate: [authGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
