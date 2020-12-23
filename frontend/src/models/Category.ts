export type Category = {
    id: string,
    name: string,
    keywords: string[],
}

export type CreateCategory = {
    name: string,
}

export type CategoryData = {
    categories: Category[],
};

export type AddCategoryVars = {
    categoryData: CreateCategory,
};

export type UpdateCategoryVars = {
    category: Category,
};

export type DeleteCategoryVars = {
    id: string,
};
