import { createSlice } from '@reduxjs/toolkit'

const sideBarMenuSlice = createSlice({
    name: 'sideBarMenu',
    initialState: {
        menu: window.innerWidth < 900 ? false : true,
    },
    reducers: {
        menu: (state) => {
            state.menu = !state.menu
        },
    },
})

export const { menu } = sideBarMenuSlice.actions

export default sideBarMenuSlice.reducer
