import { saveCategories, unSaveCategories } from "@/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc } from "../commons";

export const useActionCategory = () => {
  const [loading, setLoading] = useState(true);
  const onSaveCategory = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      await saveCategories(id);
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
      await unSaveCategories(id);
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  });

  return {
    onSaveCategory,
    onUnSaveCategory,
    loading: loading
  };
};
