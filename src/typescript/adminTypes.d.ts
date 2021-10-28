export interface UserData {
  username: string;
  password: string;
  cellr_id: number;
}

export interface CellrData {
  id: number | null;
  name: string | null;
}

export interface AdminStoreContents {
  currentUser: UserData;
  currentCellr: CellrData;
  isUserLoggedIn: boolean;
}
