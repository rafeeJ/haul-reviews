export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}

export interface Profile {
    uid: string;
    photoURL?: string;
    displayName?: string;
    country?: string;
    height?: string;
    build?: string;
}
