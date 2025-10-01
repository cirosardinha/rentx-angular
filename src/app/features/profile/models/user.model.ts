export interface User {
  id: string;
  name: string;
  email: string;
  driver_license?: string;
  avatar?: string;
  avatarUrl?: string | null;
}
