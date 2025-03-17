import { getArticles } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type Category = {};

type Article = {
  isBookmarked: boolean;
  isUnRead: boolean;
  createdAt: Date;
  leftPerspective: {
    id: number;
    title: string;
    content: string;
    category: Category[];
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
  };
  rightPerspective: {
    id: number;
    title: string;
    content: string;
    category: Category[];
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
  };
};

export const useArticle = ({
  limit,
  page,
  isRandom = false
}: {
  limit: string;
  page: number;
  isRandom?: boolean;
}) => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchArticles = async (pageNum: number, append = false) => {
    try {
      if (!append) setLoading(true);
      else setIsFetchingMore(true);

      const skip = (pageNum - 1) * parseInt(limit, 10);
      const { data: session } = await getArticles({
        limit,
        skip: skip.toString(),
        random: isRandom
      });

      setData((prevData) =>
        append ? [...prevData, ...session?.articles] : session?.articles
      );
    } catch (error) {
      console.log(
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      if (!append) setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const fetchMore = ({ pages }: { pages: number }) => {
    if (!isFetchingMore) {
      fetchArticles(pages + 1, true);
    }
  };

  return {
    articles: data,
    loading: loading,
    fetchMore,
    loadingMore: isFetchingMore
  };
};
