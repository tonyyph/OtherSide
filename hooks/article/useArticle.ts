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

export const useArticle = ({ limit }: { limit: string }) => {
  const [data, setData] = useState<Article[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data: session } = await getArticles({
          limit: limit,
          skip: "0",
          random: true
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
