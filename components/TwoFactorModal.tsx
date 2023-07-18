import { FC, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import useStore from "@/store/auth";
import { TwoFactorModalProps } from "../types";

const TwoFactorModal: FC<TwoFactorModalProps> = ({
  email,
  otpAuthUrl,
  closeModal,
}) => {
  const store = useStore();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const otp = useRef<HTMLInputElement>(null);

  const verifyOTP = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const res = fetch("http://localhost:3000/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: otp.current!.value,
          email,
        }),
      });

      const resBody = await (await res).json();

      if (!resBody.status) store.setAuthUser(resBody);
      else alert(resBody.status);

      closeModal();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    QRCode.toDataURL(otpAuthUrl).then(setQrCodeUrl);
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#222] bg-opacity-50">
      <div className="relative top-36 p-4 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
        <div className="relative bg-white rounded-lg shadow">
          <div>
            <h4 className="text-black flex justify-center font-semibold relative top-2">
              Scan QR Code
            </h4>
            <div className="flex justify-center">
              <img
                className="block w-64 h-64 object-contain"
                src={qrCodeUrl}
                alt="qrcode url"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <form onSubmit={verifyOTP}>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5"
                placeholder="Authentication Code"
                ref={otp}
              />
              <div className="mb-2 mt-2">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Activate
                </button>
                <button
                  type="button"
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
