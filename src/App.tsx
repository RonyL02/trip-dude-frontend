import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/ReactToastify.css";
import "reactjs-popup/dist/index.css";

import { Login } from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Register } from "./pages/Register";
import { UserProvider } from "./providers/UserProvider";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { Comments } from "./pages/Comments";
import { ToastContainer } from "react-toastify";
import { PostsFeed } from "./pages/PostsFeed";
import { Navbar } from "./components/Navbar";
import { ActivitySearch } from "./pages/ActivitySearch";
import { ActivityPage } from "./pages/Activity";
import { Profile } from "./pages/Profile";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="468248101450-5rep1ej1iu585lscqfuld375kko3qevu.apps.googleusercontent.com">
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post/:activityId" element={<CreatePost />} />
            <Route path="/posts" element={<PostsFeed />} />
            <Route path="/comments/:postId" element={<Comments />} />
            <Route path="/activities" element={<ActivitySearch />} />
            <Route path="/activities/:activityId" element={<ActivityPage />} />
            <Route index path="/profile" element={<Profile />} />
            <Route path="/profile/my-posts" element={<PostsFeed />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </GoogleOAuthProvider>
  );
};

export default App;
