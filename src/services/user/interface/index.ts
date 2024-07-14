export interface IUsersResponse {
  results: IUser[];
}

export interface IUser {
  name: Name;
  id: ID;
  picture: Picture;
}

export interface ID {
  name: string;
  value: null | string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
