import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import MapPreview from './MapPreview'
import { colors } from '../global/colors'
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import { setUserLocation} from '../features/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { usePutUserLocationMutation } from '../services/shopService'


const LocationSelector = () => {
    const [location,setLocation]=useState('xasdf')
    const [error, setError] = useState('')
    const [address,setAddress]= useState('')
    const [distance,setDistance] =useState('')
    const mapsApiKey= process.env.EXPO_PUBLIC_MAPS_API_KEY
    const storeCoordenates = {latitude:location.latitude+0.01, longitude:location.longitude+0.025}
    const mapZoom= 12
    const localId = useSelector(state=>state.authReducer.localId)
    const [putUserLocation, result] = usePutUserLocationMutation()


    useEffect(()=>{
        (async()=>{
            let{ status } = await Location.requestForegroundPermissionsAsync()
            if(status !== 'granted'){
                setError('Los permisos de GeoLocalización fueron DENEGADOS por el usuario')
                return
            }
            let location = await Location.getCurrentPositionAsync()
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        })();
    },[])

    useEffect(()=>{
        (async()=>{
            try{
                if(location.latitude){
                    const addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapsApiKey}`
                    const fetchResponse = await fetch(addressUrl)
                    const fetchResponseJson = await fetchResponse.json()
                    const formattedAddress = await fetchResponseJson.results[0].formatted_address
                    const geolibDistance = getDistance(
                        {latitude:location.latitude, longitude:location.longitude},
                        storeCoordenates
                    )                   
                    setDistance(geolibDistance)
                    setAddress(formattedAddress)
                }
            }catch(err){
                setError(err.message)
            }
            
        })();
    },[location])

    const dispatch = useDispatch()
    const handleConfirmAddress = () =>{
        const userLocation ={
            latitude: location.latitude,
            logitude:location.longitude,
            address: address
        }
        dispatch(setUserLocation(userLocation))
        putUserLocation({location: userLocation, localId})
    }

    return (
        <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Tu ubicación más reciente:</Text>
            {location.latitude
                ?
                <>  
                    <Text style={styles.locationText}>{address}</Text>                    
                    <View style={styles.locationDistance}>
                        <Text style={styles.locationTitle}>Tienda más cercana: </Text>
                        <Text style={styles.locationText}>a {distance} km de ti</Text>
                    </View>                    
                 
                    <TouchableOpacity style={styles.locationBtn} onPress={handleConfirmAddress}>
                        <Text style={styles.locationText}>Actualizar Ubicación</Text>
                    </TouchableOpacity>
                    <Text style={styles.locationText}>
                        (Lat:{location.latitude},Long:{location.longitude})
                    </Text>
                    <MapPreview location={location} storeLocation={storeCoordenates} mapZoom={mapZoom}></MapPreview>          
                </>
                :
                <ActivityIndicator/>
            } 
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    locationContainer:{
        justifyContent:'flex-start',
        alignItems:'center',
        margin:5,
        flex:1
    },
    locationTitle:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16
    },
    locationText:{
        fontFamily: 'Poppins-Regular',
        fontSize:16,          
    },
    locationBtn:{
        backgroundColor: colors.callToActionA,
        padding:12,
        marginVertical:8,
        borderRadius:8,       
    },
    locationDistance:{
        flexDirection:'row',
        marginTop:10
    }
})