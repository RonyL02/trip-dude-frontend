import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/ReactToastify.css";
import { Login } from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Register } from "./pages/Register";
import { UserProvider } from "./providers/UserProvider";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { Comments } from "./pages/Comments";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/Navbar";
import { ActivitySearch } from "./pages/ActivitySearch";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="468248101450-5rep1ej1iu585lscqfuld375kko3qevu.apps.googleusercontent.com">
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/comments/:postId" element={<Comments />} />
            <Route path="/activities" element={<ActivitySearch />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </GoogleOAuthProvider>
  );
};

export default App;
