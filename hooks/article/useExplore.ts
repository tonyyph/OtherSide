import {
  getArticles,
  getCategories,
  saveCategories,
  unSaveCategories
} from "@/api";
import { useUserArticleStore } from "@/stores/user-article/store";
import { useUserExploreStore } from "@/stores/user-explore/store";
import { AxiosError } from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useMemoFunc } from "../commons";

export const useExplore = () => {
  const [data, setData] = useState<CategoryS[]>();
  const [loading, setLoading] = useState(true);
  const [loadingArt, setLoadingArt] = useState(true);
  const [articles, setArticles] = useState<Article[]>();
  const { setIsUpdateCategory, isUpdateCategory } = useUserExploreStore();
  const { setIsArticled } = useUserArticleStore();

  const fetchArticles = useCallback(async (currentFilter: string = "live") => {
    try {
      const { data: session } = await getArticles({
        limit: "5",
        skip: "0",
        random: true,
        filter: currentFilter
      });

      const data = session?.articles || [];

      setArticles(data);
    } catch (error) {
      console.log(
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setLoadingArt(false);
    }
  }, []);

  useLayoutEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const fetchCategories = useCallback(async () => {
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
  }, [setIsUpdateCategory]);

  useLayoutEffect(() => {
    setIsUpdateCategory(true);
  }, [setIsUpdateCategory]);

  useEffect(() => {
    !!isUpdateCategory && fetchCategories();
  }, [isUpdateCategory, fetchCategories]);

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

  return {
    categories: data,
    onSaveCategory,
    onUnSaveCategory,
    loading: loading,
    loadingArt: loadingArt,
    articles
  };
};
