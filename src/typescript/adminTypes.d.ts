export interface UserData {
  id?: number
  username: string;
  email: string;
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
