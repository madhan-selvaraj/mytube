import { Autocomplete, Box, Typography } from "@mui/joy";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import debounce from "lodash.debounce";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSearchSuggestions } from "../api/search";

function openSidebar() {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

function closeSidebar() {
  if (typeof document !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const debouncedSetQuery = debounce((arg) => setQuery(arg), 500);
  const { data, isLoading, isFetching } = useSearchSuggestions(query);

  return (
    <Sheet
      sx={{
        display: { xs: "flex" },
        alignItems: "center",
        //   justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "64px",
            [theme.breakpoints.up("md")]: {
              // "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <IoMdMenu />
      </IconButton>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/* <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton> */}
        <Typography level="title-lg">MyTube</Typography>
      </Box>
      <Autocomplete
        placeholder="Search"
        options={data?.suggestions || []}
        value={query}
        onInputChange={(_, value) => debouncedSetQuery(value)}
        onChange={(_, value) => navigate(`/search?q=${value}`)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            // Prevent's default 'Enter' behavior.
            event.defaultMuiPrevented = true;
            if (query) navigate(`/search?q=${query}`);
          }
        }}
        loading={isLoading || isFetching}
        sx={{ width: 300 }}
        slotProps={{
          listbox: {
            style: {
              zIndex: 9999,
            },
          },
        }}
      />
    </Sheet>
  );
}
