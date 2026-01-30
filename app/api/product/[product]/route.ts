import connectDB from "@/connectDB";
import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/productModel";

export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        const body = await request.json();

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated", product: updatedProduct });
    } catch (error: any) {
        console.error("Error while updating product data:", error);
        return NextResponse.json(
            { message: "Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ product });
    } catch (error: any) {
        console.error("Error while fetching product:", error);
        return NextResponse.json(
            { message: "Error", error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted", product: deletedProduct });
    } catch (error: any) {
        console.error("Error while deleting product:", error);
        return NextResponse.json(
            { message: "Error", error: error.message },
            { status: 500 }
        );
    }
}