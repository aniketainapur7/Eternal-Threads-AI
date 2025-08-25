import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock axios instance
const axiosInstance = {
  get: async () => {
    await new Promise((res) => setTimeout(res, 1000));
    const mockProducts = [
      {
        name: "Silk Floral Midi Dress",
        price: "2,999",
        rating: 4.8,
        description: "Elegant silk dress with hand-painted floral motifs.",
        imageUrl: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
        productLink: "#",
      },
      {
        name: "Vintage Denim Jacket",
        price: "1,899",
        rating: 4.6,
        description: "Classic vintage-inspired denim jacket with premium cotton blend.",
        imageUrl: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
        productLink: "#",
      },
      {
        name: "Cashmere Turtleneck",
        price: "4,500",
        rating: 4.9,
        description: "Luxurious 100% cashmere turtleneck in timeless neutral tones.",
        imageUrl: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
        productLink: "#",
      },
      {
        name: "Pleated Midi Skirt",
        price: "1,599",
        rating: 4.7,
        description: "Elegant pleated skirt in premium wool blend with silk lining.",
        imageUrl: "https://images.pexels.com/photos/1566479/pexels-photo-1566479.jpeg",
        productLink: "#",
      },
      {
        name: "Leather Ankle Boots",
        price: "3,299",
        rating: 4.5,
        description: "Handcrafted leather ankle boots with block heel.",
        imageUrl: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
        productLink: "#",
      },
      {
        name: "Silk Scarf Collection",
        price: "899",
        rating: 4.8,
        description: "Premium silk scarves with artistic prints.",
        imageUrl: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg",
        productLink: "#",
      },
    ];

    // Repeat data to simulate a lot of items
    const extended = Array.from({ length: 12 }, (_, i) => ({
      ...mockProducts[i % mockProducts.length],
      name: mockProducts[i % mockProducts.length].name + ` ${i + 1}`,
    }));

    return {
      data: {
        topPicks: extended,
        bestRated: extended,
        premium: extended,
      },
    };
  },
};

export default function TrendingPage() {
  const [trendingData, setTrendingData] = useState({
    topPicks: [],
    bestRated: [],
    premium: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products/trending");
        setTrendingData({
          topPicks: response.data.topPicks,
          bestRated: response.data.bestRated,
          premium: response.data.premium,
        });
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const ProductCard = ({ item, index }) => {
    const imageSrc = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;

    return (
      <motion.a
        href={item.productLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer flex flex-col border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div className="overflow-hidden h-72">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{item.name}</h2>
          <p className="text-gray-600 text-sm mb-3 flex-grow">{item.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-gray-900 font-bold">₹ {item.price}</p>
            <p className="text-yellow-500 flex items-center gap-1">⭐ {item.rating}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 bg-rose-500 rounded-full font-bold text-white text-sm">
            View Product
          </span>
        </div>
      </motion.a>
    );
  };

  const Section = ({ title, gradient, products }) => (
    <AnimatePresence>
      {products.length > 0 && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`text-3xl font-bold mb-6 text-transparent bg-clip-text ${gradient}`}
          >
            {title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item, index) => (
              <ProductCard key={`${title}-${index}`} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-white px-6 py-13 relative overflow-hidden">
      {/* Subtle pastel blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose-100/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-100/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 relative w-full max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-teal-400 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Trending Now
        </motion.h1>

        <motion.p
          className="text-gray-700 text-center max-w-2xl mx-auto mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover the hottest picks, top-rated favorites, and premium collections curated just for you.
        </motion.p>

        {loading ? (
          <div className="flex justify-center items-center">
            <motion.div
              className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        ) : (
          <>
            <Section
              title="🔥 Top Picks"
              gradient="bg-gradient-to-r from-rose-500 to-amber-400"
              products={trendingData.topPicks}
            />
            <Section
              title="⭐ Best Rated"
              gradient="bg-gradient-to-r from-teal-400 to-blue-400"
              products={trendingData.bestRated}
            />
            <Section
              title="💎 Premium Finds"
              gradient="bg-gradient-to-r from-purple-400 to-pink-400"
              products={trendingData.premium}
            />
          </>
        )}
      </div>
    </div>
  );
}
