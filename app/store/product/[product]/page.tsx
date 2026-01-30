"use client";
import { Button } from '@/components/ui/button';
import ApiClient from '@/lib/API';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductPage = () => {
  const {product} = useParams()
  const [productData, setProductData]: any = useState(null)

  const getProductDetails = async ()=>{
    const data = await ApiClient.get("product/"+product)
    .then((response)=>setProductData(response.data?.product))
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{getProductDetails()},[])
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4'>
      <p>Product Details </p>
      <h1 className='text-2xl md:text-3xl text-blue-900 font-bold mb-3 mt-2'>{productData?.name}</h1>
      <img alt='image'  src={"/1.png"} className='w-full md:w-1/2 lg:w-1/4' />
      <h1 className='py-4 font-bold text-3xl md:text-4xl text-green-700'>₦{productData?.price}</h1>
      <p className='py-3 mb-3 text-justify text-gray-700'>{productData?.description}</p>
      <Button className='bg-blue-800 px-5 py-3'>Add To Cart</Button>
    </div>
  )
}

export default ProductPage