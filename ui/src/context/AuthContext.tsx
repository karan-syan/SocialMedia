import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
export interface Iuser {
  id: number;
  username: string;
  name: string;
  email: string;
  profilePic: string;
  coverPic: string;
  city: string;
  website: string;
}
interface InputType {
  username: string;
  password: string;
}
interface UserContext {
  login: (inputs: InputType) => void;
  logOut: () => void;
  currentUser: Iuser | null;
}
export const AuthContext = createContext<UserContext>({
  login: (inputs: InputType) => {},
  logOut: () => {},
  currentUser: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState<Iuser | null>(
    user ? JSON.parse(user) : null
  );
  const login = async (inputs: InputType) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };
  const logOut = async () => {
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
