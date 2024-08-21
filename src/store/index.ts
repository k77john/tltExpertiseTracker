import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './reducersAndActions/category/category.reducer'
import subCategoryReducer from './reducersAndActions/subCategory/subCategory.reducer'

const reduxStore = configureStore({
    reducer: {
        category: categoryReducer,
        subCategory: subCategoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default reduxStore

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

//typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
