import { Smartphone, Zap, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                🎉 New Year Special - Get 20% Extra Data!
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Stay Connected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Anytime, Anywhere
              </span>
            </h1>
            
            <p className="text-xl text-purple-100">
              Get instant mobile data at the best prices. Fast, reliable, and affordable data bundles for all networks.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                Buy Data Now
              </button>
              <button className="border-2 border-white/50 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                View Plans
              </button>
            </div>
            
            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-300" />
                <span className="text-sm">All Networks</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <ImageWithFallback 
                src="/man.jpg"
                alt="Mobile Data"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-pink-500 to-yellow-500 rounded-3xl -z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
