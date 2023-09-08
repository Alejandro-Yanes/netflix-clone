import React from "react";

type MobileMenuProps = {
  visible?: boolean;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div>
        <ul className="flex flex-col gap-4">
          <li className="px-3 text-center text-white hover:underline">Home</li>
          <li className="px-3 text-center text-white hover:underline">
            Series
          </li>
          <li className="px-3 text-center text-white hover:underline">Films</li>
          <li className="px-3 text-center text-white hover:underline">
            New & Popular
          </li>
          <li className="px-3 text-center text-white hover:underline">
            My List
          </li>
          <li className="px-3 text-center text-white hover:underline">
            Browse by Languages
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
