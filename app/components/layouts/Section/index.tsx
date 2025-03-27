interface SectionLayoutsProps {
  children: React.ReactNode;
}

const SectionLayouts: React.FC<SectionLayoutsProps> = ({ children }) => {
  return (
    <section className="flex-1 p-4">
      <div className="bg-white border boder-gray-200 rounded-lg w-full relative">
        <div className="w-fit min-w-full sm:flex sm:justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionLayouts;
