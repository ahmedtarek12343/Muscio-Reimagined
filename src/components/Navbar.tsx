import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <header
      className={`bg-transparent h-16 w-[50%] border-b-green-500 top-8 rounded-2xl backdrop-blur-xl mx-auto border-2 transition-all duration-300 shadow sticky top-0 z-5`}
    >
      <div className="max-w-4xl mx-auto px-5 flex items-center justify-between h-full">
        <div className="font-semibold text-2xl italic">Musico</div>
        <div className="w-[50%] mx-auto">
          <Input placeholder="Search for any song..." />
        </div>
        <div className="ml-5">
          {" "}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
