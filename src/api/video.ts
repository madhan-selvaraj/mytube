import { useQuery } from "@tanstack/react-query";

export interface DetailedVideo {
  type: string;
  title: string;
  videoId: string;
  videoThumbnails: VideoThumbnail[];
  storyboards: Storyboard[];
  description: string;
  descriptionHtml: string;
  published: number;
  publishedText: string;
  keywords: string[];
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  paid: boolean;
  premium: boolean;
  isFamilyFriendly: boolean;
  allowedRegions: string[];
  genre: string;
  genreUrl: string;
  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;
  authorThumbnails: AuthorThumbnail[];
  subCountText: string;
  lengthSeconds: number;
  allowRatings: boolean;
  rating: number;
  isListed: boolean;
  liveNow: boolean;
  isUpcoming: boolean;
  dashUrl: string;
  adaptiveFormats: AdaptiveFormat[];
  formatStreams: FormatStream[];
  captions: Caption[];
  recommendedVideos: RecommendedVideo[];
}

export interface VideoThumbnail {
  quality: string;
  url: string;
  width: number;
  height: number;
}

export interface Storyboard {
  url: string;
  templateUrl: string;
  width: number;
  height: number;
  count: number;
  interval: number;
  storyboardWidth: number;
  storyboardHeight: number;
  storyboardCount: number;
}

export interface AuthorThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface AdaptiveFormat {
  init: string;
  index: string;
  bitrate: string;
  url: string;
  itag: string;
  type: string;
  clen: string;
  lmt: string;
  projectionType: string;
  fps?: number;
  container?: string;
  encoding?: string;
  audioQuality?: string;
  audioSampleRate?: number;
  audioChannels?: number;
  resolution?: string;
  qualityLabel?: string;
  colorInfo?: ColorInfo;
}

export interface ColorInfo {
  primaries: string;
  transferCharacteristics: string;
  matrixCoefficients: string;
}

export interface FormatStream {
  url: string;
  itag: string;
  type: string;
  quality: string;
  fps: number;
  container: string;
  encoding: string;
  resolution: string;
  qualityLabel: string;
  size: string;
}

export interface Caption {
  label: string;
  language_code: string;
  url: string;
}

export type RecommendedVideo = {
  videoId: string;
  title: string;
  videoThumbnails: VideoThumbnail[];
  author: string;
  authorUrl: string;
  authorId: string;
  lengthSeconds: number;
  viewCountText: string;
  viewCount: number;
  publishedText?: string;
};

/**
 * Get full metadata of the given video ID
 * @param id Video ID
 * @returns {DetailedVideo} Video Meta data
 */
export const useGetVideo = (id: string) =>
  useQuery<DetailedVideo>({
    queryKey: ["/api/v1/videos", id],
  });
