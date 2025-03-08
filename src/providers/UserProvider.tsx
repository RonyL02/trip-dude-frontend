import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../api/types";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../api/userApi";
import { toast } from "react-toastify";

type UserContextState = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextState | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];

    if (
      !refreshToken &&
      !accessToken &&
      !publicRoutes.includes(location.pathname)
    ) {
      navigate("/login");
    }

    if (accessToken) {
      getProfile()
        .then((result) => setUser(result))
        .catch(() => {
          toast.error("something went wrong");
          navigate("/login");
        });
    }
  }, [refreshToken, accessToken, navigate, location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("user hook was used outside of user provider scope");
  }

  return context;
};
