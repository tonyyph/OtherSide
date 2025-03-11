import { getArticles } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type Category = {};

type Article = {
  isBookmarked: boolean;
  isUnRead: boolean;
  createdAt: string;
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

export const useArticle = () => {
  const [data, setData] = useState<Article[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data: session } = await getArticles({
          limit: "100",
          skip: "0"
        });

        setData(session?.articles);
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return {
    articles: data,
    loading: loading
  };
};
