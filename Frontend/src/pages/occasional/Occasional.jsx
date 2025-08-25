import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Live data with working image URLs
const festivals = [
  { id: 1, name: "Diwali", image: "http://googleusercontent.com/image_collection/image_retrieval/9863181124110517261_1", description: "Festive wear for Diwali celebrations." },
  { id: 2, name: "Holi", image: "http://googleusercontent.com/image_collection/image_retrieval/10935470390837842679_0", description: "Bright and colorful outfits for Holi." },
  { id: 3, name: "Eid", image: "http://googleusercontent.com/image_collection/image_retrieval/999014890968384558_2", description: "Elegant traditional outfits for Eid." },
  { id: 4, name: "Christmas", image: "http://googleusercontent.com/image_collection/image_retrieval/649663844928353664_0", description: "Stylish festive wear for Christmas." },
  { id: 5, name: "New Year", image: "http://googleusercontent.com/image_collection/image_retrieval/14249399310132145981_1", description: "Glamorous party outfits for New Year." },
];

const occasions = [
  { id: 1, name: "Weddings", image: "http://googleusercontent.com/image_collection/image_retrieval/13260621303168760338_0", description: "Bridal and groom wear." },
  { id: 2, name: "Parties", image: "http://googleusercontent.com/image_collection/image_retrieval/7970010227533863999_1", description: "Trendy party outfits." },
  { id: 3, name: "Office Events", image: "http://googleusercontent.com/image_collection/image_retrieval/8834955061571209638_0", description: "Formal and semi-formal wear." },
  { id: 4, name: "Casual Meetups", image: "http://googleusercontent.com/image_collection/image_retrieval/11109097800433822757_1", description: "Comfortable and stylish casual wear." },
  { id: 5, name: "Festive Gatherings", image: "http://googleusercontent.com/image_collection/image_retrieval/9358070352531537876_0", description: "Special collections for festivals." },
];

export default function Occasional() {
  return (
    <div className="relative min-h-screen bg-white px-8 py-16 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-100/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🎉 Occasions & Festivals
        </motion.h1>

        {/* Festivals Section */}
        <Section title="Popular Festivals" items={festivals} />

        {/* Special Occasions Section */}
        <Section title="Special Occasions" items={occasions} />

        {/* Seasonal Collections Section */}
        <Section
          title="Seasonal Collections"
          items={[
            { id: 1, name: "Spring Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/13063933087680691003_1", description: "Trendy outfits for this season." },
            { id: 2, name: "Summer Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/11160705552292294974_0", description: "Trendy outfits for this season." },
            { id: 3, name: "Fall Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/7530396994266219438_2", description: "Trendy outfits for this season." },
            { id: 4, name: "Winter Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/8144558545382010217_1", description: "Trendy outfits for this season." },
            { id: 5, name: "Spring Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/13063933087680691003_3", description: "Trendy outfits for this season." },
            { id: 6, name: "Summer Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/11160705552292294974_2", description: "Trendy outfits for this season." },
            { id: 7, name: "Fall Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/7530396994266219438_0", description: "Trendy outfits for this season." },
            { id: 8, name: "Winter Collection", image: "http://googleusercontent.com/image_collection/image_retrieval/8144558545382010217_3", description: "Trendy outfits for this season." },
          ]}
        />
      </div>
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, items }) => {
  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-left text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            {title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all flex flex-col justify-between"
              >
                {/* <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                /> */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mt-2 flex-1">{item.description}</p>
                  <button className="mt-4 py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-white font-semibold shadow-md hover:shadow-xl transition-all">
                    Explore
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};