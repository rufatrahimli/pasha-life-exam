import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as StarIcon } from "../../assets/sidebar-icon.svg";
import { ReactComponent as StarIcon1 } from "../../assets/sidebar-icon-1.svg";
import { ReactComponent as StarIcon2 } from "../../assets/sidebar-icon-2.svg";
import { ReactComponent as StarIcon3 } from "../../assets/sidebar-icon-3.svg";
import { ReactComponent as StarIcon4 } from "../../assets/sidebar-icon-4.svg";
import { ReactComponent as StarIcon5 } from "../../assets/sidebar-icon-5.svg";
import { ReactComponent as StarIcon6 } from "../../assets/sidebar-icon-6.svg";
import { ReactComponent as StarIcon7 } from "../../assets/sidebar-icon-7.svg";
import { ReactComponent as StarIcon8 } from "../../assets/sidebar-icon-8.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Logo2 } from "../../assets/logo2.svg";
import { ReactComponent as Bell } from "../../assets/bell.svg";
import image from "../../assets/me.jpeg";

const drawerWidth = 97;

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <List>
        <ListItem>
          <SvgIcon
            sx={{ width: "40px", height: "40px", margin: "auto", mb: 4 }}
            viewBox="0 0 40 40"
            height={"40px"}
            width={"40px"}
            component={Logo}
          ></SvgIcon>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon1}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon2}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon3}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon4}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon5}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon6}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon7}></SvgIcon>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SvgIcon component={StarIcon8}></SvgIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffffff",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{placeSelf: "end"}}>
          <Box sx={{display: "flex", flexDirection : "row", width: "350px", justifyContent: "space-between", alignItems: "center"}}>
            <Box
              sx={{
                border: "1px solid #C5C9D4",
                borderRadius: "8px",
                padding: "8px",
                height: "42px",
              }}
            >
              <SvgIcon component={Logo2}></SvgIcon>
            </Box>
              <Typography noWrap component="div" sx={{ color: "#51555F" }}>
                Pasha Həyat Sığorta
              </Typography>
            <SvgIcon component={Bell}></SvgIcon>
            <Box
              sx={{
                borderRadius: "50%",
                overflow: "hidden",
                height: "42px",
                width: "42px",
                border: "1px solid #C5C9D4 ",
              }}
            >
              <img src={image} height="40px" width={"40px"} alt="Rufat" />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              backgroundColor: "lightyellow",
              color: "orange",
            },
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundColor: "lightyellow",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#266AEB",
              borderRadius: "16px",
              marginX: "30px",
              marginY: "32px",
              height: "90vh",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
