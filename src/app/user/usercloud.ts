export interface Usercloud {
  // uid: string;
  username: string;
  email: string;
  password: string;
  // displayName: string;
  // photoURL: string;
  roles: Roles;
}

export interface Roles {
  registered?: boolean;
  admin?: boolean;
}
