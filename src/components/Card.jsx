import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'

const Card = ({children, style}) => {
  return (
    <View style={{...styles.cardShadow, ...style}}>
     {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardShadow:{
    backgroundColor:colors.clear,
    shadowColor: colors.primary,
    shadowOffset:{
       height:15,
       width:13,
    },
   elevation:8, 
   shadowOpacity:1,
   shadowRadius: 10,
  }
})