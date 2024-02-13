import { FlatList, StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native'
import OrdersItem from '../components/OrdersItem'
import { colors } from '../global/colors'
import { useGetUserOrdersQuery } from '../services/shopService'
import { setNewOrderCreated } from '../features/authSlice'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const OrdersScreen = ({navigation}) => {

    const localId = useSelector(state=>state.authReducer.localId)
    const {data, isLoading, error, refetch, isRefetching} = useGetUserOrdersQuery(localId)
    const newOrderIsCreated = useSelector(state=>state.authReducer.newOrderCreated)
    const [userOrdersData, setUserOrdersData] = useState([])

    const [orderIdSelected, setOrderIdSelected]=useState("")
    const [orderSelected, setOrderSelected]=useState({})
    const [modalVisible, setModalVisible]=useState(false)

    const dispatch = useDispatch()
    useEffect(()=>{
        refetch()
        if(data && typeof data === 'object' && data !== null && newOrderIsCreated === false){
            refetch()
            const ordersData = Object.values(data)
            setUserOrdersData(ordersData)
        }else if(error){
            setUserOrdersData([])    
        }
        
        if(data && typeof data === 'object' && data !== null && newOrderIsCreated === true){
            refetch()
            const ordersData = Object.values(data)
            setUserOrdersData(ordersData)
            dispatch(setNewOrderCreated(false))    
        }else if(error){
            setUserOrdersData([])    
        }     
    },[data,isLoading, newOrderIsCreated, isRefetching])

    useEffect(()=>{
        const orderSelected = userOrdersData.find(order=>order.orderId === orderIdSelected)
        setOrderSelected(orderSelected)
    },[orderIdSelected])

    const renderOrdersItem = ({item}) =>{
        return(
            <OrdersItem order={item} setOrderId={setOrderIdSelected} setModalVisible={setModalVisible}/>
        )
    }
    return (
    <>
        <View style={styles.introMsgContainer}>
            <Text style={styles.title}>Pedidos Anteriores:</Text>
            <Text style={styles.lightText}>Presiona para ver detalles</Text>
        </View>
        {data 
        ?
            <>
            <FlatList style={styles.ordersListContainer}
                    data={userOrdersData}
                    renderItem= {renderOrdersItem}
            />
            <Modal visible={modalVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.boldBig}>Detalles De Tu Orden</Text>
                        <Text style={styles.regularText}>{'\u2022'} <Text style={{fontWeight: 'bold'}}>Orden #: </Text>{orderSelected?.orderId}</Text>
                        <Text style={styles.regularText}>{'\u2022'}  <Text style={{fontWeight: 'bold'}}>Fecha de compra: </Text>{new Date(orderSelected?.cartOrderCreationDate).toLocaleDateString()}</Text>
                        <Text style={styles.regularText}>{'\u2022'}  <Text style={{fontWeight: 'bold'}}>Horario de compra: </Text>{new Date(orderSelected?.cartOrderCreationDate).toLocaleTimeString()}</Text>
                        <Text style={styles.regularText}>{'\u2022'}  <Text style={{fontWeight: 'bold'}}>Productos adquiridos:</Text> {'\u2022'}                  
                            {orderSelected && orderSelected.cartItems 
                            ?                         
                                <Text>{orderSelected.cartItems.map(item=>item.title)}</Text>
                            :
                                <Text>Buscando los Productos...</Text>
                            }
                        </Text>
                        <Text style={styles.regularText}>{'\u2022'} <Text style={{fontWeight: 'bold'}}>Valor de la compra:</Text> ${orderSelected?.cartTotalValue} USD</Text>
                        <View style={styles.modalButtonContainer}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={styles.modalButton}
                            >
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                            </Pressable>
                        </View>
                    </View>        
                </View>
            </Modal>
            </>
        :
        <View style={styles.emptyOrdersContainer}>
            <Text style={styles.emptyOrderMsg}>Tu historial no tiene órdenes</Text>
            <View style={styles.purchaseNavButtonWrapper} >
                <TouchableOpacity style={styles.purchaseNavButton} onPress={()=>{navigation.navigate('categories')}}>
                <Text style={styles.emptyOrdersText}> Seguir  {'\n'} Comprando</Text>
                </TouchableOpacity>
            </View> 
        </View>
    }       
    </>
    )
}

export default OrdersScreen

const styles = StyleSheet.create({
    introMsgContainer:{
        padding: 25,
        backgroundColor: colors.primary,
        borderBottomWidth: 5,
        borderBottomColor: colors.secondary
    },
    lightText:{
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        color: colors.clear
    },
    title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        color: colors.clear
        
    },
    ordersListContainer:{
        backgroundColor: colors.lightBlue,
        padding:10
    },
    modalBackground:{
        backgroundColor: colors.lightBlue,
        padding:15,       
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer:{
        backgroundColor: colors.clear,
        borderRadius:10,
        minHeight: '60%',
        margin: 20,
        padding: 30,
        borderBottomColor: colors.secondary,
        borderBottomWidth: 5,  
    },
    modalButtonContainer:{
        alignItems: 'center',
        padding:20
    },
    modalButton:{
       marginTop: 35,
       minWidth: '60%'
    },
    modalButtonText:{
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation:2,
        backgroundColor: colors.callToActionA,     
        textAlign: 'center',
        borderRadius: 5, 
        fontWeight: 'bold',
        fontSize: 20
    },
    boldBig: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
    },
    regularText:{
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    emptyOrdersContainer:{
        flex:1,
        backgroundColor: colors.lightBlue,
        alignItems: 'center'
    },
    emptyOrderMsg:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        marginTop:75
    },
    purchaseNavButtonWrapper:{
        backgroundColor: colors.mintSoft,
        width: 170,
        height: 170,
        borderRadius: 85,
        padding: 5,   
        marginTop:40,
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
        backgroundColor: colors.secondary,
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
      emptyOrdersText:{
        color: colors.dark,
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
      },   
   

})