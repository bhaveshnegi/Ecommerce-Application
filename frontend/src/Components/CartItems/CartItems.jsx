import React, { useContext } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from 'react-router-dom'


const CartItems = () => {
    const { getTotalCartAmout,all_product, cartItems, addToCart, removeFromCart } = useContext(ShopContext)

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
                                <div className="cartitem-format cartitem-format-main">
                                    <img src={e.image} alt="" className='cartitem_product_icon' />
                                    <p>{e.name}</p>
                                    <p>${e.new_price}</p>
                                    <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                                    <p>${e.new_price*cartItems[e.id]}</p>
                                    <img className='cartite-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                                </div>
                                <hr />
                            </div>
                }
                return null;
            })}
            <div className="cartitem-down">
                <div className="cartitem-totals">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmout()}</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmout()}</h3>
                        </div>
                    </div>
                    <Link to='/payment'><button>PROCEED TO CHECKOUT</button></Link>
                </div>
                <div className="cartitem-promocode">
                    <p>If you have promo code, Enter here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='promo code'/>
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems

