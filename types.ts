export type Event = {
  target: {
    otp?: {
      value: string
    };
    email?: {
      value: string
    };
    password?: {
      value: string
    }
  };
  preventDefault: () => void;
}

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
