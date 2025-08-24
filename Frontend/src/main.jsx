import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import AuthProvider from './providers/AuthProvider.jsx';


const qc = new QueryClient();
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        <AuthProvider>
            <BrowserRouter>
              <App />
            <Toaster/>
          </BrowserRouter>
        </AuthProvider>
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
