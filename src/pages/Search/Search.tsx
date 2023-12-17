import { Container, Grid } from "@mui/joy";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../api/search";
import VideoCard from "../../components/VideoCard";

const Search = () => {
  const [params] = useSearchParams();
  const { data } = useSearch(params.get("q") ?? "");
  console.log("🚀 ~ file: Search.tsx:9 ~ Search ~ params:", params);
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {data?.map((video) => (
          <Grid xs={6} md={4} lg={4} key={video.videoId}>
            <VideoCard data={video} />
          </Grid>
        ))}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Grid>
    </Container>
  );
};

export default Search;
