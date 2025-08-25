import React from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../../utils/axios";

// Sample images (replace with real URLs or local assets)
const designerImages = [
  "https://images.pexels.com/photos/7065660/pexels-photo-7065660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/5690325/pexels-photo-5690325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/7172814/pexels-photo-7172814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/6232230/pexels-photo-6232230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/7172815/pexels-photo-7172815.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://share.google/images/s2xx8Z4rCbQf0caXT",
  "https://images.pexels.com/photos/6738917/pexels-photo-6738917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/7172817/pexels-photo-7172817.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/6232232/pexels-photo-6232232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/7172816/pexels-photo-7172816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

    const amount = 1000;
  const handlePayment = async () => {
    try {
      const res = await axiosInstance.post("/payment/order", { amount });
      const data = res.data; // ✅ axios auto-parses JSON
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Tech Titans Pvt.Ltd",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await axiosInstance.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          const verifyData = res.data; // ✅ axios data
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.error(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

const ConnectWithDesigners = () => {
  const designers = [
    { id: 1, name: "Manish Malhotra", specialty: "Bridal Wear", price: "₹2000" },
    { id: 2, name: "Sabyasachi Mukherjee", specialty: "Luxury Couture", price: "₹2500" },
    { id: 3, name: "Ritu Kumar", specialty: "Traditional Wear", price: "₹1800" },
    { id: 4, name: "Tarun Tahiliani", specialty: "Fusion Wear", price: "₹2200" },
    { id: 5, name: "Anamika Khanna", specialty: "Contemporary Ethnic", price: "₹2100" },
    { id: 6, name: "Masaba Gupta", specialty: "Bold Prints", price: "₹1500" },
    { id: 7, name: "Neeta Lulla", specialty: "Costume Design", price: "₹1700" },
    { id: 8, name: "Wendell Rodricks", specialty: "Resort Wear", price: "₹1600" },
    { id: 9, name: "Abu Jani & Sandeep Khosla", specialty: "Luxury Embroidery", price: "₹2300" },
    { id: 10, name: "Rahul Mishra", specialty: "Sustainable Fashion", price: "₹1900" },
  ];

//   const handlePayNow = (designerName) => {
//     alert(`Redirecting to payment for ${designerName}...`);
//   };

  return (
    <div className="relative min-h-screen bg-white px-8 py-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-100/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400">
          👗 Connect with Fashion Designers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {designers.map((designer, index) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100 flex flex-col justify-between"
            >
              <motion.img
                src={designerImages[designer.id]}
                alt={designer.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{designer.name}</h3>
                <p className="text-gray-600 mt-2">{designer.specialty}</p>
                <p className="text-gray-900 font-bold mt-4">{designer.price}</p>
              </div>
              <button
                onClick={() => handlePayment(designer.price)}
                className="mt-6 py-3 px-5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-white font-semibold shadow-md hover:shadow-xl transition-all"
              >
                Pay Now to Connect
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWithDesigners;
