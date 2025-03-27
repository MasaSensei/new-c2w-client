interface MainLayoutsProps {
  children: React.ReactNode;
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  return (
    <main className="h-full flex flex-col bg-neutral-200">{children}</main>
  );
};

export default MainLayouts;
