"use client";

import ApiClient from "@/lib/API";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {/* Product items would go here */}
        {products.map((pro: any) => (
          <div key={pro._id} className="bg-white p-4 rounded-lg shadow">
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
        ))}

        {/* Repeat product items as needed */}
      </div>
    </div>
  );
}

export default ProductsBanner;
