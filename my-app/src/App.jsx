import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore.js';

// --- Component Imports ---
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';
import VerifyOtp from './pages/Auth/VerifyOtp.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import UserManagement from './pages/Admin/UserManagement.jsx';
import PropertyManagement from './pages/Admin/PropertyManagement.jsx';
import AdminRoute from './components/AdminRoute.jsx';
// 1. Import the new EnquiryManagement component
import EnquiryManagement from './pages/Admin/EnquiryManagement.jsx';

// --- Style Imports ---
import './styles/styles.css';
import './index.css';

export default function App() {
  
  // This useEffect hook runs only once when the app starts.
  // It initializes the auth store to load user data from localStorage.
  useEffect(() => {
    useAuthStore.getState().init();
  }, []);

  return (
    <div className="bg-midnight text-white min-h-screen">
      <Routes>
        {/* Public routes that use the main header/footer layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
        </Route>

        {/* Admin routes that are protected and use a separate admin layout */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="properties" element={<PropertyManagement />} />
            {/* 2. Add the new route for the enquiries page */}
            <Route path="enquiries" element={<EnquiryManagement />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}