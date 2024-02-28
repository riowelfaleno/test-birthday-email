export interface CreateUserParam {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  timezone: string;
}

export interface DeleteUserParam {
  email: string;
}

export interface UpdateUserParam {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  timezone: string;
}
