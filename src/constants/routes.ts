export const ROUTES = {
    dashBoard: '/',
    manageCategories: '/manage-categories',
    manageSubCategories: '/manage-sub-categories',
    categorySubCategoryMapping: '/category-sub-catrgory-Mapping',
    userExpertiesMapping: '/user-experties-Mapping',
    login: '/login',
    vertifyOTP: '/verify',
}

export const API_ROUTES = {
    login: '/Login/UserLogin',
    verifyOtp: '/Login/UserLoginOtpVerfication',

    addCategory: '/Category/AddCategory',
    getCategories: '/Category/GetCategories',
    deleteCategory: '/Category/DeleteCategory',
    updateCategory: '/Category/UpdateCategory',
    getCategoryByID: '/Category/GetCategory',

    addSubCategory: '/SubCategory/AddSubCategory',
    getSubCategories: '/SubCategory/getSubCategories',
    updateSubCategory: '/SubCategory/updateSubCategory',
    deleteSubCategory: '/SubCategory/DeleteCategories',
    getSubCategoryByID: '/SubCategory/GetSUbCategoryById',

    getApiStatusCodes: '/Response/GetAllResponseStatuses',

    getAllCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/GetAllCategorySubCategoryMapping',
    addCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/AddCategorySubCategoryMapping',
    deleteCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/DeleteCategorySubCategoryMapping',
    updateCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/UpdateCategorySubCategoryMapping',
    getCategorySubCategoryMapingByID:
        'CategorySubCategoryMapping/GetCategorySubCategoryMappingById',
}
