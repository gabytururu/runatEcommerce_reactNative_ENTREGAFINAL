import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const base_url = process.env.EXPO_PUBLIC_BASE_URL

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json'
        }),
        getProducts: builder.query({
            query: () => 'products.json'
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),
        postOrder: builder.mutation({
            query: ({...order}) => ({
                url:`orders/${order.localId}.json`,
                method:'POST',
                body: order
            })           
        }), 
        getUserOrders: builder.query({
            query: (localId) => `orders/${localId}.json`
        }),
        putProfilePicture: builder.mutation({
            query: ({image, localId}) => ({
                url:`profilePictures/${localId}.json`,
                method:'PUT',
                body: {image:image}
            })           
        }),
        getProfilePicture: builder.query({
            query: (localId) => `profilePictures/${localId}.json`
        }),
        putUserLocation: builder.mutation({
            query:({location,localId})=>({
                url: `locations/${localId}.json`,
                method: 'PUT',
                body: {
                    latitude:location.latitude,
                    longitude:location.longitude,
                    address: location.addess
                }
            }),
        }),
        getUserLocation: builder.query({
                query:(localId) => `locations/${localId}.json`
        }),          
    })
})

export const {
    useGetCategoriesQuery, 
    useGetProductsQuery, 
    useGetProductsByCategoryQuery, 
    usePostOrderMutation,
    useGetUserOrdersQuery,
    usePutProfilePictureMutation,
    useGetProfilePictureQuery,
    usePutUserLocationMutation,
    useGetUserLocationQuery,
} = shopApi
