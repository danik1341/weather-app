export type TUserData = {
  user: {
    id: string;
    email: string;
  } | null;
  message: string;
  noError: boolean;
};
