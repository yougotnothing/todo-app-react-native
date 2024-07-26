import { UUID } from "@interfaces/uuid";

export interface UserDto {
  name: string;
  email: string;
  avatar: string;
  isHaveAvatar: boolean;
  id: UUID | null;
  sessionID: string | null;
  isVerified: boolean;
}