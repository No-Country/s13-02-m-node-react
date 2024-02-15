export interface IUser {
  username: string;
  email: string;
  password: string;
  tokenPass: string;
  role: string;
  life: number;
  totalPoints: number;
  challengeNotification: number;
  notification: boolean;
}
