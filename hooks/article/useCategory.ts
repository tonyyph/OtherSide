import { getCategories, saveCategories, unSaveCategories } from "@/api";
import { useUserArticleStore } from "@/stores/user-article/store";
import { useUserExploreStore } from "@/stores/user-explore/store";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMemoFunc } from "../commons";

export const useCategory = () => {
  const [data, setData] = useState<CategoryS[]>();
  const [loading, setLoading] = useState(true);
  const { setIsUpdateCategory } = useUserExploreStore();
  const { setIsArticled } = useUserArticleStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSaveCategory = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await saveCategories(id);
      if (!!session) {
        fetchCategories();
        setIsUpdateCategory(true);
      }
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setIsArticled(true);
      setLoading(false);
    }
  });

  const onUnSaveCategory = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await unSaveCategories(id);
      if (!!session) {
        fetchCategories();
        setIsUpdateCategory(true);
      }
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setIsArticled(true);
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
    }
  };

  return {
    categories: data,
    onSaveCategory,
    onUnSaveCategory,
    loading: loading
  };
};
