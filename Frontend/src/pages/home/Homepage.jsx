import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../../utils/axios";
import { FiSearch, FiUpload, FiLoader, FiX, FiHeart } from "react-icons/fi";
import { ExternalLink, Heart, Loader2, Search, Star, Upload, X } from "lucide-react";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [recommendedResults, setRecommendedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialCacheLoaded, setInitialCacheLoaded] = useState(false);

  //   useEffect(() => {
  //   const fetchCache = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get(`/cache/getcache`);
  //       setAllResults(response.data.frontendArray || []);
  //       setRecommendedResults(response.data.responseArray || []);
  //     } catch (error) {
  //       console.error("Failed to fetch cache:", error);
  //     } finally {
  //       setLoading(false);
  //       setInitialCacheLoaded(true); // ensure we don't reload
  //     }
  //   };

  //   if (!initialCacheLoaded) {
  //     fetchCache();
  //   }
  // }, [initialCacheLoaded]);

  const searchByText = async () => {
    if (!query) return;
    try {
      const response = await axiosInstance.post(
        `/products/find-product/text?item=${query}`,
        { image: false }
      );
      setAllResults(response.data.frontendArray || []);
      setRecommendedResults(response.data.responseArray || []);
    } catch (error) {
      console.error("Text search failed:", error);
    }
  };

  const searchByImage = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("isImage", "true");
      const response = await axiosInstance.post(
        "/products/find-product/image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAllResults(response.data.frontendArray || []);
      setRecommendedResults(response.data.responseArray || []);
    } catch (error) {
      console.error("Image search failed:", error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setAllResults([]);
    setRecommendedResults([]);
    if (image) {
      await searchByImage();
    } else if (query) {
      await searchByText();
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const addToWishlist = async (item) => {
    try {
      await axiosInstance.post("wish/wishlist", item);
      alert("Added to wishlist ❤️");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

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
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          
          <button
            onClick={() => addToWishlist(item)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-rose-500 hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <Heart size={18} />
          </button>
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
            <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-grow">
              {item.description.substring(0,100)}
            </p>
          )}
          
          <div className="flex gap-3 mt-auto">
            <a
              href={item.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white text-center rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              View Details
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white to-stone-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full filter blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-300 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 text-stone-900 tracking-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-extralight">Threads</span>
              <span className="font-normal text-rose-600">AI</span>
            </motion.h1>

            <motion.p
              className="text-stone-600 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover your perfect style with intelligent fashion search
            </motion.p>
          </div>

          {/* Search Interface */}
          <motion.div
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-2">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-stone-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for fashion items, styles, colors..."
                    className="pl-12 pr-4 py-4 rounded-xl w-full bg-transparent text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-0 text-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="p-3 rounded-xl cursor-pointer bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center text-stone-600">
                    <Upload size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                  {imagePreview && (
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-12 h-12 rounded-xl object-cover border-2 border-stone-200"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full text-white text-xs flex items-center justify-center transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSearch}
                    disabled={loading || (!query && !image)}
                    className="px-8 py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Searching
                      </>
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="flex justify-center items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
                  <p className="text-stone-600 text-lg">Finding your perfect matches...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="space-y-16">
            <AnimatePresence>
              {recommendedResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <h2 className="text-4xl font-light text-stone-900 mb-3">
                      Curated for You
                    </h2>
                    <p className="text-stone-600 text-lg">
                      Handpicked selections based on your search
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendedResults.map((item, index) => (
                      <ProductCard key={`rec-${index}`} item={item} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {allResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <h2 className="text-4xl font-light text-stone-900 mb-3">
                      All Results
                    </h2>
                    <p className="text-stone-600 text-lg">
                      {allResults.length} items found matching your search
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allResults.map((item, index) => (
                      <ProductCard key={`all-${index}`} item={item} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}