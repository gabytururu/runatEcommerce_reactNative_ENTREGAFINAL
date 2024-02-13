import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Card from './Card'
import { colors } from '../global/colors';

const OrdersItem = ({order, setOrderId, setModalVisible}) => {
  return (    
    <TouchableOpacity style={styles.searchIcon} onPress={()=>{
      setOrderId(order.orderId)
      setModalVisible(true)
    }}>
      <Card style={styles.orderItemContainer}>      
          <View style={styles.orderContentDetails}>          
            <Text style={styles.dateOfOrder}>Fecha de la Orden{new Date(order.cartOrderCreationDate).toLocaleString()}</Text>  
            <Text>Cantidad de Productos: {order.cartTotalProducts}</Text>     
            <Text>Número de Orden: {order.orderId}</Text>     
            <Text style={styles.orderTotal}>Total: ${order.cartTotalValue}</Text>
          </View>      
          <Feather name="search" size={24} color={colors.primary} />
      </Card>
    </TouchableOpacity> 
  )
}

export default OrdersItem

const styles = StyleSheet.create({
  orderItemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    backgroundColor: colors.clear,
    margin:3,
    borderRadius: 5
  },
  orderContentDetails:{
    padding: 10,
    width: '90%'  
  },
  dateOfOrder:{
    fontFamily: 'Poppins-Regular'

  },
  orderTotal:{
    fontFamily: 'Poppins-SemiBold'
  },
  searchIcon:{
    marginLeft: 'auto'
  }
})