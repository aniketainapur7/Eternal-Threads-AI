import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { Loader2, X, Heart, Star, ExternalLink, Sparkles, ArrowLeft } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/wish/wishlistt");
      setWishlist(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (productId) => {
    try {
      await axiosInstance.delete(`/wish/deleteitem`, { data: { productId } });
      setWishlist((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Product Card
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
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Remove Button */}
          <button
            onClick={() => handleRemove(item.productId)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-red-500 hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <X size={18} />
          </button>

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

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-semibold text-stone-900 text-lg mb-2 leading-tight group-hover:text-stone-700 transition-colors">
            {item.name}
          </h3>

          <div className="flex items-center justify-between mb-3">
            {item.price && <p className="text-stone-900 font-bold text-xl">₹{item.price}</p>}
            {item.rating !== undefined && (
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="text-stone-600 text-sm font-medium">{item.rating}</span>
              </div>
            )}
          </div>

          {item.description && (
            <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
            <div className="flex items-center gap-1 text-rose-500">
              <Heart size={16} fill="currentColor" />
              <span className="text-stone-600 text-sm">Saved</span>
            </div>
            <a
              href={item.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 hover:text-stone-700 font-medium text-sm transition-colors flex items-center gap-1"
            >
              Shop Now
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full filter blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-300 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.button
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft size={20} />
            Back to Search
          </motion.button>

          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-stone-900 tracking-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              My <span className="font-normal text-rose-600">Wishlist</span>
            </motion.h1>

            <motion.p
              className="text-stone-600 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your curated collection of fashion favorites
            </motion.p>

            <motion.button
              onClick={() => navigate("/ai-mashups")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Sparkles size={20} />
              Generate AI Mashups
            </motion.button>
          </div>

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
                  <p className="text-stone-600 text-lg">Loading your wishlist...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8">
            <AnimatePresence>
              {wishlist.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-light text-stone-900 mb-2">
                      {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
                    </h2>
                    <p className="text-stone-600">
                      Your personal collection of fashion finds
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlist.map((item, index) => (
                      <ProductCard key={item.productId || index} item={item} index={index} />
                    ))}
                  </div>
                </motion.div>
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
                        <Heart size={32} className="text-stone-400" />
                      </div>
                      <h3 className="text-2xl font-light text-stone-900 mb-4">
                        Your wishlist is empty
                      </h3>
                      <p className="text-stone-600 mb-8 leading-relaxed">
                        Start exploring and save the fashion pieces you love. 
                        Your curated collection will appear here.
                      </p>
                      <button
                        onClick={() => navigate("/")}
                        className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium transition-all duration-300 inline-flex items-center gap-2"
                      >
                        Start Shopping
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
