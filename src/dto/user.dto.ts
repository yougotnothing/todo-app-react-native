export interface UserDto {
  name: string;
  email: string;
  avatar: string;
  isHaveAvatar: boolean;
  id: number;
  sessionID: string | null;
  isVerified: boolean;
}