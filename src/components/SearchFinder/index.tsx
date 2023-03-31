import { RecentResults } from "../RecentResults";
import { Search } from "../Search";
import { SearchResult } from "../SearchResult";

export const SearchFinder = () => {
  return (
    <main className="flex flex-col w-full h-[85%] py-5">
      <Search />
      <div className="flex flex-row w-full h-[90%]">
        <RecentResults />
        <SearchResult />
      </div>
    </main>
  );
};
