import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { Loader2, ArrowLeft, Sparkles, Star, ExternalLink, Palette, Wand2, Heart } from "lucide-react";

export default function AiMashups() {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch AI-generated outfits from backend
  const fetchOutfits = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/wish/getmatchingoutfit");
      setOutfits(response.data.outfitsResponse.outfits || []);
      console.log(response.data.outfitsResponse.outfits);
    } catch (error) {
      console.error("Failed to fetch AI mashups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

  // Product Card inside an outfit
  const ProductCard = ({ item, index }) => {
    const imageSrc = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;

    return (
      <motion.div
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8 }}
      >
        <div className="relative overflow-hidden bg-stone-50">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* View Product Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <a
              href={item.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/95 backdrop-blur-sm rounded-xl font-medium text-stone-900 hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0"
            >
              View Product
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-semibold text-stone-900 text-base mb-2 leading-tight group-hover:text-stone-700 transition-colors line-clamp-2">
            {item.name}
          </h3>

          <div className="flex items-center justify-between mb-3">
            {item.price && <p className="text-stone-900 font-bold text-lg">₹{item.price}</p>}
            {item.rating !== undefined && (
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-stone-600 text-sm font-medium">{item.rating}</span>
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 flex-grow">
              {item.description}
            </p>
          )}
        </div>
      </motion.div>
    );
  };

  // Outfit Card Container
  const OutfitCard = ({ outfit, index }) => {
    return (
      <motion.div
        className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
      >
        {/* Outfit Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-stone-100 rounded-2xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-1">
                {outfit.name || `Curated Look ${index + 1}`}
              </h2>
              <p className="text-stone-600 text-sm">
                AI-generated outfit • {outfit.items?.length || 0} pieces
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <Wand2 size={16} />
            <span>Styled by AI based on your preferences</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {outfit.items?.map((product, productIndex) => (
            <ProductCard key={product.productId || productIndex} item={product} index={productIndex} />
          ))}
        </div>

        {/* Outfit Actions */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-600">
            <Heart size={16} />
            <span className="text-sm">Save this combination</span>
          </div>
          <button className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium transition-colors duration-300 text-sm">
            Shop Complete Look
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full filter blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-300 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          {/* Navigation */}
          <motion.button
            onClick={() => navigate("/wishlist")}
            className="mb-8 flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft size={20} />
            Back to Wishlist
          </motion.button>

          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-stone-900 tracking-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI <span className="font-normal text-rose-600">Mashups</span>
            </motion.h1>

            <motion.p
              className="text-stone-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover perfectly curated outfits crafted by AI from your wishlist favorites
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center justify-center gap-8 text-stone-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-rose-500" />
                <span className="text-sm font-medium">AI-Powered Styling</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette size={18} className="text-rose-500" />
                <span className="text-sm font-medium">Personalized Combinations</span>
              </div>
            </motion.div>
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="flex justify-center items-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
                  <p className="text-stone-600 text-lg">Creating your perfect outfits...</p>
                  <p className="text-stone-500 text-sm mt-2">Our AI is analyzing your style preferences</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Outfits */}
          <div className="space-y-8">
            <AnimatePresence>
              {!loading && outfits.length > 0 ? (
                outfits.map((outfit, index) => (
                  <OutfitCard key={outfit.outfitId || index} outfit={outfit} index={index} />
                ))
              ) : (
                !loading && (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles size={32} className="text-stone-400" />
                      </div>
                      <h3 className="text-2xl font-light text-stone-900 mb-4">
                        No outfits generated yet
                      </h3>
                      <p className="text-stone-600 mb-8 leading-relaxed">
                        Add more items to your wishlist to unlock AI-powered outfit combinations. 
                        Our styling algorithm works best with diverse fashion pieces.
                      </p>
                      <button
                        onClick={() => navigate("/wishlist")}
                        className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium transition-all duration-300 inline-flex items-center gap-2"
                      >
                        View Wishlist
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
