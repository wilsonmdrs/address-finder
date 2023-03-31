import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDataContext } from "../useData";

interface usePostCodeProps {
  searchTerm: string;
}

export interface PostCode {
  id: string;
  postcode: string;
  longitude: number;
  latitude: number;
  country: string;
  region: string;
  name: string;
}

interface PostCodeResult {
  postcode: string;
  longitude: number;
  latitude: number;
  country: string;
  region: string;
  parliamentary_constituency: string;
}

export const usePostCode = () => {
  const [postCode, setPostCode] = useState<PostCode>();
  const [isLoading, setIsLoading] = useState(false);
  const { getValues, setValue } = useDataContext();
  const searchTerm = getValues("searchTerm");
  const [error, setError] = useState({ message: "" });

  useEffect(() => {
    const setRecentPost = (address: PostCode) => {
      const recentPostCodes: PostCode[] = getValues("recentPostCodes");
      if (!recentPostCodes.some((post) => post.id === address.id)) {
        if (recentPostCodes.length === 3) {
          recentPostCodes.pop();
        }
        recentPostCodes.unshift(address);
        setValue("recentPostCodes", recentPostCodes);
      }
    };

    const fetchPostCodes = async () => {
      setError({ message: "" });
      setPostCode(undefined);
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://api.postcodes.io/postcodes/${searchTerm}`
        );
        if (response.status === 200 && "result" in response.data) {
          const { result } = response.data;
          const address = {
            id: result.postcode,
            postcode: result.postcode,
            longitude: result.longitude,
            latitude: result.latitude,
            name: result.parliamentary_constituency,
            country: result.country,
            region: result.region,
          } as PostCode;
          setRecentPost(address);
          setPostCode(address);
        }
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setError({
            message: "Postcode not found, please insert a valid postcode.",
          });
          setIsLoading(false);
        }
      }
    };
    searchTerm && fetchPostCodes();
  }, [searchTerm]);

  return { postCode, isLoading, error };
};
