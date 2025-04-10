const ExtendedPopup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ExtendedPopup;
