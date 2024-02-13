import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CartItem from '../components/CartItem'
import OrderConfirmationModal from '../components/OrderConfirmationModal'
import {useState} from 'react'
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cartSlice'
import { FontAwesome } from '@expo/vector-icons';
import { usePostOrderMutation } from '../services/shopService'
import { setNewOrderCreated } from '../features/authSlice'

const CartScreen = ({navigation}) => {
  const [orderConfirmationModal, setOrderConfirmationModal] = useState(false)
  const cartUser = useSelector(state=>state.authReducer.user)
  const cartUserLocalId = useSelector(state=>state.authReducer.localId)
  const cartItems = useSelector(state=> state.cartReducer.items)
  const cartTotalValue = useSelector(state=> state.cartReducer.total)
  const cartTotalProducts = cartItems.length
  const cartLastUpdateDate = useSelector(state=>state.cartReducer.updatedAt)
  const cartOrderCreationDate = Date.now()
  const newOrderCreated = useSelector(state=>state.authReducer.newOrderCreated)
  const [postOrder, result] = usePostOrderMutation()
 
  const dispatch= useDispatch()
  const confirmCartOrder = () =>{
    postOrder({cartUser, localId: cartUserLocalId, cartItems, cartTotalProducts, cartTotalValue, cartLastUpdateDate, cartOrderCreationDate, orderId: Math.ceil(Math.random(1,10)*1000)})
    dispatch(setNewOrderCreated(true))

    setTimeout(()=>{
      triggerModal()
      dispatch(clearCart())    
    },300)
    
  } 

  const handleCartDelete =()=>{
    dispatch(clearCart())
  }

  const triggerModal = () =>{
    setOrderConfirmationModal(true)
    setTimeout(()=>{
      setOrderConfirmationModal(false)
    },2500)
  }

  const renderCartItem = ({item}) =>(
    <CartItem item={item}  />
  )
    
  
  return (
    <>
    {
      cartItems.length === 0 ?
      <View style={styles.cartContainer}>
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Tu carrito está vacio</Text>
          <View style={styles.purchaseNavButtonWrapper} >
            <TouchableOpacity style={styles.purchaseNavButton} onPress={()=>{navigation.navigate('categories')}}>
              <Text style={styles.emptyCartTextClear}> Seguir  {'\n'} Comprando</Text>
            </TouchableOpacity>
          </View>
        </View>
      
        <View style={styles.cartConfirmationContainer}>
          <Text style={styles.cartTotalAmount}>Total: ${cartTotalValue}.00  USD</Text>
          <TouchableOpacity style={styles.cartConfirmButton} onPress={()=>{navigation.navigate('categories')}}>
            <Text style={styles.cartConfirmButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
        <OrderConfirmationModal anymationType= "slide" isVisible ={orderConfirmationModal}/>
      </View>
      
      :
      <>
      <View style={styles.cartContainer}>
        <FlatList style={styles.cartFlatlist}
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item=>item.id}
        />
        <View style={styles.cartConfirmationContainer}>
          <Text style={styles.cartTotalAmount}>Total: ${cartTotalValue}.00  USD</Text>
          <TouchableOpacity style={styles.cartConfirmButton} onPress={confirmCartOrder}>
            <Text style={styles.cartConfirmButtonText}>Confirmar Orden</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cartClearContainer}>
          <Text style={styles.cartClearText}>Vaciar Carrito</Text>    
          <TouchableOpacity style={styles.cartDeleteButton} onPress={handleCartDelete}>
              <Text style={styles.cartDeleteButtonText}><FontAwesome name="trash" size={27} color={colors.primary}/></Text>
          </TouchableOpacity>
        </View>
      </View>   
      </>
    }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer:{
    flex: 1,
    backgroundColor: colors.clearGreen
  },
  purchaseNavButtonWrapper:{
    backgroundColor: colors.mintSoft,
    width: 170,
    height: 170,
    borderRadius: 85,
    padding: 5,   
    marginTop:70,
    shadowColor: colors.dark,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
  },
  purchaseNavButton:{
    backgroundColor: colors.callToActionA,
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  emptyCartTextClear:{
    color: colors.dark,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  cartFlatlist:{
    padding: 20,
    borderRadius:8,
  },
  cartConfirmationContainer:{
    flexDirection: 'row',
    marginVertical:15,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightYellow,
    borderRadius: 5,
    padding:10
  },
  cartTotalAmount:{
    color: colors.primary,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',

  },
  cartConfirmButton:{
    backgroundColor: colors.callToActionA,
    padding:10,
    borderRadius:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartConfirmButtonText:{
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  cartClearContainer:{
    flexDirection: 'row',
    marginBottom:5,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.mintSoft,
    borderRadius: 5,
    padding:5,
    textAlignVertical: 'center'
  },
  cartDeleteButton:{
    backgroundColor: colors.mint,
    padding:10,
    borderRadius:5,  
    alignItems: 'center',
    minWidth:'37%', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartDeleteButtonText:{
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  cartClearText:{
    color: colors.primary,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyCartContainer:{
    flex:1,
    backgroundColor: colors.lightYellow,
    margin:20,
    padding: 30,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems:'center'
  },
  emptyCartText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20
  }
  


})