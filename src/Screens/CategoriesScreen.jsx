import { StyleSheet, Text, View, FlatList} from 'react-native'
import CategoryItemWrapper from '../components/CategoryItemWrapper'
import { colors } from '../global/colors'
import { useGetCategoriesQuery } from '../services/shopService'

const CategoriesScreen = ({navigation}) => {

  const {data,isLoading,error} = useGetCategoriesQuery()
  
  const renderCategoryItem = ({item}) => (
    <CategoryItemWrapper
      category={item}
      navigation={navigation}
    />
  )

  return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.welcomeMsgContainer}>
        <Text style={styles.welcomeMsgBold}>Bienvenid@ a Runat E-Commerce</Text>
        <Text style={styles.welcomeMsgReg}>Elige tu Categoría Favorita:</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          renderItem={renderCategoryItem}
          keyExtractor={item=>item}
          numColumns={2} 
        />
      </View>   
    </View>  
    </>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor: colors.clearGreen,
    padding: 20,
  },
  welcomeMsgBold:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
  welcomeMsgReg:{
    fontFamily: 'Poppins-Regular',
    fontSize: 19,
    textAlign: 'center',
  },
  flatListContainer:{
    flex:1,
    alignItems: 'center',
    backgroundColor: colors.lightYellow,
    marginTop: 10,    
    borderRadius: 8,
    padding:10
  },
})

