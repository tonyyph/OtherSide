import { getCategories, saveCategories, unSaveCategories } from "@/api";
import { useUserExploreStore } from "@/stores/user-explore/store";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMemoFunc } from "../commons";

export const useExplore = () => {
  const [data, setData] = useState<CategoryS[]>();
  const [loading, setLoading] = useState(true);
  const { setIsUpdateCategory, isUpdateCategory } = useUserExploreStore();

  useLayoutEffect(() => {
    setIsUpdateCategory(true);
  }, []);

  useEffect(() => {
    !!isUpdateCategory && fetchCategories();
  }, [isUpdateCategory]);

  const onSaveCategory = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await saveCategories(id);
      if (!!session) {
        fetchCategories();
      }
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  });

  const onUnSaveCategory = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await unSaveCategories(id);
      if (!!session) {
        fetchCategories();
      }
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  });

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
      setIsUpdateCategory(false);
    }
  };

  return {
    categories: data,
    onSaveCategory,
    onUnSaveCategory,
    loading: loading
  };
};
