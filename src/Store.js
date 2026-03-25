import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice.js'

export const Store = configureStore({
    reducer: {
        paste: pasteReducer,
    },
})