module.exports = `import {useAtom} from 'jotai';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Logo from 'auth-assets/images/logo.png';
import {
  Tooltip,
  IconButton,
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import {useContext, useState} from 'react';
import {LabelContext} from 'contexts';
import {userSetting, darkModeAtom} from 'atoms/index';
import {clearAllStorage} from 'utils/clearStorage';
import {useNavigate} from 'react-router-dom';
import {style} from './Header.css';

/* This is common header for all components */
// eslint-disable-next-line react/prop-types
const Header: React.FC<Record<string, unknown>> = ({appLogo, logoWidth, menuItems}) => {
  /* Global state for theme */
  const [toggledark, settoggledark] = useAtom(darkModeAtom);
  /* State for user setting open/close */
  const [openUserSetting, setOpenUserSetting] = useAtom(userSetting);
  /* context provider */
  const {mainPage, loginPage} = useContext(LabelContext);
  /* anchor element for menu */
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  /* Trigger toggle using onChange Switch */
  const handleModeChange = () => (!toggledark ? settoggledark(1) : settoggledark(0));

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenUserSetting((isopen) => !isopen);
    setAnchorEl(event.currentTarget);
  };

  const history = useNavigate();

  const onLogout = () => {
    clearAllStorage();
    history('/sign-in');
  };
  return (
    <AppBar position="absolute">
      <Toolbar aria-label="toolbar" className="toolbar">
        <Box component="img" src={appLogo || Logo} alt="logo" width={logoWidth || '40px'} />
        {menuItems?.role === 'superAdmin' ? (
          <Typography data-testid="header" className="username">
            Admin
          </Typography>
        ) : null}

        <Tooltip title="Account settings">
          <IconButton
            role="button"
            data-testid="iconBtn"
            onClick={openMenu}
            size="small"
            sx={{...style.menuButton}}
            aria-controls={openUserSetting ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openUserSetting ? 'true' : undefined}
          >
            <Typography data-testid="header" sx={style.username} className="username">
              {mainPage?.username || menuItems?.username}
            </Typography>
            <Avatar sx={{width: 32, height: 32}} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Menu
        data-testid="headerMenu"
        id="account-menu"
        open={openUserSetting}
        onClick={() => setOpenUserSetting((isopen) => !isopen)}
        PaperProps={{
          elevation: 0,
          sx: {...style.headerMenu},
        }}
        anchorEl={anchorEl}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem data-testid="profile">{mainPage?.profile || menuItems?.profile}</MenuItem>
        <MenuItem data-testid="account">{mainPage?.account || menuItems?.account}</MenuItem>
        <MenuItem>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch data-testid="dark" checked={!!toggledark} onChange={handleModeChange} name="toggledark" />
              }
              label={mainPage?.mode}
            />
          </FormGroup>
        </MenuItem>
        <Divider />
        <MenuItem data-testid="logout" onClick={() => onLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {loginPage?.logout || menuItems?.logout}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
export default Header;

`;
