import Box from "@mui/joy/Box";
import GlobalStyles from "@mui/joy/GlobalStyles";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import React from "react";
import {
  MdBookmarks,
  MdInfo,
  MdSettings,
  MdSubscriptions,
  MdTrendingUp,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

function closeSidebar() {
  if (typeof document !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        marginTop: "var(--Header-height)",
        // zIndex: 10000,
        height: "calc(100vh - var(--Header-height))",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "calc(100vh - var(--Header-height))",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {[
            { label: "Subscriptions", icon: <MdSubscriptions /> },
            { label: "Trending", icon: <MdTrendingUp /> },
            { label: "Saved", icon: <MdBookmarks /> },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={`/${item.label.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItem key={item.label}>
                  <ListItemButton selected={isActive}>
                    {item.icon}
                    <ListItemContent
                      sx={{ textDecoration: "none" }}
                      style={{ textDecoration: "none" }}
                      // primary={text}
                    >
                      <Typography level="title-sm">{item.label}</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}

          {/* <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Tasks</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={{ transform: open ? "rotate(180deg)" : "none" }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton>All tasks</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Backlog</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>In progress</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Done</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem> */}

          {/* <ListItem>
              <ListItemButton
                role="menuitem"
                component="a"
                href="/joy-ui/getting-started/templates/messages/"
              >
                <QuestionAnswerRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Messages</Typography>
                </ListItemContent>
                <Chip size="sm" color="primary" variant="solid">
                  4
                </Chip>
              </ListItemButton>
            </ListItem> */}
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <MdInfo />
              About
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <MdSettings />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
