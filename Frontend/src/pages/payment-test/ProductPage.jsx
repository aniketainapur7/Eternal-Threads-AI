import { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [amount, setAmount] = useState(350);

  // handlePayment Function
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
      name: "Randve Losers Pvt.Ltd",
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-[#222f3e] text-white rounded-xl shadow-xl overflow-hidden">
        {/* CardHeader */}
        <div className="relative h-96 bg-[#2C3A47]">
          <img
            src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* CardBody */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">My First Product</h2>
          <p className="text-lg">
            ₹350 <span className="line-through text-gray-400">₹699</span>
          </p>
        </div>

        {/* CardFooter */}
        <div className="p-4 pt-0">
          <button
            onClick={handlePayment}
            className="w-full bg-[#1B9CFC] hover:bg-[#1287d8] text-white py-2 rounded-lg transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
