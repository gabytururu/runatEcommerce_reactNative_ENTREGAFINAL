import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import { colors } from '../global/colors'
import {useDispatch} from 'react-redux'
import {setProductIdSelected} from '../features/shopSlice'

const ProductItem = ({product, navigation}) => {
  const dispatch = useDispatch()
  return (
    <TouchableOpacity onPress={()=>{
        navigation.navigate('productDetails', product.id)
        dispatch(setProductIdSelected(product.id))    
    }}>
    <Card style={styles.productCard}>
      <Image
        style={styles.productImage}
        resizeMode='cover'
        source={{uri:product.thumbnail}}
      />
      <View style={styles.productDataContainer}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productDesc}>{product.description}</Text>
        <Text style={styles.productPrice}>Precio: ${product.price} MXN</Text>
      </View>
    </Card>
    </TouchableOpacity>
   
  )
}

export default ProductItem

const styles = StyleSheet.create({
  productCard:{
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      backgroundColor:colors.lightYellow,
      marginTop: 15,
      margin:10,
      padding:10,
      borderRadius: 5,
      width: 'auto'
    },
  productDataContainer:{
    flex:1
  },
  productName:{
    fontFamily: 'Poppins-SemiBold',   
  },
  productDesc:{
    fontFamily: 'Poppins-Light',
    fontSize: 13,
  },
  productPrice:{
    fontFamily: 'Poppins-SemiBold',   
  },
  productImage:{
    width: 60,
    marginRight: 15,
   
  }  
})