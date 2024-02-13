import { NavigationContainer } from "@react-navigation/native"
import TabNavigator from "./TabNavigator"
import AuthNavigator from "./AuthNavigator"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setProfilePicture,setUserLocation } from "../features/authSlice"
import { useGetProfilePictureQuery } from "../services/shopService"
import { useGetUserLocationQuery } from "../services/shopService"
import { fetchSession } from "../db"
import { setUser } from "../features/authSlice"


const MainNavigator = () => {
    
    const userLocalId = useSelector(state=>state.authReducer.localId)
    const {data, error, isLoading} =useGetProfilePictureQuery(userLocalId)
    const {data:locationData, error:locationError, isLoading:isLocationLoading} = useGetUserLocationQuery(userLocalId)
    
    const dispatch = useDispatch()
    useEffect(()=>{      
            if(data){
                dispatch(setProfilePicture(data.image))           
            }
            if(locationData){
                dispatch(setUserLocation(locationData))
            }
    },[data,isLoading,locationData,isLocationLoading])

    useEffect(()=>{
        (async()=>{
            try{
                const session = await fetchSession(userLocalId)
                if(session?.rows.length){
                    const user = session.rows._array[0]
                    dispatch(setUser(user))
                    console.log(`***Session fetch successful: Auto login historical User***`)
                }
            }catch(error){
                console.log('*** Error: Failed to fetch user from Database ***', error)
            }
        })()
    },[])

    return (
        <NavigationContainer>
            {userLocalId && !isLoading ?<TabNavigator/>:<AuthNavigator/>}
        </NavigationContainer>
    )
}

export default MainNavigator