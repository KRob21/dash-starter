export interface Member {
  id?: string;
  f_name?: string;
  l_name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  profile_complete?: boolean;
  profile_img?: string;
  created?: Date;
  last_login?: Date;
  logins?: number;
  role: Roles;
  agreed_to_terms?: boolean;
}

export interface Roles {
  subscriber?: boolean;
  member?: boolean;
  client?: boolean;
  admin?: boolean;
}
