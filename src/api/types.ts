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
    likedPosts: string[]
}

export type Comment = {
    _id: string;
    username: string;
    content: string;
    imageUrl?: string;
}


export type Activity = {
    id?: string;
    name?: string;
    shortDescription?: string;
    description?: string;
    geoCode?: {
        latitude?: number;
        longitude?: number;
    };
    rating?: string;
    price?: {
        amount?: string;
        currencyCode?: string;
    };
    pictures?: string[];
    bookingLink?: string;
    minimumDuration?: string;
};

export type SavedActivityDto = Omit<Activity, 'pictures'> & { picture?: string }
export type Post = {
    _id: string;
    imageUrl: string;
    description: string;
    likes: number;
    commentsCount: number;
    activityId: string;
};
