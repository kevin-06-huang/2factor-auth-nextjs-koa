const TwoFactorModal = () => {
  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#222] bg-opacity-50"
    >
      <div className="relative top-36 p-4 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
        <div className="relative bg-white rounded-lg shadow">
          <h3 className="text-black">Two-Factor Authentication (2FA)</h3>
            <div>
              <h4 className="text-black">Scan QR Code</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TwoFactorModal
