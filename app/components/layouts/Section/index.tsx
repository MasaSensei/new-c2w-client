interface SectionLayoutsProps {
  children: React.ReactNode;
  widthFull?: boolean;
}

const SectionLayouts: React.FC<SectionLayoutsProps> = ({
  children,
  ...props
}) => {
  return (
    <section className="flex-1 p-4">
      <div className="bg-white border boder-gray-200 rounded-lg w-full relative">
        <div
          className={`${
            props.widthFull ? "w-full" : "w-fit"
          } max-w-full sm:flex sm:justify-center`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionLayouts;
