import connectDB from "@/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel"; // Ensure this matches your filename

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, price, category, amount, image } = body;

    // 1. Basic Validation
    if (!name || !price) {
      return NextResponse.json(
        { message: "Product name and price are required" },
        { status: 400 }
      );
    }

    // 2. Check for duplicate product names (Optional)
    const productExist = await Product.findOne({ name: name.trim() });
    if (productExist) {
      return NextResponse.json(
        { message: "A product with this name already exists" },
        { status: 400 }
      );
    }

    // 3. Prepare and Save
    const newProductData = {
      name: name.trim(),
      description,
      price,
      category,
      amount: amount || 0,
      image,
    };

    const product = await Product.create(newProductData);

    // 4. Return success response
    return NextResponse.json(
      {
        message: "Product created successfully! 📦",
        data: product,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();
    
    return NextResponse.json(
      {
        message: "Products retrieved successfully! 🛍️",
        data: products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  } 
}