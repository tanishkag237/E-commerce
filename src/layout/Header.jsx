const Header = () => {
  return (
    <div className="flex h-20 mb-3 w-full items-center justify-center bg-custom-wine shadow-secondary shadow-lg">
      <img src="/logo.png" alt="logo" width="45px"/>
      <h1 className="text-custom-white flex gap-2 font-bold uppercase text-xl p-2 tracking-widest animate-in fade-in duration-300">
        FAKE STORE
      </h1>
    </div>
  );
};

export default Header;
