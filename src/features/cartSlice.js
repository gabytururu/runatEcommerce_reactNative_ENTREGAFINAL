import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        user: "userLogged",
        updatedAt: Date.now(),
        total: 0,
        items: []
    },
    reducers:{
        addItem:(state,action)=>{
            const isProductInCart = state.items.find(item=>item.id === action.payload.id)
            if(!isProductInCart){
                state.items.push(action.payload)
                const total= state.items.reduce(
                    (acc,current) => acc += current.price*current.quantity,0
                )
                state.total = total
                state={
                    ...state,
                    total,
                    updatedAt: Date.now()
                }
            }else{
                const itemsUpdated = state.items.map(item=>{
                    if(item.id === action.payload.id){
                        item.quantity+=action.payload.quantity 
                        return item
                    }
                    return item
                })
                const total = itemsUpdated.reduce(
                    (acc,current)=> acc += current.price*current.quantity,0
                )
                state.total=total
                state={
                    ...state,
                    items:itemsUpdated,
                    total,
                    updatedAt: Date.now()
                }
                
            }
        },
        removeItem:(state,action)=>{
            const prodToRemoveFromCart= state.items.find(item=>item.id === action.payload.id)         
            const remainingCartProducts = state.items.filter(item=> item.id !== prodToRemoveFromCart.id)
         
            const total = remainingCartProducts.reduce(
                (acc,current) => acc += current.price*current.quantity,0
            )
            state.total = total
            state.items = remainingCartProducts
            state={
                ...state,
                updatedAt:Date.now()
            }
          
        },
        clearCart:(state)=>{
            state.items = [],
            state.total= 0
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions
export default cartSlice.reducer