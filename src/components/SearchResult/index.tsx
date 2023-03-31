import PacmanLoader from "react-spinners/PacmanLoader";
import { usePostCode } from "../../hooks/usePostCode";
import { AddressCard } from "../AddressCard";

export const SearchResult = () => {
  const { error, isLoading, postCode } = usePostCode();
  return (
    <section className="flex w-[75%] h-full flex-col p-4 overflow-y-scroll">
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
            <PacmanLoader color="#81D8F7" />
        </div>
      ) : (
        <>
          {error.message && (
        <div className="flex w-full h-full items-center justify-center">
            <p>{error.message}</p>
        </div>
          )}
          {postCode && <AddressCard {...postCode} />}
        </>
      )}
    </section>
  );
};
