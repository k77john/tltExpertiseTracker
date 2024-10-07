export const ROUTES = {
    dashBoard: '/',
    manageCategories: '/domain',
    manageSubCategories: '/sub-domain',
    categorySubCategoryMapping: '/domain-sub-domain-Mapping',
    userExpertiseMapping: '/user-expertise-Mapping',
    login: '/login',
    vertifyOTP: '/verify',
}

export const API_ROUTES = {
    login: '/Login/UserLogin',
    verifyOtp: '/Login/UserLoginOtpVerfication',
    getAllUsersDetails: '/Employee/GetAllEmployeeDetails',

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
    getSubCategoryByCategoryID: '/ExpertiseMapping/GetSubCategoryByCategoryID',

    getApiStatusCodes: '/Response/GetAllResponseStatuses',

    getAllCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/GetAllCategorySubCategoryMapping',
    getAllDomainSubDomainMapping:
        'http://192.168.5.11:8012/api/DomainSubDomain/GetAllDomainSubDomainMapping',
    addCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/AddCategorySubCategoryMapping',
    deleteCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/DeleteCategorySubCategoryMapping',
    updateCategorySubCategoryMapping:
        '/CategorySubCategoryMapping/UpdateCategorySubCategoryMapping',
    getCategorySubCategoryMapingByID:
        'CategorySubCategoryMapping/GetCategorySubCategoryMappingById',

    getExpertiseMapping: '/ExpertiseMapping/GetExpertiseMapping',
    getExpertiesMappingByCatSubCat:
        '/ExpertiseMapping/GetMappingByCategoryIDandSubCategoryID',
    addExpertiseMapping: '/ExpertiseMapping/AddExpertiseMapping',
    updateExpertiseMapping: '/ExpertiseMapping/UpdateExpertiseMapping',
    getExpertiseMappingDetails: '/ExpertiseMapping/GetExpertiseMappingByID',
}
