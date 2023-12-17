import { Avatar, Stack, Tooltip } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { Video } from "../api/trending";
import { RecommendedVideo } from "../api/video";

const { format } = Intl.NumberFormat("en", { notation: "compact" });

const VideoCard = ({
  data,
  compact = false,
}: {
  data: Video | RecommendedVideo;
  compact?: boolean;
}) => {
  const { url } = data.videoThumbnails.find((tn) => tn.quality === "medium") ||
    data.videoThumbnails[0] || { url: "" };
  return (
    <Link to={`/video/${data.videoId}`} style={{ textDecoration: "none" }}>
      <Card variant="outlined" sx={{ width: compact ? "250px" : "auto" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src={url}
              // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt={data.title}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Stack direction="row" gap={1}>
            <Avatar alt={data.author} />
            <Stack>
              <Tooltip title={data.title} variant="outlined">
                <Typography
                  level="title-md"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data.title.slice(0, 30)}
                </Typography>
              </Tooltip>
              <Typography level="body-sm">{data.author}</Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent
            orientation="horizontal"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              {data.lengthSeconds} s
            </Typography>
            <Divider orientation="vertical" />
            <IoMdEye />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              {format(data.viewCount)}
            </Typography>
            <Divider orientation="vertical" />
            {data.publishedText && (
              <Typography
                level="body-xs"
                fontWeight="md"
                textColor="text.secondary"
                sx={{ flexGrow: 1 }}
              >
                {data.publishedText}
              </Typography>
            )}
          </CardContent>
        </CardOverflow>
      </Card>
    </Link>
  );
};

export default VideoCard;
