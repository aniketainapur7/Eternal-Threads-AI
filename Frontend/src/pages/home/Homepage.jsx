import React, { useState } from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../../utils/axios";

function Home() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [recommendedResults, setRecommendedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchByText = async () => {
    if (!query) return;
    // setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/products/find-product/text?item=${query}`,
        { image: false }
      );
      setAllResults(response.data.frontendArray || []);
      setRecommendedResults(response.data.responseArray || []);
    } catch (error) {
      console.error("Text search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchByImage = async () => {
    if (!image) return;
    // setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("isImage", true);
      const response = await axiosInstance.post(
        "/products/find-product/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAllResults(response.data.frontendArray || []);
      setRecommendedResults(response.data.responseArray || []);
    } catch (error) {
      console.error("Image search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    if (image) searchByImage();
    else if (query) searchByText();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // 🔹 Card Component (to reuse for recommended & all results)
  const ProductCard = ({ item }) => {
    const imageSrc = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;
    return (
      <motion.a
        href={item.productLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative rounded-3xl overflow-hidden shadow-xl cursor-pointer transform transition hover:scale-105 hover:shadow-2xl bg-gray-800"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={imageSrc}
          alt={item.name}
          className="w-full h-80 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-110"
        />
        <div className="p-4 bg-gray-900/80 backdrop-blur-sm rounded-b-3xl">
          <h2 className="text-lg font-bold text-white truncate">{item.name}</h2>
          {item.price && <p className="text-green-400 font-semibold mt-1">₹ {item.price}</p>}
          {item.rating !== undefined && (
            <p className="text-yellow-400 mt-1">⭐ {item.rating}</p>
          )}
          {item.description && (
            <p className="text-gray-300 text-sm mt-2 line-clamp-2">{item.description}</p>
          )}
          <button className="mt-3 w-full py-2 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold text-white transition">
            View Product
          </button>
        </div>
      </motion.a>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-40 relative">
      {/* Header */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-pink-500 mb-4 tracking-wide"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Threads AI
      </motion.h1>

      <motion.p
        className="text-gray-300 text-center max-w-2xl mb-10 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Discover trending styles, search by text or image, and get personalized fashion recommendations instantly.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <input
          type="text"
          placeholder="Search fashion products..."
          className="p-4 rounded-xl w-full sm:w-2/3 bg-white border border-pink-500 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <label className="p-4 border rounded-xl cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition flex items-center justify-center text-white font-semibold shadow-md">
          {image ? "Image Selected" : "Upload Image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>

        <button
          onClick={handleSearch}
          className="px-6 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </motion.div>

      {/* Recommended Section */}
      {recommendedResults.length > 0 && (
        <div className="w-full max-w-6xl mb-12">
          <h2 className="text-2xl font-bold mb-6 text-pink-400">✨ Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommendedResults.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* All Results Section */}
      {allResults.length > 0 && (
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 text-pink-400">📦 All Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {allResults.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60">
    <motion.div
      className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    />
  </div>
)}
    </div>
  );
}

export default Home;
