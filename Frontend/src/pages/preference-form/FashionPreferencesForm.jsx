import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

const steps = [
    { id: 1, field: "stylePreferences", label: "Choose your style preferences", options: ["formal", "casual", "boho", "streetwear", "sporty"] },
    { id: 2, field: "preferredColors", label: "Select your preferred colors", options: ["yellow", "pink", "purple", "green", "grey", "red", "white"] },
    { id: 3, field: "preferredFabrics", label: "Select preferred fabrics", options: ["denim", "polyester", "silk", "wool"] },
    { id: 4, field: "interestedIn", label: "What are you interested in?", options: ["T-shirts", "Suits", "Jeans", "Sandals", "Sneakers", "Activewear", "Hoodies", "Jewelry"] },
];

function FashionPreferencesForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        stylePreferences: [],   // frontend matches backend
        preferredColors: [],
        preferredFabrics: [],
        interestedIn: [],
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
        if (formData[field].length === 0) return; // Require selection
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axiosInstance.post("/auth/update", formData);
            // Navigate after saving preferences
            navigate("/home"); // or any dashboard route
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
            {/* Progress Bar */}
            <div className="w-full max-w-xl mb-6">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-2 bg-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <p className="text-gray-400 text-sm text-right mt-1">{`Step ${currentStep + 1} of ${steps.length}`}</p>
            </div>

            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-xl bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
                >
                    <h2 className="text-2xl font-bold text-pink-500">{steps[currentStep].label}</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {steps[currentStep].options.map(option => {
                            const selected = formData[steps[currentStep].field].includes(option);
                            return (
                                <motion.button
                                    key={option}
                                    onClick={() => handleOptionToggle(steps[currentStep].field, option)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`py-2 px-4 rounded-xl border font-medium transition 
                    ${selected ? "bg-pink-500 text-white shadow-lg" : "bg-white bg-opacity-10 text-gray-200 border-pink-500"}`}
                                >
                                    {option}
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="flex justify-between mt-6">
                        {currentStep > 0 && (
                            <button
                                onClick={prevStep}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
                            >
                                Previous
                            </button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={nextStep}
                                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl transition"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default FashionPreferencesForm;
