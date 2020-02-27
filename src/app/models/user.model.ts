export interface UserModel {
  uid?: string;
  displayName: string;
  photoURL?: string;
  email: string;
  refreshToken?: string;
  password?: string;
  providerId?: string;
  lastSignInTime?: number;
}
