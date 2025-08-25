import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../../utils/axios";
import axios from "axios";
import { Heart, Loader2, Search, Upload, X, ExternalLink, Star } from "lucide-react";

export default function FacialRecommend() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [gender, setGender] = useState(""); // new gender state
  const [recommendedResults, setRecommendedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image upload
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

  // Handle facial recommendation
  const handleRecommend = async () => {
    if (!image || !gender) return alert("Please upload an image and select gender!");
    setLoading(true);
    setRecommendedResults([]);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("gender", gender);

      const response = await axiosInstance.post("/faceskin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response)
      setRecommendedResults(response.data.products || []);
    } catch (error) {
      console.error("Recommendation failed:", error);
      alert("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (item) => {
    try {
      await axiosInstance.post("wish/wishlist", item);
      alert("Added to wishlist ❤️");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const ProductCard = ({ item, index }) => (
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
            {item.description.substring(0, 100)}
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

  return (
    <div className="min-h-screen bg-white to-stone-100 px-4 py-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extralight text-stone-900 mb-4">
          Threads <span className="font-normal text-rose-600">AI</span>
        </h1>
        <p className="text-stone-600 text-lg md:text-xl">
          Upload your photo and select your gender to discover the best fashion items for your facial features
        </p>
      </div>

      {/* Upload & Gender Selection */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-4 justify-center">
        <label className="p-3 rounded-xl cursor-pointer bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center text-stone-600">
          <Upload size={20} />
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>

        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 rounded-xl object-cover border-2 border-stone-200"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full text-white text-xs flex items-center justify-center transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          onClick={handleRecommend}
          disabled={loading || !image || !gender}
          className="px-8 py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analyzing...
            </>
          ) : (
            "Find Recommendations"
          )}
        </button>
      </div>

      {/* Recommendations */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {recommendedResults.map((item, index) => (
            <ProductCard key={index} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
