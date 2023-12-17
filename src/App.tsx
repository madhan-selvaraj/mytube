import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, CssBaseline, CssVarsProvider, Stack } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Appbar from "./layout/AppBar";
import Sidebar from "./layout/Sidebar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Video from "./pages/Video/Video";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: async ({ queryKey }) => {
        const { data } = await axios.get(
          queryKey.filter((q) => typeof q !== "object").join("/"),
          {
            baseURL: "https://invidious.fdn.fr",
            params: {
              region: "IN",
              ...(typeof queryKey[1] === "object" && { ...queryKey[1] }),
            },
            proxy: {
              host: "invidious.fdn.fr",
              protocol: "https",
              port: 8080,
            },
          }
        );
        return data;
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider defaultMode="dark">
        <BrowserRouter>
          <Appbar />
          <Stack direction="row" width="100vw">
            <Box sx={{ flexShrink: 1, width: 240 }}>
              <Sidebar />
            </Box>
            <Box sx={{ flexGrow: 1, paddingTop: "64px", maxWidth: "100vw" }}>
              <CssBaseline />
              <Routes>
                <Route path="/" element={<Navigate to="/trending" replace />} />
                <Route path="/trending" Component={Home} />
                <Route path="/search" Component={Search} />
                <Route path="/video/:videoId" Component={Video} />
              </Routes>
            </Box>
          </Stack>
        </BrowserRouter>
      </CssVarsProvider>
    </QueryClientProvider>
  );
}

export default App;
