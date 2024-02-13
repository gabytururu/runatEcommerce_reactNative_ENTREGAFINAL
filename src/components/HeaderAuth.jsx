import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'


const HeaderAuth = ({title}) => {

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

export default HeaderAuth

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: 'row-reverse',   
    height: 100,
    backgroundColor: colors.dark,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 5,
    padding: 10,
    alignItems:'center',
    justifyContent: 'center',
    },
  headerTextContainer:{
    width: '70%',
  },
  headerText:{    
    textAlign: 'right',
    color: colors.clear,
    color: 'white',
    fontFamily: 'MeowScript',
    fontSize: 35,
    textTransform: 'capitalize'
  },
})