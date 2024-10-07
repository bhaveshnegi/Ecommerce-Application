import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from '../assets/upload_area.svg'

const AddProduct = () => {
    const [image,setImage]= useState(false);
    const[productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })


    const imagehandler =(e)=>{
        setImage(e.target.files[0]);
    }

    const changehandler=(e)=>{
         setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    
    const Add_product = async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let 
    }

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changehandler} type="text" name="name" placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changehandler} type="text" name="old_price" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changehandler} type="text" name="new_price" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changehandler} name='category'className='addproductselector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imagehandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={()=>{Add_product()}} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct
