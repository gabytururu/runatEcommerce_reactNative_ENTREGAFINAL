import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react'
import SearchInput from '../components/SearchInput'
import ProductItem from '../components/ProductItem'
import {useSelector} from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopService'

const ProductsByCatScreen = ({navigation, route}) => {
  const [productsByCategory, setProductsByCategory] = useState([])
  const [search, setSearch] = useState('')

  const category = useSelector(state=>state.shopReducer.categorySelected)
  const {data: productsFilteredByCategory, isLoading, error} = useGetProductsByCategoryQuery(category)

  useEffect(()=>{

    if(!isLoading){
      const productValues = Object.values(productsFilteredByCategory)
      const productsFilteredSearch = productValues.filter(prod => prod.title.toLowerCase().includes(search.toLowerCase()))
      setProductsByCategory(productsFilteredSearch)
    }
   
  },[isLoading,category, search])

  const onSearch=(search)=>{
    setSearch(search)
  }

  const renderProductItem =({item}) =>(
    <ProductItem product={item} navigation={navigation}/>
  )

  return (
    <>
    {
      isLoading?
        <ActivityIndicator/>
        :
        <>
        <SearchInput onSearchHandlerEvent={onSearch}/>
        <FlatList
        data={productsByCategory}
        renderItem={renderProductItem}
        keyExtractor={item=>item.id}
        />
        </>
    }    
    </>
  )
}

export default ProductsByCatScreen

const styles = StyleSheet.create({})