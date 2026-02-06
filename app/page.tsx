import { Header } from "@/components/Header";
import LoginClient from "./auth/login/LoginClient";
import ProductsBanner from "@/components/ProductsBanner";
import Image from "next/image";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* <main className="bg-gradient-to-r from-gray-200 to-indigo-200 py-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center w-4/5 md:w-3/5">
          The Best Store to buy Cheap and High quality Electronics Online{" "}
        </h1>
      </main> */}
      <div className="relative w-full h-64 md:h-96 bg-gray-200">
        <Image src="/banner.png" alt="Banner" layout="fill" objectFit="cover" />
      </div>
      {/* git */}
     
      <ProductsBanner />

    </div>
  );
}
