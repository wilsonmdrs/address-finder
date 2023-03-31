import { useDataContext } from "../../hooks/useData";
import { PostCode } from "../../hooks/usePostCode";
import { AddressCard } from "../AddressCard";

export const RecentResults = () => {
  const { getValues } = useDataContext();
  const recentPostCodes: PostCode[] = getValues("recentPostCodes");
  return (
    <section className="w-[25%] h-full border-r-[1px] border-gray-border p-2 gap-2">
      <p className="pb-2 pl-2">Recent Results:</p>
      {recentPostCodes.map((postcode) => (
        <AddressCard key={postcode.id} {...postcode} />
      ))}
    </section>
  );
};
