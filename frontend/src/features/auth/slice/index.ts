import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, initialAuthState, RegisterResponse } from '../types'


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken: (state: AuthState, action: PayloadAction<RegisterResponse>) => {
            state.token = action.payload.token
        },
    }
})

export const { setToken } = authSlice.actions

export default authSlice.reducer