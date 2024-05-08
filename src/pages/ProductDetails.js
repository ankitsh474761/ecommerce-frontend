// ProductDetails.js

import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/context/cart';
import { toast } from 'react-toastify';
import './ProductDetails.css';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product/${params.id}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/products/related-product/${pid}/${cid}`);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);

  return (
    <Layout>
      <div className="proddet-container" style={{height:"100%", marginTop:"12px"}}>
      
      <div className='product-details-container ' style={{height:"100%"}}>
        <div className='product-details-more' >
          <div className='product-image'>
            <img
              src={`http://localhost:4000/upload/${product.photo}`}
              alt={product.name}
            />
          </div>
          <div className='product-info'>
            <h1>{product.name}</h1>
            <p className='description'>{product.description}</p>
            <div className='justflex'>
            <p className='price' style={{fontWeight:"600"}}>Price: ${product.price}</p>
            <p className='category' style={{fontWeight:"600"}}>Category: {product.category?.name}</p>
            <p className='shipping' style={{fontWeight:"600"}}>
              Shipping: {product.shipping ? 'Available' : 'Not Available'}
            </p>
            </div>
            <button
              className='SubmitBtn'
              style={{width:"100%",height:"30px",padding:"3px"}}
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem('cart', JSON.stringify([...cart, product]));
                toast.success('Item added to Cart');
              }}>
              Add to Cart
            </button>
          </div>
        </div>
        <div className='similar-products'>
          <h2>Similar Products</h2>
          {relatedProduct.length < 1 && <p>No similar products found</p>}
          <div className='related-products-container'>
            {relatedProduct.map((prod) => (
              <div className='related-product' key={prod._id}>
                <img
                  src={`http://localhost:4000/upload/${prod.photo}`}
                  alt={prod.name}
                />
                <div className='related-product-info'>
                  <h3>{prod.name}</h3>
                  <p className='description'>{prod.description.substring(0, 30)}...</p>
                  <p className='price'>${prod.price}</p>
                  <button
                    className='add-to-cart-button'
                    onClick={() => {
                      setCart([...cart, prod]);
                      localStorage.setItem('cart', JSON.stringify([...cart, prod]));
                      toast.success('Item added to Cart');
                    }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
     
    </Layout>
  );
};

export default ProductDetails;
