import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../../utils/axios";
import { Loader2, ExternalLink, Sparkles } from "lucide-react";

export default function Friends() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMutualRecommendations = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/users/friends");
        setRecommendations(response.data.recommendations.reverse() || []);
      } catch (error) {
        console.error("Failed to fetch mutuals recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMutualRecommendations();
  }, []);

  const ProductCard = ({ item, index }) => {
    const imageSrc = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;

    return (
      <motion.a
        href={item.productLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 flex flex-col transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -6 }}
      >
        <div className="relative overflow-hidden bg-stone-50">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-semibold text-stone-900 text-base mb-2 leading-tight line-clamp-2 group-hover:text-stone-700 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            {item.price && <p className="text-stone-900 font-bold text-lg">₹{item.price}</p>}
            {item.rating !== undefined && (
              <p className="text-amber-500 flex items-center gap-1 font-medium">⭐ {item.rating}</p>
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 bg-rose-600 rounded-full font-bold text-white text-sm flex items-center gap-1">
            View Product <ExternalLink size={14} />
          </span>
        </div>
      </motion.a>
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 py-13 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-5xl md:text-6xl font-light mb-3 text-center text-stone-900 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mutuals' <span className="text-rose-600 font-normal">Recommendations</span>
        </motion.h1>

        <motion.p
          className="text-stone-600 text-center max-w-2xl mx-auto mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Curated picks from people you trust 👯
        </motion.p>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
          </div>
        ) : recommendations.length === 0 ? (
          <p className="text-stone-500 text-center py-20">No recommendations from mutuals yet.</p>
        ) : (
          <AnimatePresence>
            {recommendations.map((rec, recIndex) => (
              <div key={recIndex} className="mb-16">
                <h2 className="text-3xl font-semibold text-stone-900 mb-6">
                  {rec.product} ({rec.score})
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {[...(rec.meesho || []), ...(rec.nykaa || [])].map((item, index) => (
                    <ProductCard key={index} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
