import { useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://lh6zvgwv-3000.inc1.devtunnels.ms/api/products/nyka",
        { query } // simplified body
      );

      console.log(res.data[0].response.products);

      // ⚡ Adjust this based on backend shape
      const products = res.data[0].response?.products || [];
      setResults(products);

      console.log("Products:", products);
    } catch (error) {
      console.error(error);
      alert("Error fetching results");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Fashion Search Engine</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search fashion items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-l-lg px-4 py-2 w-80 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/300"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.brand}</p>
                <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>

                {/* Buy Now Button */}
                <a
                  href={`https://www.nykaafashion.com${item.actionUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-pink-600 text-white px-4 py-2 rounded-xl text-center hover:bg-pink-700 transition"
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No results yet. Try searching.
          </p>
        )}
      </div>
    </div>
  );
}
