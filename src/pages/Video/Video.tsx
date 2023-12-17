import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Tooltip,
} from "@mui/joy";
import { IoMdEye } from "react-icons/io";
import { MdThumbUp } from "react-icons/md";
import { Navigate, useParams } from "react-router-dom";
import { useGetVideo } from "../../api/video";
import VideoCard from "../../components/VideoCard";

const { format } = Intl.NumberFormat("en", { notation: "compact" });
const { format: split } = Intl.NumberFormat();

const Video = () => {
  const { videoId } = useParams();
  const { data: video, isLoading } = useGetVideo(videoId ?? "");

  if (!videoId) return <Navigate to="/" />;
  if (isLoading) return <CircularProgress />;
  if (!video) return <>Error</>;

  return (
    <Container>
      <Stack direction="row">
        <Box flex={1}>
          <video height={300} width={480} controls>
            <source src={video.dashUrl} type="application/dash+xml" />
            {video.adaptiveFormats
              // .filter((format) => format.encoding === "h264")
              .map((format) => (
                <source
                  key={format.url}
                  src={`${format.url}`}
                  type={format.type}
                  // title={format.resolution}
                />
              ))}
            {/* {video.captions.map((caption) => (
              <track
                kind="subtitles"
                srcLang={caption.language_code}
                src={`https://invidious.fdn.fr/${caption.url}`}
                label={caption.label}
                default={caption.label === "English"}
              />
            ))} */}
            {/* <source src={url} type={type} /> */}
            Video not supported
          </video>
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
      <pre>{JSON.stringify(video, null, 2)}</pre>
    </Container>
  );
};

export default Video;
