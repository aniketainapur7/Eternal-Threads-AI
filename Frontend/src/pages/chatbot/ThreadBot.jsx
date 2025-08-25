import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../../utils/axios";
import { FiUpload, FiX, FiSend, FiHeart, FiLoader } from "react-icons/fi";
import { ExternalLink } from "lucide-react";

export default function ThreadBot() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = async () => {
    if (!query && !image) return;

    const userMessage = {
      type: "user",
      text: query || "📷 Image uploaded",
      image: imagePreview || null,
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      let response;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("isImage", true);
        response = await axiosInstance.post("/products/find-product/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axiosInstance.post(`/products/find-product/text?item=${query}`, { image: false });
      }

      const botMessage = {
        type: "bot",
        text: "Here are some fashion recommendations for you:",
        recommendations: response?.data?.responseArray || generateMockRecommendations(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setQuery("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
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

  const RecommendationCard = ({ item }) => {
    const imageSrc = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;

    return (
      <motion.div
        whileHover={{ y: -4, shadow: "0 8px 20px rgba(0,0,0,0.12)" }}
        className="bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col overflow-hidden transition-all duration-300"
      >
        <img src={imageSrc} alt={item.name} className="w-full h-44 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-stone-900 font-semibold text-sm line-clamp-2">{item.name}</h3>
          {item.price && <p className="text-teal-500 font-bold mt-1">₹{item.price}</p>}
        </div>
        <div className="flex items-center gap-2 p-2 border-t border-stone-100">
          <a
            href={item.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-1 text-center bg-rose-600 text-white text-xs rounded-xl font-medium hover:bg-rose-700 transition"
          >
            View <ExternalLink size={12} className="inline-block ml-1" />
          </a>
          <button
            onClick={() => addToWishlist(item)}
            className="px-3 py-1 bg-stone-900 text-white rounded-xl flex items-center justify-center hover:bg-stone-800 transition"
          >
            <FiHeart size={14} />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 relative flex flex-col items-center p-6">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-stone-300 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 w-full max-w-3xl flex flex-col h-full">
        {/* Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-light mb-6 text-center text-stone-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Threads <span className="text-rose-600 font-medium">Fashion AI</span>
        </motion.h1>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto mb-4 p-6 bg-white rounded-3xl shadow-sm space-y-4 scrollbar-thin scrollbar-thumb-stone-400 scrollbar-track-stone-200">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-xs p-4 rounded-2xl ${msg.type === "user" ? "bg-teal-600 text-white" : "bg-stone-100 text-stone-900"}`}
              >
                {msg.text && <p className="text-sm">{msg.text}</p>}
                {msg.image && <img src={msg.image} alt="uploaded" className="mt-2 rounded-lg" />}
                {msg.recommendations && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.recommendations.map((item, index) => (
                      <RecommendationCard key={index} item={item} />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center mt-2">
              <FiLoader className="animate-spin text-rose-500 text-2xl" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2 items-center mt-auto">
          <input
            type="text"
            placeholder="Ask about fashion or upload an image..."
            className="flex-1 px-4 py-3 rounded-full bg-stone-100 text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <label className="p-3 rounded-full cursor-pointer bg-stone-200 hover:bg-stone-300 transition flex items-center justify-center text-stone-700">
            <FiUpload />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {imagePreview && (
            <button onClick={removeImage} className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition">
              <FiX />
            </button>
          )}

          <button
            onClick={handleSearch}
            disabled={loading}
            className="p-3 bg-rose-600 rounded-full text-white flex items-center justify-center shadow-md hover:shadow-lg transition"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}

// // Mock Recommendations Fallback
// const generateMockRecommendations = () => {
//   return Array.from({ length: 6 }).map((_, i) => ({
//     name: ["Elegant Dress", "Casual Tee", "Luxury Handbag", "Sneakers", "Boho Skirt", "Designer Jacket"][i % 6],
//     imageUrl: [
//       "https://source.unsplash.com/400x400/?fashion,dress",
//       "https://source.unsplash.com/400x400/?fashion,tee",
//       "https://source.unsplash.com/400x400/?fashion,handbag",
//       "https://source.unsplash.com/400x400/?fashion,sneakers",
//       "https://source.unsplash.com/400x400/?fashion,skirt",
//       "https://source.unsplash.com/400x400/?fashion,jacket",
//     ][i % 6],
//     price: (1000 + i * 500).toString(),
//     productLink: "https://example.com/product",
//   }));
// };
