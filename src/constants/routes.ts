export const ROUTES = {
    dashBoard: '/',
    manageCategories: '/manage-categories',
    manageSubCategories: '/manage-sub-categories',
    categorySubCategoryMaping: '/category-sub-catrgory-maping',
    userExpertiesMaping: '/user-experties-maping',
}

export const API_ROUTES = {
    addCategory: '/Category/AddCategory',
    getCategories: '/Category/GetCategories',
    deleteCategory: '/Category/DeleteCategory',
    updateCategory: '/Category/UpdateCategory',

    addSubCategory: '/SubCategory/AddSubCategory',
    getSubCategories: '/SubCategory/getSubCategories',
    updateSubCategory: '/SubCategory/updateSubCategory',
    deleteSubCategory: '/SubCategory/DeleteCategories',

    getApiStatusCodes: '/Response/GetAllResponseStatuses',

    getAllCategorySubCategoryMaping:
        '/CategorySubCategoryMapping/GetAllCategorySubCategoryMapping',
    addCategorySubCategoryMaping:
        '/CategorySubCategoryMapping/AddCategorySubCategoryMapping',
    deleteCategorySubCategoryMaping:
        '/CategorySubCategoryMapping/DeleteCategorySubCategoryMapping',
}
