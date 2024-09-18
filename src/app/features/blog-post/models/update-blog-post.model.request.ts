export interface UpdateBlogPost {
    title:string,
    shortDescription:string,
    content:string,
    featureImageUrl:string,
    urlHandlerget:string,
    author:string,
    publishedDate:Date,
    isVisible: boolean,
    categories: string[]
}