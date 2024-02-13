import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect} from 'react'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../features/cartSlice'
import { useGetProductsByCategoryQuery } from '../services/shopService'

const ProductDetailScreen = ({route}) => {
  const [productSelected, setProductSelected] = useState(null)
  const productId = route.params
  const category = useSelector(state=>state.shopReducer.categorySelected)
  const {data, isLoading, error} = useGetProductsByCategoryQuery(category)

  useEffect(()=>{
    const productsFound = Object.values(data)
    const productChosenFound = productsFound.find(prod => prod.id === productId)
    setProductSelected(productChosenFound)
  },[productId, data, isLoading, productSelected])
  
  const dispatch = useDispatch()
  const handleAddToCart = () =>{
    dispatch(addItem({...productSelected, quantity:1}))
  }


  return (
    <>
     { productSelected ?
          <>      
          <ScrollView style={styles.productDetailsContainer}>  
              <View style={styles.imageContainer}>   
              <Image
                source={{uri: productSelected.images[0]}}
                resizeMode='cover'
                style={styles.productImagePortrait}
              />
              </View> 
              <View style={styles.productSpecificsContainer}>
                <Text style={styles.productName}>{productSelected.title}</Text>
                <Text style={styles.productDesc}>{productSelected.description}</Text>
                <Text style={styles.productPrice}>${productSelected.price}</Text>
                <TouchableOpacity onPress={handleAddToCart}>
                  <Text style={styles.buyButtonPortrait}>Agregar al Carrito</Text>
                </TouchableOpacity>
              </View>          
          </ScrollView>
        </>
        :
        <ActivityIndicator/>
        
      }
    </>   
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  productDetailsContainer:{
    backgroundColor: colors.lightYellow,    
  },
  imageContainer:{
    minWidth: 300,
    width:'90%',
    height: 350,
    marginVertical: 25,
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 10,
  },
  productImagePortrait:{
    minWidth: 300,
    width:'100%',
    height: 345,
   
    alignSelf: 'center',
    borderRadius: 8,
  },
  productSpecificsContainer:{
    alignItems: 'center',
    backgroundColor: colors.mintSoft,
    padding: 18,
    marginHorizontal:20,
    marginBottom: 15,
    borderRadius:5,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 5,    
  },
  productName:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textTransform: 'capitalize'
  },
  productDesc:{
    fontFamily: 'Poppins-Light',
    textTransform: 'capitalize'
  },
  productPrice:{
    fontFamily: 'Poppins-SemiBold'
  },
  buyButtonPortrait:{
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: colors.callToActionA,
    padding: 10,
    minWidth: 100,
    textAlign: 'center',
    borderRadius: 8
  }
})