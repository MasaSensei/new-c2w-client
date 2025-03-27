interface HeaderWithActionProps {
  button?: React.ReactNode;
  title: string;
}

const HeaderWithAction: React.FC<HeaderWithActionProps> = ({
  button,
  ...props
}) => {
  return (
    <div className="bg-white border-b p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-black">{props.title}</h1>
      <div className="flex items-center gap-2">{button}</div>
    </div>
  );
};

export default HeaderWithAction;
