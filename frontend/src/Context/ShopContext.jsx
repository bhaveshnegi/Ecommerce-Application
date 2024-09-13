import React, { createContext, useState } from 'react'
import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);

const getDeafaultCart = ()=>{
    let cart ={};
    for(let index =0;index<all_product.length+1;index++){
        cart[index]=0;
    }
    return cart;
}
const ShopContextProvider = (props)=>{
    
    const [cartItems,setCartItems] = useState(getDeafaultCart());

    
    const addToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems)
    }
    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmout =()=>{
        let totalamout = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo = all_product.find((product)=>product.id===Number(item))
                totalamout +=iteminfo.new_price * cartItems[item];
            }
        }
        return totalamout;
    }
    
    const getTotalCartItem=()=>{
        let totalitem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalitem+=cartItems[item]
            }
        }
        return totalitem;
    }
    
    const contextValue = {getTotalCartItem,getTotalCartAmout,all_product,cartItems,addToCart,removeFromCart}

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
