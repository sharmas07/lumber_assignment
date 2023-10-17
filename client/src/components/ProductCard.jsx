import React from 'react'
import './ProductCard.css'

function ProductCard({item}) {
  return (
    <div className="product__wrapper">
        <div className="image__wrapper">
            <img className='img' src={item.imageURL} alt="" />
        </div>
        <div className='product-card-bottom'>
            <p className='product-price'>{item.price} Rs</p>
            <span className='add-to-cart-btn'>Add to Cart</span>
        </div>
    </div>
  )
}

export default ProductCard