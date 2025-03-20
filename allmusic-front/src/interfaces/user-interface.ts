
export interface UserResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    artistName?: string;
    profilePicture: string;
    bio: string;
}

export interface UserRequestDto {
    firstName: string;
    lastName: string;
    email: string;
    artistName?: string;
    username: string;
    password: string;
    profilePicture: FileList;
    bio: string;
}

export interface UserUpdateDto {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    profilePicture?: string | null;
    bio?: string | null;
}
