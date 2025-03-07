import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/ReactToastify.css";
import { Login } from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Register } from "./pages/Register";
import { UserProvider } from "./providers/UserProvider";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="468248101450-5rep1ej1iu585lscqfuld375kko3qevu.apps.googleusercontent.com">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </GoogleOAuthProvider>
  );
};

export default App;
