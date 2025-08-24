import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

export default function PostAuthRedirect() {
    
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const checkPreferences = async () => {
      try {
        const res = await axiosInstance.get(`/users/${user.id}/preferences`);
        if (res.data.exists) {
          navigate("/home"); // Already submitted → dashboard/home
        } else {
          navigate("/preferences"); // Not submitted → form
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkPreferences();
  }, [user, isLoaded, navigate]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>;
  return null;
}
