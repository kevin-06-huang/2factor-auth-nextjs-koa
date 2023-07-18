export type TwoFactorModalProps = {
  email: string;
  otpAuthUrl: string;
  closeModal: () => void;
}

export type KoaRequestBody = {
  email: string;
  password?: string;
  token?: string | undefined;
}

export interface IUser {
  id: string;
  email: string;
  otp_enabled: boolean;
}
