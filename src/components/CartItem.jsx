import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Card from './Card'
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cartSlice';

const CartItem = ({item}) => {
    const dispatch = useDispatch()
    const handleRemoveItem = () =>{
        dispatch(removeItem({...item}))
    }
  
    return (
        <Card style={styles.cartItemContainer}>
            <Image 
                style={styles.cartItemImage}
                resizeMode='cover'
                source={{uri: item.thumbnail}}
            />
            <View style={styles.cartDetailsContainer}>
                <Text  style={styles.cartTitle}>{item.title}</Text>
                <Text  style={styles.cartItemBrand}>{item.brand}</Text>
                <Text  style={styles.cartItemPrice}>${item.price} USD</Text>
                <Text  style={styles.cartSumDetails}>
                    Cantidad: {item.quantity}, Total: ${item.price*item.quantity}
                </Text>
            </View>
            <TouchableOpacity style={styles.trashCart} onPress={handleRemoveItem}>
                <FontAwesome name="trash" size={27} color={colors.secondary} />
            </TouchableOpacity>
        </Card>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    margin:2,
    borderRadius:5
    },
    cartDetailsContainer:{
        flex:1
    },
    cartItemImage:{
    width:90,
    height:90,
    marginRight: 15,
    borderRadius: 8,
   },
   trashCart:{
    marginLeft: 'auto',
   },
   cartTitle:{
    fontFamily: 'Poppins-SemiBold',
    textTransform:'capitalize',
    fontSize: 14,
    color: colors.primary
   },
   cartItemBrand:{
    fontFamily: 'Poppins-Regular',
    textTransform:'capitalize',
    fontSize: 13
   },
   cartSumDetails:{
    fontFamily: 'Poppins-SemiBold',
    textTransform:'capitalize',
    fontSize: 13
   }
})