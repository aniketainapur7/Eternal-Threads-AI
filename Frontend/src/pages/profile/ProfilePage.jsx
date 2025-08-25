import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "../../utils/axios";
import { FiEdit, FiSave, FiX } from "react-icons/fi";

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch profile
    useEffect(() => {
        if (!isLoaded) return;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/users/myprofile");
                setProfile(res.data);
                setFormData(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchProfile();
        else setLoading(false);
    }, [user, isLoaded]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const saveProfile = async () => {
        try {
            setLoading(true);
            await axiosInstance.post("/auth/update", formData);
            setProfile(formData);
            setEditMode(false);
        } catch (err) {
            console.error(err);
            setError("Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingState message="Loading profile..." />;
    if (error) return <ErrorState message={error} />;
    if (!user) return <ErrorState message="Please log in to view your profile." />;

    return (
        <div className="p-6 md:p-10 w-full h-full overflow-y-auto mt-13">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
            >
                {/* Card */}
                <div className="rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                Profile
                            </h1>
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white rounded-lg text-sm font-semibold shadow-md transition"
                            >
                                {editMode ? <FiX /> : <FiEdit />}
                                {editMode ? "Cancel" : "Edit"}
                            </button>
                        </div>

                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <img
                                src={profile.imageUrl || '/default-avatar.png'}
                                alt={profile.fullName || 'Profile'}
                                className="w-32 h-32 rounded-2xl object-cover border border-neutral-300 dark:border-neutral-700"
                                onError={(e) => { e.target.src = '/default-avatar.png'; }}
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                {editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            value={formData.fullName || ""}
                                            onChange={(e) => handleChange("fullName", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                                            placeholder="Full Name"
                                        />
                                        <input
                                            type="email"
                                            value={formData.email || ""}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                                            placeholder="Email"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{profile.fullName || 'No name provided'}</h2>
                                        <p className="text-neutral-500 dark:text-neutral-400">{profile.email || 'No email provided'}</p>
                                    </>
                                )}
                                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                                    Gender: {editMode ? (
                                        <input
                                            type="text"
                                            value={formData.gender || ""}
                                            onChange={(e) => handleChange("gender", e.target.value)}
                                            className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                                        />
                                    ) : profile.gender || "Not specified"} | Age: {editMode ? (
                                        <input
                                            type="number"
                                            value={formData.age || ""}
                                            onChange={(e) => handleChange("age", e.target.value)}
                                            className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none w-20"
                                        />
                                    ) : profile.age || "Not specified"}
                                </p>
                            </div>
                        </div>

                        {/* Save Button */}
                        {editMode && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={saveProfile}
                                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-md transition"
                                >
                                    <FiSave className="inline mr-2" />
                                    Save
                                </button>
                            </div>
                        )}

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mt-10">
                            <InfoCard title="Body Info" editMode={editMode} formData={formData} handleChange={handleChange}>
                                <p>Height: {editMode ? <input type="number" value={formData.height || ""} onChange={e => handleChange("height", e.target.value)} className="px-2 py-1 border rounded w-24"/> : profile.height ? `${profile.height} cm` : "Not specified"}</p>
                                <p>Weight: {editMode ? <input type="number" value={formData.weight || ""} onChange={e => handleChange("weight", e.target.value)} className="px-2 py-1 border rounded w-24"/> : profile.weight ? `${profile.weight} kg` : "Not specified"}</p>
                                <p>Body Type: {editMode ? <input type="text" value={formData.bodyType || ""} onChange={e => handleChange("bodyType", e.target.value)} className="px-2 py-1 border rounded"/> : profile.bodyType || "Not specified"}</p>
                            </InfoCard>

                            <InfoCard title="Style Preferences" editMode={editMode} formData={formData} handleChange={handleChange}>
                                {editMode ? (
                                    <input type="text" value={formData.stylePreferences?.join(", ") || ""} onChange={e => handleChange("stylePreferences", e.target.value.split(",").map(s => s.trim()))} className="w-full px-2 py-1 border rounded"/>
                                ) : profile.stylePreferences?.length > 0 ? (
                                    <ul className="list-disc pl-4">{profile.stylePreferences.map((s,i)=><li key={i}>{s}</li>)}</ul>
                                ) : <p>No style preferences specified</p>}
                            </InfoCard>

                            <InfoCard title="Preferred Colors" editMode={editMode} formData={formData} handleChange={handleChange}>
                                {editMode ? (
                                    <input type="text" value={formData.preferredColors?.join(", ") || ""} onChange={e => handleChange("preferredColors", e.target.value.split(",").map(s => s.trim()))} className="w-full px-2 py-1 border rounded"/>
                                ) : profile.preferredColors?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">{profile.preferredColors.map((c,i)=><span key={i} className="px-3 py-1 rounded-full text-sm bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">{c}</span>)}</div>
                                ) : <p>No preferred colors specified</p>}
                            </InfoCard>

                            <InfoCard title="Preferred Fabrics" editMode={editMode} formData={formData} handleChange={handleChange}>
                                {editMode ? (
                                    <input type="text" value={formData.preferredFabrics?.join(", ") || ""} onChange={e => handleChange("preferredFabrics", e.target.value.split(",").map(s => s.trim()))} className="w-full px-2 py-1 border rounded"/>
                                ) : profile.preferredFabrics?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">{profile.preferredFabrics.map((f,i)=><span key={i} className="px-3 py-1 rounded-full text-sm bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">{f}</span>)}</div>
                                ) : <p>No preferred fabrics specified</p>}
                            </InfoCard>

                            <InfoCard title="Interested In" editMode={editMode} formData={formData} handleChange={handleChange}>
                                {editMode ? (
                                    <input type="text" value={formData.interestedIn?.join(", ") || ""} onChange={e => handleChange("interestedIn", e.target.value.split(",").map(s => s.trim()))} className="w-full px-2 py-1 border rounded"/>
                                ) : profile.interestedIn?.length > 0 ? (
                                    <ul className="list-disc pl-4">{profile.interestedIn.map((i,j)=><li key={j}>{i}</li>)}</ul>
                                ) : <p>No interests specified</p>}
                            </InfoCard>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function InfoCard({ title, children }) {
    return (
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
            <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-2">{title}</h2>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{children}</div>
        </div>
    );
}

function LoadingState({ message }) {
    return (
        <div className="p-6 md:p-10 w-full h-full flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-neutral-100 mx-auto mb-4"></div>
                <p className="text-neutral-600 dark:text-neutral-400">{message}</p>
            </div>
        </div>
    );
}

function ErrorState({ message }) {
    return (
        <div className="p-6 md:p-10 w-full h-full flex items-center justify-center">
            <div className="text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">{message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
