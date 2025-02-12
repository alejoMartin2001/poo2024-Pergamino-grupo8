import { AuthAction, AuthState } from "src/interfaces/auth-interface";

export const authReducer = (state: AuthState, action: AuthAction): AuthState =>  {
  switch (action.type) {
    case "login":
      return {
        isAuth: true,
        isArtist: action.payload.isArtist,
        user: action.payload.user
      };

    case "logout":
      return {
        isAuth: false,
        isArtist: false,
        user: null
      }
  
    default:
      return state;
  };
};
