import { useReducer } from 'react'

import CartContext from './cart-context'


const defaultCartState = {
    items: [],
    totalAmount: 0
}

//state is the last state snapshot of the state managed by the reducer, action as to be dispatched by us
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount
        //const updatedItems = state.items.concat(action.item) //current state items, concat() adds a new item to an array but returns a new array instead mutating the original one
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id) //if item exists in an array return its index

        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItem
        let updatedItems 

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem, //copy the existing cart item
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }else{
            updatedItem = {...action.item}
            updatedItems = state.items.concat(updatedItem)
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        } //return the new state
    } 
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]

        const updatedTotalAmount = state.totalAmount - existingCartItem.price

        let updatedItems
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id) //remove item from cart completely
        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return({
          items: updatedItems,
          totalAmount: updatedTotalAmount  
        })
    }

    if(action.type === 'CLEAR'){
        return defaultCartState
    }

    return defaultCartState //return a new state snapshot
} //outside component function cause it doesn't need to be recreated on evaluation of component

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState) //returns array with 2 elements: a state snapshot and a function that allows us 
                                                                                  //to dispatch an action
    
    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item}) //it's totally up to you what an action is, typically an object with its identifier
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id}) //this is our action we refer in cartReducer() function
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider

/* An app-wide state mgmt */