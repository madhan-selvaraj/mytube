import { useQuery } from "@tanstack/react-query";

export type Video = {
  title: string;
  videoId: string;
  videoThumbnails: VideoThumbnail[];
  lengthSeconds: number;
  viewCount: number;
  author: string;
  authorId: string;
  authorUrl: string;
  published: number;
  publishedText: string;
  description: string;
  descriptionHtml: string;
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
};

export interface VideoThumbnail {
  quality: string;
  url: string;
  width: number;
  height: number;
}

export const useGetTrending = () =>
  useQuery<Video[]>({
    queryKey: ["/api/v1/trending"],
  });
