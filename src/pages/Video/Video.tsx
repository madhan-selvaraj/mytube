import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Tooltip,
} from "@mui/joy";
import dashjs from "dashjs";
import { useEffect, useRef } from "react";
import { IoMdEye } from "react-icons/io";
import { MdThumbUp } from "react-icons/md";
import { Navigate, useParams } from "react-router-dom";
import { useGetVideo } from "../../api/video";
import VideoCard from "../../components/VideoCard";

const { format } = Intl.NumberFormat("en", { notation: "compact" });
const { format: split } = Intl.NumberFormat();
const API_ENDPOINT = "https://invidious.fdn.fr/";

const Video = () => {
  const { videoId } = useParams();

  const { data: video, isLoading } = useGetVideo(videoId ?? "");
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = false;
    const player = dashjs.MediaPlayer().create();
    player.extend(
      "RequestModifier",
      function () {
        return {
          modifyRequestURL: function (url: string) {
            if (
              /^https:\/\/www\.youtube\.com\/youtubei\/.*|^https:\/\/.*\.googlevideo\.com\/videoplayback\?.*/.test(
                url
              )
            )
              return url.replace(
                /https:\/\/www\.youtube\.com\/youtubei\/|https:\/\/.*\.googlevideo\.com./gi,
                API_ENDPOINT
              );

            return url;
          },
        };
      },
      true
    );
    if (video?.dashUrl) {
      player.initialize(videoRef.current!, video.dashUrl, false);
      isMounted = true;
    }

    return () => {
      if (isMounted) player.reset();
    };
  }, [video?.dashUrl]);

  if (!videoId) return <Navigate to="/" />;
  if (isLoading) return <CircularProgress />;
  if (!video) return <>Error</>;

  return (
    <Container>
      <Stack direction={{ xs: "column" }}>
        <Box flex={1}>
          <video ref={videoRef} controls width={"100%"} muted />
          <h3>{video.title}</h3>
          <p>{video.description}</p>

          <div>
            <Tooltip title={split(video.likeCount)}>
              <Chip variant="solid" startDecorator={<MdThumbUp />}>
                &nbsp;{format(video.likeCount)}
              </Chip>
            </Tooltip>
            &nbsp;
            <Tooltip title={split(video.viewCount)}>
              <Chip variant="solid" startDecorator={<IoMdEye />}>
                &nbsp;{format(video.viewCount)}
              </Chip>
            </Tooltip>
          </div>

          {video.keywords.map((keyword) => (
            <Chip key={keyword} variant="outlined">
              {keyword}
            </Chip>
          ))}
        </Box>
        <Box gap={2}>
          {video.recommendedVideos.map((recommendedVideo) => (
            <VideoCard
              key={recommendedVideo.videoId}
              data={recommendedVideo}
              compact
            />
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default Video;
