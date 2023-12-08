import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-[#090909] p-4 shadow-lg">
      <h1 className="text-2xl font-bold text-white">University Search 🏫</h1>

      <div className="mr-36 space-x-4">
        <Link to="/all-universities" className="text-white hover:text-blue-500">
          All Universities
        </Link>
        <a
          href="https://github.com/MahendraBishnoi29/Blitz-Assignment"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-blue-500"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Navbar;
