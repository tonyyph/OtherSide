import {
  createBookmarks,
  createComments,
  createDisLikes,
  createLikes,
  deleteBookmarks,
  deleteDisLikes,
  deleteLikes,
  getEngagementArt
} from "@/api";
import { useUserArticleStore } from "@/stores/user-article/store";
import { useUserBookmarkStore } from "@/stores/user-bookmark/store";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc } from "../commons";

export const useEngagement = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArticleEngagementResponse>();
  const { setIsBookmarked } = useUserBookmarkStore();
  const { setIsArticled } = useUserArticleStore();
  const getEngagementArticles = useMemoFunc(async (id: string) => {
    try {
      const { data: session } = await getEngagementArt(id);

      setData(session);
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setIsArticled(false);
      setLoading(false);
    }
  });

  const onReactionLike = useMemoFunc(async (id: string) => {
    try {
      const { data: session } = await createLikes(id);
      if (!!session) {
        getEngagementArticles(id);
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

  const onReactionDisLike = useMemoFunc(async (id: string) => {
    try {
      const { data: session } = await createDisLikes(id);
      if (!!session) {
        getEngagementArticles(id);
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

  const onComment = useMemoFunc(async (id: string, content: string) => {
    try {
      const { data: session } = await createComments({
        artId: id,
        text: content
      });
      if (!!session) {
        getEngagementArticles(id);
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

  const onBookmark = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await createBookmarks(id);
      if (!!session) {
        getEngagementArticles(id);
        setIsBookmarked(true);
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

  const onDeleteLike = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await deleteLikes(id);
      if (!!session) {
        getEngagementArticles(id);
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

  const onDeleteDisLike = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await deleteDisLikes(id);

      if (!!session) {
        getEngagementArticles(id);
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

  const onDeleteBookmark = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await deleteBookmarks(id);
      if (!!session) {
        getEngagementArticles(id);
        setIsBookmarked(true);
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

  const onDeleteBookmarkDetail = useMemoFunc(async (id: string) => {
    setLoading(true);
    try {
      const { data: session } = await deleteBookmarks(id);

      if (!!session) {
        getEngagementArticles(id);
        setIsArticled(true);
        setIsBookmarked(true);
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

  return {
    onReactionLike,
    onReactionDisLike,
    onComment,
    onBookmark,
    onDeleteBookmark,
    onDeleteLike,
    onDeleteDisLike,
    onDeleteBookmarkDetail,
    getEngagementArticles,
    loading,
    data
  };
};
