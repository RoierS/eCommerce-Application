interface IAction {
  action: string;
  [Key: string]: string;
}

export interface IUserUpdate {
  version: number;
  actions: IAction[];
}

export interface IPasswordUpdate {
  version: number;
  currentPassword: string;
  newPassword: string;
}