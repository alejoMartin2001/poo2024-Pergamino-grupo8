
export interface UserResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePicture: string;
    bio: string;
}

export interface UserRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    profilePicture: string;
    bio: string;
}