import React, { useContext } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {
    const { all_product, cartItems, addToCart, removeFromCart } = useContext(ShopContext)

    return (
        <div className='cartitem'>
            <div className="cartitem-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Prices</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id]>0) 
                {
                    return <div>
                                <div className="cartitem-format">
                                    <img src={e.image} alt="" className='cartitem_product_icon' />
                                    <p>{e.name}</p>
                                    <p>${e.new_price}</p>
                                    <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                                    <p>{e.new_price*cartItems[e.id]}</p>
                                    <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                                </div>
                                <hr />
                            </div>
                }
            })}
        </div>
    )
}

export default CartItems

