import React from 'react'
import { Routes, Route ,Navigate} from "react-router"
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStore';
import {useEffect} from 'react'
import PageLoader from './components/PageLoader';
import {Toaster} from "react-hot-toast";
function App() {
  

    const {checkAuth , isCheckingAuth , authUser} = useAuthStore();

    useEffect(() => {
     checkAuth();
    }, []);

    console.log({authUser});

    if(isCheckingAuth) return <PageLoader/>;

    return (

    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

      {/* Decorative glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300" />
      <div className="absolute bottom-[-150px] left-1/3 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />


  <Routes>
    <Route
      path="/"
      element={authUser ? <ChatPage /> : <Navigate to="/login" replace />}
    />

    <Route
      path="/login"
      element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
    />

    <Route
      path="/signup"
      element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
    />
</Routes>

<Toaster/>


    </div>
  );
}

export default App
