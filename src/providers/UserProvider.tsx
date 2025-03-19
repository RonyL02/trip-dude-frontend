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
import { getSavedActivities } from "../api/activityApi";

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
  const refreshToken = Cookies.get("refresh_token");
  const { pathname } = useLocation();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getProfile();
      const activities = await getSavedActivities();

      setUser({
        ...user,
        populatedActivities: activities,
      });
    };

    if (!refreshToken) {
      navigate("/");
    } else if (pathname === "/" || pathname === "") {
      fetchUser()
        .then(() => navigate("/profile"))
        .catch(() => navigate("/"));
    }else{
      fetchUser()
        .catch(() => navigate("/"));
    }
  }, []);

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
