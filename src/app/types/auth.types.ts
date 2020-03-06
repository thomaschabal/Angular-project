export interface GetUserByJWTResponse {
    firstname: string;
    lastname: string;
    email: string;
    admin: boolean;
    promotion: string;
}

export interface LoginResponse {
    token: string;
}
