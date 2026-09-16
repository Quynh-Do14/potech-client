export interface CategoryProductInterface {
    id?: number;
    name: string;
    image: string;
    index: number;
    slug: string
    title: string;
    description: string;
    content: string;
    keyword: SEOCategoryKeyword[];
    created_at: string;
    updated_at: string;
}

export interface CategoryProductParams {
    page?: number;
    limit?: number;
    search?: string;
}
export interface CategoryProductHref {
    href: string
    label: string
}

export interface SEOCategoryKeyword {
    product_id: string
    keyword: string
}