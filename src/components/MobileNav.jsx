import { AiFillHome } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";


const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 border-t border-slate-700 bg-black shadow-lg z-40">
      <div className="flex flex-col items-center justify-center text-white cursor-pointer">
        <AiFillHome className="h-5 w-5" />
      <div className="text-sm">Home</div>
      </div>
      <div className="flex flex-col items-center justify-center text-white cursor-pointer">
  
      <MdOutlineSubscriptions className="h-5 w-5"  />
      <div className="text-sm">Subscription</div>
      </div>
      <div className="flex flex-col items-center justify-center text-white cursor-pointer">
  
      <MdOutlineVideoLibrary className="h-5 w-5"  />
      <div className="text-sm">Library</div>
      </div>
      <div className="flex flex-col items-center justify-center text-white cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
      <div className="text-sm">Account</div>
      </div>
    </div>
  );
};

export default MobileNav;
