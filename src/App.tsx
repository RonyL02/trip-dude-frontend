import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Register } from "./pages/Register";
const App = () => {
  return (
    <GoogleOAuthProvider clientId="468248101450-5rep1ej1iu585lscqfuld375kko3qevu.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
