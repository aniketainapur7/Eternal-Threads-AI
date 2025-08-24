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
import ProductPage from './pages/payment-test/ProductPage';
import SearchPage from "./pages/SearchPage";
import MeeshoProducts from "./pages/MeeshoProducts";
import Home from "./pages/home/Homepage";
import FashionPreferencesForm from "./pages/preference-form/FashionPreferencesForm";

function App() {
  return (
    <>
      <Routes>
        {/* Clerk redirect handling */}
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />

        {/* <Route
          path="/post-auth"
          element={
            <ProtectedRoute>
              <PostAuthRedirect />
            </ProtectedRoute>
          }
        /> */}
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
            path="/dashboard"
            element={
              <ProtectedRoute>
                {/* <DashboardRouter /> */}
                {/* <SearchPage/> */}
                <MeeshoProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {/* <DashboardRouter /> */}
                {/* <SearchPage/> */}
                <MeeshoProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {/* <DashboardRouter /> */}
                {/* <SearchPage/> */}
                <MeeshoProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <ProductPage />
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

function DashboardRouter() {
  const { user } = useUser();

  if (!user) return null;

  // Assuming you store roles in user.publicMetadata.role
  const role = "role1";

  if (role === "role1") {
    return <Role1Dashboard user={user} />;
  } else if (role === "role2") {
    return <Role2Dashboard user={user} />;
  } else {
    return (
      <div className="m-10 text-xl font-bold text-red-500">
        🚫 Unauthorized Access
      </div>
    );
  }
}

function Role1Dashboard({ user }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-50 m-10">
        Welcome Role 1, {user.firstName}
      </h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}

function Role2Dashboard({ user }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-500 m-10">
        Welcome Role 2, {user.firstName}
      </h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}