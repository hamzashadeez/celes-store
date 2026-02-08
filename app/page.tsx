import { Header } from "@/components/Header";
import ProductsBanner from "@/components/ProductsBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#14213D] text-[#E5E5E5]">
      <Header />

      {/* HERO */}
      <header className="relative w-full h-[580px] md:h-[640px]">
        {/* background image */}
          <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center filter blur-sm" />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* hero content */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                POWER YOUR WORLD
              </h1>
              <p className="mt-4 text-lg text-[#E5E5E5]/90">
                Scalable Energy & Cooling Solutions — quality electronics delivered fast.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="bg-[#FCA311] text-[#14213D] px-6 py-3 rounded-md font-semibold shadow">
                  Shop Now
                </button>
                <button className="px-6 py-3 border border-[#E5E5E5]/30 rounded-md">
                  Browse
                </button>
              </div>
            </div>
          </div>
        <div className=" px-6 md:px-2 mt-6 md:mt-12 w-full md:w-4/5 mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center text-[#FCA311] font-bold">
                ⚡
              </div>
              <div>
                <h3 className="text-white font-semibold">Fast Shipping</h3>
                <p className="text-sm text-[#E5E5E5]/80">Delivered to your doorstep quickly.</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center text-[#FCA311] font-bold">
                🔒
              </div>
              <div>
                <h3 className="text-white font-semibold">Secure Payments</h3>
                <p className="text-sm text-[#E5E5E5]/80">Safe and encrypted checkout.</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center text-[#FCA311] font-bold">
                ⭐
              </div>
              <div>
                <h3 className="text-white font-semibold">Top Brands</h3>
                <p className="text-sm text-[#E5E5E5]/80">Quality products you can trust.</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* feature cards row (overlapping bottom of hero) */}
      </header>

      {/* MAIN: light panel for products to match design */}
      <main className="container mx-auto px-6 md:px-12">
        <div className=" rounded-lg p-6">
          <ProductsBanner />
        </div>
      </main>
    </div>
  );
}
