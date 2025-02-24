import { AuthAction, AuthState } from "src/interfaces/auth-interface";

export const authReducer = (state: AuthState, action: AuthAction): AuthState =>  {
  switch (action.type) {
    //dispatch pasa el type:login y el payload, entonces lo cargamos en AuthState.
    case "login":
      return {
        isAuth: true,
        isArtist: action.payload.isArtist,
        user: action.payload.user
      };
    //dispatch pasa el type:logout, entonces lo cargamos en AuthState.
    case "logout":
      return {
        isAuth: false,
        isArtist: false,
        user: null
      }
    //si no se ejecuta ninguna, retornamos el state, vacio
    default:
      return state;
  };
};
