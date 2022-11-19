
// 1 bookmark can have one category
// where as 1 category can have multiple bookmarks

export interface Bookmark{
    id: number;
    title: string;
    url: string;
    selectedCategoryId: number;
}


export interface Category{
    id: number;
    name: string;
    data: any[];
}