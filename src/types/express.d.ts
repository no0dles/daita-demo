declare namespace Express {
  export interface JwtUser {
    admin: boolean;
    id: string;
    username: string;
  }

  export interface Request {
    user: JwtUser;
  }
}
