import { AlternateEmail, Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import "./Navbar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../utils/Storage";

const Navbar = () => {
  const authenticatedUser = Storage.get("authenticatedUser");
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Storage.delete("authenticatedUser");
    navigate("/login");
  };

  const handleBackdrop = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`sidebar-container`}>
        <div className="side-bar">
          <img src="/assets/logo_white.svg" alt="PayFriends logo" />

          <>
            <div className={`dropdown ${isMenuOpen && "active"}`}>
              <IconButton
                data-testid="avatar-group"
                className="avatar-img"
                onClick={toggleMenu}
              >
                <Avatar />
              </IconButton>
              <div className="dropdown-content">
                <MenuItem disabled>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <span className="userName"> {authenticatedUser.name} </span>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemIcon>
                    <AlternateEmail fontSize="small" />
                  </ListItemIcon>
                  {authenticatedUser.email}
                </MenuItem>
                <Divider />
                <MenuItem data-testid="logout-button" onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </div>
            </div>
            {isMenuOpen && (
              <div className="dropdown-backdrop" data-testid="navbar-menu-backdrop" onClick={handleBackdrop}></div>
            )}
          </>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
