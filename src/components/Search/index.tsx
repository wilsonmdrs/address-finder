import { useState, useEffect } from "react";
import { useDataContext } from "../../hooks/useData";

export const Search = () => {
  const { getValues, setValue } = useDataContext();
  const [term, setTerm] = useState(getValues("searchTerm"));

  useEffect(() => {
    term &&
      setTimeout(() => {
        setValue("searchTerm", term);
      }, 3000);
  }, [term]);

  return (
    <div className="flex w-full h-fit justify-center items-center py-3">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Type the postcode to see the results"
        className="pl-5 border-[1px] w-[70%] border-gray-border shadow-md rounded-l-[20px] h-[40px] focus:outline-none"
      />
      <button
        onClick={() => setValue("searchTerm", term)}
        className="rounded-r-[20px] bg-green border-green border-[1px] h-[40px] shadow-md  w-fit px-3 text-white"
      >
        SEARCH
      </button>
    </div>
  );
};
