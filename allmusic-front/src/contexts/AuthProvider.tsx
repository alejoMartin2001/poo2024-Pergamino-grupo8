import { createContext, PropsWithChildren, useContext, useEffect, useReducer } from "react"
import { AuthState, TokenDecode } from "src/interfaces/auth-interface";
import { UserResponseDto } from "src/interfaces/user-interface";
import { authReducer } from "src/reducers/authReducer";

interface AuthContextType extends AuthState {
  login: (token: string, decodedToken: TokenDecode, user: UserResponseDto) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: PropsWithChildren) => {

  const [state, dispatch] = useReducer(authReducer, {
    isAuth: false,
    isArtist: false,
    user: null,
  });


  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const userData: UserResponseDto = JSON.parse(storedUser);
      const isArtist = JSON.parse(localStorage.getItem("isArtist") || "false");

      dispatch({ type: "login", payload: { user: userData, isArtist } });
    }
  }, []);


  const login = (token: string, decodedToken: TokenDecode, user: UserResponseDto) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isArtist", JSON.stringify(decodedToken.isArtist))

    dispatch({ type: "login", payload: { user, isArtist: decodedToken.isArtist } });
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isArtist");
    localStorage.clear();

    dispatch({ type: "logout" });

  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook de useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};