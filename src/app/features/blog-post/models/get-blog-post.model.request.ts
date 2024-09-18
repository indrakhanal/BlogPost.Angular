import { GetCategoryRequest } from "../../categories/models/get-category-request.model";

export interface BlogPosts {
    id:string,
    title:string,
    shortDescription:string,
    content:string,
    featureImageUrl:string,
    urlHandlerget:string,
    author:string,
    publishedDate:Date,
    isVisible: boolean,
    categories: GetCategoryRequest[]
}