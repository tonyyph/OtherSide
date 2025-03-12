import { getCategories } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useCategory = () => {
  const [data, setData] = useState<CategoryS[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: session } = await getCategories();

        setData(session);
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories: data,
    loading: loading
  };
};
