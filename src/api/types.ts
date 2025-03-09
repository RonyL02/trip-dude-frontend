export type CreateUserDto = {
    email: string,
    password: string,
    imageUrl?: string,
    username: string
}

export type CreatePostDto = { description: string; imageUrl: string }

export type User = {
    username: string;
    imageUrl?: string;
    _id: string
}

export type Comment = {
    _id: string;
    username: string;
    content: string;
    imageUrl?: string;
}
