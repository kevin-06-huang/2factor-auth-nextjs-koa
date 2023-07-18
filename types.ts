export type TwoFactorModalProps = {
  email: string;
  otpAuthUrl: string;
  closeModal: () => void;
}

export interface IUser {
  id: string;
  email: string;
  otp_enabled: boolean;
}
