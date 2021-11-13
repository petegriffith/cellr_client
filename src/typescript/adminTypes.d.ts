interface UserData {
  id?: number
  username: string;
  email: string;
  cellr_id: number;
}

interface CellrData {
  id: number | null;
  name: string | null;
}

interface AdminStoreContents {
  currentUser: UserData;
  currentCellr: CellrData;
  isUserLoggedIn: boolean;
}
