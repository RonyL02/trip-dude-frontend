export type CreateUserDto = {
    email: string,
    password: string,
    imageUrl?: string,
    username: string
}

export type User = {
    username: string;
    accessToken: string;
    refreshToken: string;
}