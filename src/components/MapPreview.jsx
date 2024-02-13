import { Image, StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'

const MapPreview = ({location, storeLocation,mapZoom}) => {
    
    const storeIcon = 'https://i.postimg.cc/5NgNBbFD/shop.png'
    const mapsApiKey = process.env.EXPO_PUBLIC_MAPS_API_KEY
    const locationMap = `https://maps.googleapis.com/maps/api/staticmap?zoom=${mapZoom}&size=300x300&maptype=roadmap&markers=color:red%7Clabel:I%7C${location.latitude},${location.longitude}&markers=icon:${storeIcon}%7C${storeLocation.latitude},${storeLocation.longitude}&path=color:0x0000ff%7C${location.latitude},${location.longitude}%7C${storeLocation.latitude},${storeLocation.longitude}&key=${mapsApiKey}`

    return (
    <View style={styles.mapContainer}>
      <Image
        style={styles.mapImage}
        source={{uri:locationMap}}
      />
    </View>
    )
}

export default MapPreview

const styles = StyleSheet.create({
    mapContainer:{
        
    },
    mapImage:{
        backgroundColor:colors.primary,
        width:300,
        height:220,
        borderRadius:10
    }

})