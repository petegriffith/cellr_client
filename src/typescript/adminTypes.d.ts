export interface UserData {
  username: string;
  password: string;
}

export interface CellrData {
  id: number;
  name: string;
}

export interface AdminStoreContents {
  currentUser: UserData;
  currentCellr: CellrData;
  isUserLoggedIn: boolean;
}
