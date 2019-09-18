export interface UserData {
  id: number;
  username: string;
  token: string;
}

export interface UserRO {
  user: UserData;
}
