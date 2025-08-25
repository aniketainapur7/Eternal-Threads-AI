import React from "react";
import { motion } from "framer-motion";

// Live Data with real images
const latestLaunches = [
  {
    id: 1,
    brand: "Zara",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    title: "New Casual Wear",
    image: "https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Discover our latest collection blending modern minimalism with timeless style.",
    date: "August 10, 2025",
  },
  {
    id: 2,
    brand: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    title: "Athleisure Collection",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Experience comfort and style with our new sports and leisure range.",
    date: "August 11, 2025",
  },
  {
    id: 3,
    brand: "H&M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    title: "Urban Streetwear",
    image: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "The ultimate collection for city life, blending style and functionality.",
    date: "August 12, 2025",
  },
  {
    id: 4,
    brand: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    title: "Sustainable Line",
    image: "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Fashion that's good for the planet. Our new line uses recycled materials.",
    date: "August 13, 2025",
  },
  {
    id: 5,
    brand: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Puma_logo.svg",
    title: "Performance Gear",
    image: "https://images.pexels.com/photos/1107542/pexels-photo-1107542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Engineered for athletes, designed for everyday comfort and performance.",
    date: "August 14, 2025",
  },
  {
    id: 6,
    brand: "Levi's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Levi%27s_logo.svg",
    title: "Vintage Denim",
    image: "https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Classic denim with a modern twist. The perfect fit for any occasion.",
    date: "August 15, 2025",
  },
];

const trendingBrands = [
  {
    id: 1,
    brand: "Gucci",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Gucci_logo.svg",
    image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    brand: "Balenciaga",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Balenciaga_logo.svg",
    image: "https://images.pexels.com/photos/2036643/pexels-photo-2036643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    brand: "Louis Vuitton",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Louis_Vuitton_Logo.svg",
    image: "https://images.pexels.com/photos/1756956/pexels-photo-1756956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    brand: "Prada",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Prada_logo.svg",
    image: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const featuredCollections = [
  {
    id: 1,
    brand: "Chanel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Chanel_logo.svg",
    title: "Spring Summer 2025",
    image: "https://images.pexels.com/photos/1109000/pexels-photo-1109000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    brand: "Hermes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Herm%C3%A8s_logo.svg",
    title: "Luxury Leather Goods",
    image: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    brand: "Dior",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Dior_logo.svg",
    title: "Haute Couture",
    image: "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    brand: "Fendi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Fendi_logo.svg",
    title: "Signature Accessories",
    image: "https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 5,
    brand: "Armani",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Armani_Logo.svg",
    title: "Timeless Elegance",
    image: "https://images.pexels.com/photos/1038930/pexels-photo-1038930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 6,
    brand: "Burberry",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Burberry_logo.svg",
    title: "Classic Outerwear",
    image: "https://images.pexels.com/photos/1569949/pexels-photo-1569949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function Brands() {
  return (
    <div className="min-h-screen bg-white py-16 px-6 relative">
      {/* Page Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400">
        🌟 Brands & Collections
      </h1>

      {/* Latest Launches */}
      <Section
        title="Latest Launches"
        items={latestLaunches}
        type="full"
        buttonText="View Collection"
      />

      {/* Trending Brands */}
      <Section
        title="Trending Brands"
        items={trendingBrands}
        type="brandOnly"
        buttonText="Explore"
      />

      {/* Featured Collections */}
      <Section
        title="Featured Collections"
        items={featuredCollections}
        type="full"
        buttonText="Discover"
      />
    </div>
  );
}

// Reusable Section Component
const Section = ({ title, items, type = "full", buttonText }) => {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-left text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
        {title}
      </h2>

      <div
        className={`grid gap-6 ${
          type === "full"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        }`}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title || item.brand}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              {item.logo && (
                <img src={item.logo} alt={item.brand} className="h-10 w-auto mb-2" />
              )}
              {item.title && (
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
              )}
              {item.brand && !item.title && (
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.brand}
                </h3>
              )}
              {item.description && (
                <p className="text-gray-600 flex-1">{item.description}</p>
              )}
              <button className="mt-4 py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-white font-semibold shadow-md hover:shadow-xl transition-all">
                {buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};