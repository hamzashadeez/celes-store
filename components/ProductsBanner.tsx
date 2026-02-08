"use client";

import ApiClient from "@/lib/API";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ProductsBanner() {
  const [products, setProducts]: any = useState([]);
  const getProducts = async () => {
    const products = await ApiClient.get("products")
      .then((products) => setProducts(products.data?.data))
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div className="max-w-7xl mx-auto
    md:px-4 lg:px-0 ">

      <h1 className="text-primary font-bold text-2xl py-5 text-center">Shop By Category</h1>
      
      {/* filters */}
        <main className="flex gap-3 flex-wrap justify-center ">
          <div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/camera.png" alt="camera" className="w-[100px]"  />
            <h1 className="text-center font-bold text-black">CCTV Cameras</h1>
          </div>
          <div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/chad.png" alt="camera" className="w-[130px]"  />
            <h1 className="text-center font-bold text-black">LED chandeliers</h1>
          </div><div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/stab.png" alt="camera" className="w-[130px]"  />
            <h1 className="text-center font-bold text-black">Stabilizers</h1>
          </div>
           <div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/4.png" alt="camera" className="w-[140px]"  />
            <h1 className="text-center font-bold text-black">Solar Batteries</h1>
          </div>
          <div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/2.png" alt="camera" className="w-[140px]"  />
            <h1 className="text-center font-bold text-black">Controllers</h1>
          </div>
          <div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/1.png" alt="camera" className="w-[130px]"  />
            <h1 className="text-center font-bold text-black">Inverters</h1>
          </div>
<div className="shadow-md w-[160px] h-[160px] bg-white flex flex-col items-center justify-between py-2 rounded-xl">
            <img src="/5.png" alt="camera" className="w-[140px]"  />
            <h1 className="text-center font-bold text-black">All in one</h1>
          </div>

        </main>
      

      {/* end filters */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {/* Product items would go here */}
        {products.map((pro: any) => (
          <Link key={pro._id}  href={`/store/product/${pro._id}`}>
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              className="min-h-40 w-full bg-gray-200 rounded mb-4"
              src="/1.png"
              alt="Product Image"
            ></img>
            <h3 className="text-lg font-semibold mb-2">{pro?.name}</h3>
            <p className="text-gray-600 mb-4">N{pro?.price}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
          </Link>
        ))}

        {/* Repeat product items as needed */}
      </div>
    </div>
  );
}

export default ProductsBanner;
