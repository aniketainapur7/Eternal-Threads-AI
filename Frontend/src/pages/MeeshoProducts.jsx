import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MeeshoProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `https://lh6zvgwv-3000.inc1.devtunnels.ms/api/products/find-product/?item=${query}`,
      );
      console.log(res)
      setProducts(res.data.catalogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // optional: load default products once
  useEffect(() => {
    handleSearch({ preventDefault: () => {} });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meesho Products</h1>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="rounded-xl w-full h-48 object-cover mb-3"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.sub_sub_category_name}</p>
            <p className="text-pink-600 font-bold mt-2">
              ₹{item.min_product_price}
            </p>
            <p className="text-gray-400 text-sm">
              Discount: {item.discount_text}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">No products found.</p>
      )}
    </div>
  );
}
