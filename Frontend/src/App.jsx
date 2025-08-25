import { Routes, Route, Navigate } from "react-router-dom";
import {
  AuthenticateWithRedirectCallback,
  SignedIn,
  SignedOut,
  useUser
} from "@clerk/clerk-react";

import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import LandingPage from './pages/LandingPage';
import Mainlayout from './layout/Mainlayout';
import FashionPreferencesForm from "./pages/preference-form/FashionPreferencesForm";
import Homepage from "./pages/home/Homepage";
import Brands from "./pages/brands/Brands";
import Friends from "./pages/friends/Friends";
import TrendingPage from "./pages/trending/Trending";
import Occasional from "./pages/occasional/Occasional";
import ProfilePage from "./pages/profile/ProfilePage";
import Wishlist from "./pages/wishlist/WishList";
import ThreadBot from "./pages/chatbot/ThreadBot";
import { Toaster } from "react-hot-toast";
import ConnectWithDesigners from "./pages/designers/ConnectWithDesigners";
import AiMashups from "./pages/wishlist/AiMashups";
import FacialRecommend from "./pages/facial-recommend/FacialRecommend";

function App() {
  return (
    <>
    <Toaster/>
      <Routes>
        {/* Clerk redirect handling */}
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        
        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <FashionPreferencesForm />
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route element={<Mainlayout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <TrendingPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friends/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Occasional"
            element={
              <ProtectedRoute>
                <Occasional/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoute>
                <Brands/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <ThreadBot/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/designers"
            element={
              <ProtectedRoute>
                <ConnectWithDesigners/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-mashups"
            element={
              <ProtectedRoute>
                <AiMashups/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/face-recommend"
            element={
              <ProtectedRoute>
                <FacialRecommend/>
              </ProtectedRoute>
            }
          />
        </Route>
        

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;


function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/" />
      </SignedOut>
    </>
  );
}

