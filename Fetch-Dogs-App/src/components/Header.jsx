import Logo from "../assets/Logo.jpg";

export default function Header() {
  return (
    <div className="w-screen h-[93px] flex items-center">
      <img src={Logo} className="h-full w-auto select-none" />
      <div className="text-[16px] select-none font-regular font-medium text-primary">
        Pet Shop Inc.
      </div>

      <div className="absolute left-1/2 transform select-none -translate-x-1/2 flex space-x-8 text-lg font-regular text-[16px] font-medium text-primary">
        <div className="cursor-pointer relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
          Home
        </div>
        <div className="cursor-pointer duration-300 transition-all hover:opacity-100 opacity-50 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
          Match Me
        </div>
        <div className="cursor-pointer duration-300 transition-all hover:opacity-100 opacity-50 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
          Favorites
        </div>
      </div>

      <div className="text-[16px] ml-auto bg-primary pt-[6px] select-none pb-[6px] pl-7 pr-7 text-white font-medium mr-5 rounded-[3px]">
        {" "}
        Login
      </div>
    </div>
  );
}
