import { UserResponseDto } from "./user-interface";

interface Authority {
  authority: string;
}

export interface TokenDecode {
  authorities: Authority[];
  isArtist: boolean;
  sub: string;
  iat: number;
  exp: number;
}

export interface tokenAuth {
  message: string;
  token: string;
}

export interface AuthState {
  isAuth: boolean;
  isArtist: boolean;
  user: UserResponseDto | null;
};

export interface Login {
  username: string;
  password: string;
}

export type AuthAction = { type: "login", payload: {user: UserResponseDto | null, isArtist: boolean}} | { type: "logout"}