import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'


const OrderConfirmationModal = ({
    animationType,
    isVisible
}) => {
  return (
    <Modal animationType={animationType} visible={isVisible}>
        <View style={styles.modalWrapper}>
            <View style={styles.modalMainContainer}>
                <Text style={styles.modalMessageTitle}>¡Gracias por tu Compra!{'\n'}</Text>
                <Text style={styles.modalMessageText}>Para más detalles{'\n'} Visita la sección de Ordenes</Text>
            </View>   
        </View>
    </Modal>
  )
}

export default OrderConfirmationModal

const styles = StyleSheet.create({
    modalWrapper:{
        backgroundColor: colors.lightYellow,
        padding:20,
        flex:1,
        justifyContent:'center',
    },
    modalMainContainer:{
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: colors.mintSoft,
        marginVertical:40,
        marginHorizontal: 10,
        borderRadius: 8,
        padding:35,
        shadowColor: colors.dark,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
    },
    modalMessageTitle:{
        fontFamily: 'Poppins-SemiBold',
        color: colors.dark,
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '500'
    },
    modalMessageText:{
        fontFamily: 'Poppins-Regular',
        color: colors.dark,
        fontSize: 22,
        marginVertical:10,
        textAlign: 'center'
    }
})