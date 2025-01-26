import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
function Searchbar() {
  const [searchedText, setSearchedText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchedText.trim()) {
      navigate(`/search?q=${searchedText}`);
    }
  };

  return (
    <div className="w-[60vw]  mx-auto flex justify-center items-center md:w-[50vw] lg:w-[40vw]">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
          placeholder="Search for an item "
          className="w-full h-10  pr-10 text-sm bg-[#D9D9D9] placeholder-[#000000] border rounded-l-[50px] focus:outline-none px-10 boreder-none "
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {searchedText && (
          <IoMdClose
            onClick={() => setSearchedText("")}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer "
            size={20}
          />
        )}
      </div>
      <button
        onClick={handleSearch}
        className="h-10 w-10 bg-[#D9D9D9] text-[#000000] flex justify-center items-center rounded-r-[50px] "
        // if the input is empty the disable the button
        disabled={!searchedText.trim()}
      >
      <FiSearch size={20} />
      </button>
    </div>
  );
}

export default Searchbar;
