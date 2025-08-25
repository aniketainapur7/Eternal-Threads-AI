import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

const steps = [
  { id: 1, field: "stylePreferences", label: "Choose your style preferences", options: ["formal", "casual", "boho", "streetwear", "sporty"] },
  { id: 2, field: "preferredColors", label: "Select your preferred colors", options: ["yellow", "pink", "purple", "green", "grey", "red", "white"] },
  { id: 3, field: "preferredFabrics", label: "Select preferred fabrics", options: ["denim", "polyester", "silk", "wool"] },
  { id: 4, field: "interestedIn", label: "What are you interested in?", options: ["T-shirts", "Suits", "Jeans", "Sandals", "Sneakers", "Activewear", "Hoodies", "Jewelry"] },
  { id: 5, field: "role", label: "Are you a Fashion Designer?", options: ["Yes", "No"] }
];

function FashionPreferencesForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    stylePreferences: [],
    preferredColors: [],
    preferredFabrics: [],
    interestedIn: [],
    role: ""
  });
  const [loading, setLoading] = useState(false);

  const handleOptionToggle = (field, option) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(option)) {
        return { ...prev, [field]: arr.filter(o => o !== option) };
      } else {
        return { ...prev, [field]: [...arr, option] };
      }
    });
  };

  const nextStep = () => {
    const field = steps[currentStep].field;
    if (!formData[field] || formData[field].length === 0) return;
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/update", formData);
      navigate("/home");
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white px-4">
      {/* Pastel background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose-100/30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-100/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Form Card */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-teal-400">
            {steps[currentStep].label}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {steps[currentStep].options.map(option => {
              const selected = formData[steps[currentStep].field].includes(option);
              return (
                <motion.button
                  key={option}
                  onClick={() => handleOptionToggle(steps[currentStep].field, option)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-4 rounded-xl border font-medium transition text-gray-800
                    ${selected ? "bg-gradient-to-r from-rose-400 via-purple-400 to-teal-300 text-white shadow-lg" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}
                  `}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition font-medium"
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl transition font-medium text-white"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition font-medium text-white"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>

          {/* Step Progress */}
          <div className="w-full mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-gray-500 text-sm text-right mt-1">{`Step ${currentStep + 1} of ${steps.length}`}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FashionPreferencesForm;
