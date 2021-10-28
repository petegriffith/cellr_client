import { UserData, AdminStoreContents, CellrData } from '../../typescript/adminTypes';

const currentUser: UserData = {
  username: 'Pete',
  password: '123',
};

const currentCellr: CellrData = {
  id: 1,
  name: 'Dev Cellr 1',
};

const adminState: AdminStoreContents = {
  currentUser: currentUser,
  currentCellr: currentCellr,
  isUserLoggedIn: true,
};

export function AccessAdminStore(): AdminStoreContents {
  return adminState;
}
