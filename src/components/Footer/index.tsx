export const Footer = () => {
  return (
    <footer className="flex w-full h-[5%]  justify-center items-center">
      <p className="text-sm  border-t-[1px] border-gray-border p-2 w-[95%] text-center">
        Developed by Wilson Medeiros - {new Date().getFullYear()}
      </p>
    </footer>
  );
};
