const currentUser: UserData = {
  username: '',
  email: '',
  cellr_id: 0,
};

const currentCellr: CellrData = {
  id: null,
  name: '',
};

const adminState: AdminStoreContents = {
  currentUser: currentUser,
  currentCellr: currentCellr,
  isUserLoggedIn: true,
};

export function AccessAdminStore(): AdminStoreContents {
  return adminState;
}
