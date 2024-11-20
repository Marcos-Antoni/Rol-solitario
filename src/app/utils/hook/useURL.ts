"use client";
import { useSearchParams } from "next/navigation";

const useURL = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const getQueryURL = (name: string) => {
    return params.get(name) || "";
  };

  return {
    getQueryURL,
  };
};

export default useURL;
