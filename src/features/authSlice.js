import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        token: null,
        profilePicture: null,
        newOrderCreated: false,
        localId:null,
        userLocation:{
            latitude:null,
            longitude:null,
            address:null},        
    },
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload.email
            state.token = action.payload.idToken
            state.localId = action.payload.localId
        },
        setProfilePicture:(state,action)=>{
            state.profilePicture = action.payload
        },
        setUserLocation:(state,action)=>{
            state.location ={
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                address: action.payload.address
            }
        },
        setUserLogout: (state) =>{
            state.user = null,
            state.token = null,
            state.localId = null,
            state.profilePicture = null,
            state.location = null
            state.newOrderCreated = false
        },
        setNewOrderCreated: (state,action) =>{
            state.newOrderCreated = action.payload           
        }
        
    }
    
})

export const {setUser, setProfilePicture, setUserLocation, setUserLogout, setNewOrderCreated} = authSlice.actions
export default authSlice.reducer