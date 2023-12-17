import { CircularProgress, Container, Grid } from "@mui/joy";
import { useGetTrending } from "../../api/trending";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const { isLoading, data } = useGetTrending();

  if (isLoading) return <CircularProgress />;
  if (!data?.length) return <h1>No videos found</h1>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {data.map((video) => (
          <Grid xs={6} md={4} lg={4} key={video.videoId}>
            <VideoCard data={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
