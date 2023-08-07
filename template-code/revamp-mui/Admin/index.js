module.exports = `/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  InputBase,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Pagination,
  FormControl,
  Select,
  FormControlLabel,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {toast} from 'react-toastify';
import {API_URL} from 'shared/apiEndPointURL';
import {useNavigate} from 'react-router-dom';
import jwt_decode, {JwtPayload} from 'jwt-decode';

import Header from 'components/Header/Header.component';
import {
  EditIcon,
  RightIcon,
  DeleteIcon,
  SearchIconCSS,
  DialogBox,
  DeleteText,
  ListText,
  RefreshIcon,
  IconPaper,
  TableCheckbox,
  OptionFormControl,
  DialogBoxContent,
  DeleteRedIcon,
  DialogBoxActions,
  CancelBtn,
  MainTable,
  DeleteBtn,
  StartBox,
  RowHead,
  FirstCell,
  SecondCell,
  ThirdCell,
  FourthCell,
  ParentBox,
  InnerBox,
  HeaderBox,
  TooltipCss,
  Navbar,
  MainTableHead,
  SelectRow,
  CustomPagination,
} from './style.css';
import Edit from '../../../auth-assets/images/edit.png';
import Refresh from '../../../auth-assets/images/refresh.png';
import Right from '../../../auth-assets/images/newright.png';
import SearchIcon from '../../../auth-assets/images/search.png';
import CrossIcon from '../../../auth-assets/images/newcross.png';
import Delete from '../../../auth-assets/images/delete.png';
import RedDeleteIcon from '../../../auth-assets/images/deleteiconred.png';
import Sorted from '../../../auth-assets/images/unsorted.png';
import AuthLogo from '../../../auth-assets/images/logo.png';

import {axiosApiInstance} from '../api';

const roleOptions = [{value: 'User'}, {value: 'Viewer'}, {value: 'Admin'}];

const AdminDashboard = () => {
  /* this state is for map the table data */
  const [data, setData] = useState<any[]>([]);

  /* this state is for get the dropdown value data */
  const [optionValue, setOptionValue] = React.useState('');

  /* this state is use for show the delete icon conditially */
  const [agreement, setAgreement] = useState<boolean>(false);

  /* this state is use for open the dialog box after click on delete icon */
  const [open, setOpen] = React.useState(false);

  /* this state is use for set the role */
  const [role, setRole] = useState('');

  /* this state is use for show the edit icon conditioanlly */
  const [edit, setEdit] = useState(true);

  /* this state is use for set the selected checkbox */
  const [selectedItem, setSelectedItem] = useState<any>([]);

  /* this state is use for display the dropdown list conditioanlly after click on edit icon */
  const [isEditMode, setIsEditMode] = useState(false);

  /* this state is use for select the dropdown of particular id */
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);

  /* this state is use for to show the selected dropdown value */
  const [editedRow, setEditedRow] = useState({
    _id: 0,
    name: 'Monal',
    role: 'Admin',
  });
  const rowsPerPageOptions = [5, 10, 25];

  /* this state is use for pagination */
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [count, setCount] = useState(0);

  /* this state is use for sorting */
  const [sortStatus, setSortStatus] = useState(true);

  /* this state is use for props value for UserMenu */
  const [menuItems, setMenuItems] = useState({
    username: '',
    profile: '',
    account: '',
    logout: '',
    role: '',
  });

  /* StyledTableRow is a custom TableRow component  */
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  type IToken = {
    name: string;
    role: string;
    decoded: JwtPayload;
  };

  /* useEffect for accessing login details */
  useEffect(() => {
    /* auth_token grab from localstorage  */
    const authtoken: string = localStorage.getItem('auth_token') || '';
    /* decoded the auth_token */
    const decodedValue = jwt_decode<IToken>(authtoken);
    setMenuItems({
      username: decodedValue.name,
      profile: 'Profile',
      account: 'My Account',
      logout: 'Logout',
      role: decodedValue.role,
    });
  }, []);

  /* onBack() navigates to Homepage from Dashboard page  */
  const history = useNavigate();
  const onBack = () => {
    history('/');
  };

  /* useEffect for calling getData api once on component load */
  useEffect(() => {
    getData(rowsPerPage, 1);
  }, []);

  /* this function is for edit functinality after click on edit icon */
  const editIconHandler = ({_id, name, role}: any, event: any) => {
    setEdit(false);
    setIsEditMode(true);
    setRowIDToEdit(_id);
    editedRow._id = _id;
    editedRow.name = name;
    editedRow.role = role;
    setRole(role);
    setEditedRow(role);
    if (event.target.checked === false) {
      setSelectedItem(false);
    }
    const capitalizeFirst = (role: string) => role.charAt(0).toUpperCase() + role.slice(1);
    setOptionValue(capitalizeFirst(role));
  };

  /* this function is for checkbox functinality after click on checkbox */
  const checkboxHandler = (event: any, value: any) => {
    const prev = selectedItem;
    const itemIndex = prev.indexOf(value);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(value);
    }
    if (prev.length >= 1) {
      setAgreement(true);
    } else {
      setAgreement(false);
    }
    setSelectedItem([...prev]);
  };

  /* this function is  to handle delete feature on popup */
  const handleDelete = () => {
    onDeleteUserHandler(selectedItem);
    // setOpen(false);
  };

  /* this funtion is for pagination api call */
  const getData = async (rowsPerPage: number, page: number) => {
    const updatedPage = page - 1;

    const auth_token = localStorage.getItem('auth_token');
    try {
      const res = await axiosApiInstance.get(\`\${API_URL.userList}\`, {
        params: {
          limit: rowsPerPage,
          offset: updatedPage * rowsPerPage, // 0*5
        },
        headers: {Authorization: \`Bearer \${auth_token}\`},
      });
      if (res.status === 200) {
        setData(res.data.users);
        setCount(res.data.totalCount);
      }
    } catch (err: any) {
      if (err && err.response && err.response.status) {
        if (err.response.status === 401) {
          getData(rowsPerPage, 0);
        }
      }
    }
  };

  /* useEffect for calling getData api on page change and update userRole */
  useEffect(() => {
    getData(rowsPerPage, 1);
  }, [rowsPerPage, isEditMode]);

  /* this function is for pagination for change page */
  const handleChangePage = (event: any, newPage: number) => {
    const updatedPage = newPage - 1;

    setPage(newPage);
    getData(rowsPerPage, newPage);
    // getData(parseInt(event.target.value, newPage), 1);
  };

  /* this function is for pagination for change rows per page */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(1);
    getData(parseInt(event.target.value, rowsPerPage), 1);
  };

  /* this funtion is for refresh api call */
  const refreshHandler = async () => {
    setPage(1);
    setAgreement(false);
    setOpen(false);
    setIsEditMode(false);
    setEdit(true);
    setIsEditMode(false);
    setEditedRow({
      _id: 0,
      name: '',
      role: '',
    });
    setRowIDToEdit(undefined);
    getData(rowsPerPage, 1);
    setSelectedItem([]);
  };

  /* this function is for cross functinality after click on cross icon */
  const crossIconHandler = () => {
    setRole(role);
    setIsEditMode(false);
    setEditedRow({
      _id: 0,
      name: '',
      role: '',
    });
    setRowIDToEdit(undefined);
  };

  /* this function is for update the selected option from dropdown after click on right icon */
  const rightIconHandler = (_id: any, name: any, role: any) => {
    setRole(role);
    setRowIDToEdit(_id);
    setEdit(true);
    setRowIDToEdit(undefined);
    setIsEditMode(false);
    onUpdateUserRole(_id, role);

    const newData = data.map(({_id, name, role}: any) => {
      if (_id === editedRow._id) {
        name = editedRow.name;
        role = role;
      }
      return {_id, name, role};
    });
    setData(newData);
    setEditedRow({
      _id,
      name,
      role,
    });
  };

  /* this function is for dialog box functionality after click on cancel button */
  const handleCancel = () => {
    setOpen(false);
  };

  /* this function is for after click on delete icon the alert dialog box will be open */
  const showDeletePopupHandler = () => {
    setOpen(true);
  };

  /* this function is for  handling  search bar */
  const onhandleSearch = (e: any) => {
    console.log('searchhh', page, rowsPerPage);
    const userName = e.target.value;
    const auth_token = localStorage.getItem('auth_token');
    if (userName.length >= 2) {
      try {
        axiosApiInstance
          .get(\`\${API_URL.searchUser}\`, {
            params: {
              limit: rowsPerPage,
              name: userName,
              offset: page * rowsPerPage, // 0*5
            },
            headers: {Authorization: \`Bearer \${auth_token}\`},
          })
          .then((response: any) => {
            if (response.status === 200) {
              setPage(0);
              setRowsPerPage(5);
              setData(response.data.users);
              setCount(response.data.totalCount);
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else if (userName.length === 0) {
      getData(5, 1);
    }
  };

  /* this function is for api calling to update the user role */
  const onUpdateUserRole = (id: any, userRole: any) => {
    const auth_token = localStorage.getItem('auth_token');
    try {
      axiosApiInstance
        .patch(
          \`\${API_URL.updateUser}\`,
          {
            id,
            role: userRole.toLowerCase(),
          },
          {headers: {Authorization: \`Bearer \${auth_token}\`}},
        )
        .then((response: any) => {
          if (response.statusText === 'OK') {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            getData(rowsPerPage, 0);
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  };

  /* this function is for  api calling  to delete the user  */
  const onDeleteUserHandler = (selectedItem: any) => {
    const auth_token = localStorage.getItem('auth_token');
    try {
      axiosApiInstance
        .delete(\`$\{API_URL.deleteUser}\`, {
          headers: {Authorization: \`Bearer \${auth_token}\`},
          data: {
            ids: selectedItem,
          },
        })
        .then((response: any) => {
          if (response.statusText === 'OK') {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            getData(rowsPerPage, 1);
            setOpen(false);
            refreshHandler();
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  };

  /* this function is use for sorting the name column */
  const sortOnClick = () => {
    if (sortStatus) {
      const strAscending = data.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
      setSortStatus(false);
      setData(strAscending);
    } else {
      const strDescending = data.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1));
      setSortStatus(true);
      setData(strDescending);
    }
  };

  return (
    <Box>
      <Box style={Navbar}>
        <Header appLogo={AuthLogo} logoWidth="40px" menuItems={menuItems} />
      </Box>
      <Button
        style={{marginLeft: '10px', marginTop: '20px'}}
        variant="outlined"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => onBack()}
      >
        Back
      </Button>
      <Box style={ParentBox}>
        <Box style={InnerBox}>
          <Box style={HeaderBox}>
            <Box>
              <Typography fontWeight="bold" style={ListText}>
                List of users
              </Typography>
            </Box>
            <Box>
              <Box style={StartBox}>
                <Box>
                  {agreement ? (
                    <Tooltip title="Delete">
                      <img src={Delete} alt="delete" onClick={showDeletePopupHandler} style={DeleteIcon} />
                    </Tooltip>
                  ) : (
                    ''
                  )}
                </Box>
                <Box>
                  <Tooltip title="Refresh" style={TooltipCss} placement="left">
                    <IconButton onClick={() => refreshHandler()}>
                      <img src={Refresh} alt="refersh" style={RefreshIcon} />
                      &nbsp;
                    </IconButton>
                  </Tooltip>
                </Box>
                <Paper style={IconPaper}>
                  <img src={SearchIcon} alt="search" style={SearchIconCSS} />
                  <InputBase placeholder="Search" onKeyUp={onhandleSearch} />
                </Paper>
              </Box>
            </Box>
          </Box>
          <TableContainer style={MainTable}>
            <Table size="small" aria-label="a dense table">
              <TableHead style={MainTableHead}>
                <TableRow>
                  <TableCell />
                  <TableCell align="left" style={RowHead}>
                    Name
                    <IconButton onClick={sortOnClick}>
                      <img src={Sorted} alt="sorted" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" style={RowHead}>
                    Role
                    <IconButton onClick={sortOnClick}>
                      <img src={Sorted} alt="sorted" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" style={RowHead}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    {' '}
                    <TableCell colSpan={6} sx={{textAlign: 'center'}}>
                      No records found
                    </TableCell>{' '}
                  </TableRow>
                ) : (
                  data.map(({_id, name, role}) => (
                    <StyledTableRow key={_id}>
                      <TableCell style={FirstCell}>
                        <Checkbox
                          style={TableCheckbox}
                          checked={selectedItem.includes(_id)}
                          onChange={(event) => checkboxHandler(event, _id)}
                        />
                      </TableCell>
                      <TableCell align="left" style={SecondCell}>
                        {name}
                      </TableCell>
                      <TableCell align="center" style={ThirdCell}>
                        {edit ? (
                          <Typography>{role}</Typography>
                        ) : (
                          // eslint-disable-next-line react/jsx-no-useless-fragment
                          <>
                            {isEditMode && rowIDToEdit === _id ? (
                              <TextField
                                select
                                size="small"
                                variant="outlined"
                                style={OptionFormControl}
                                defaultValue={role}
                                value={optionValue}
                              >
                                {roleOptions.map((name) => (
                                  <MenuItem
                                    key={name.value}
                                    defaultValue={role}
                                    value={name.value}
                                    onClick={() => setOptionValue(name.value)}
                                  >
                                    {name.value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            ) : (
                              <Typography>{role}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center" style={FourthCell}>
                        {rowIDToEdit !== _id ? (
                          <Tooltip title="Edit" style={TooltipCss} placement="right">
                            <IconButton
                              disabled={selectedItem.length >= 2}
                              onClick={(event) => editIconHandler({_id, name, role}, event)}
                            >
                              <img src={Edit} alt="edit" style={EditIcon} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <>
                            <Tooltip title="Update" style={TooltipCss} placement="left">
                              <IconButton onClick={() => rightIconHandler(_id, name, optionValue)}>
                                <img src={Right} alt="right" style={RightIcon} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel" style={TooltipCss} placement="right">
                              <IconButton onClick={crossIconHandler}>
                                <img src={CrossIcon} alt="cross" style={RightIcon} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Pagination
              style={CustomPagination}
              color="primary"
              count={count}
              page={page}
              onChange={handleChangePage}
            />
            <FormControl>
              <FormControlLabel
                control={
                  <Select value={rowsPerPage} onChange={(e) => handleChangeRowsPerPage(e)} style={SelectRow}>
                    {[5, 10, 15, 20, 25].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option + ' rows'}
                      </MenuItem>
                    ))}
                  </Select>
                }
                label={<Typography variant="body2">Show: </Typography>}
                labelPlacement="start"
              />
            </FormControl>
          </TableContainer>
          <Box>
            <Dialog open={open} style={DialogBox}>
              <DialogContent style={DialogBoxContent}>
                <img src={RedDeleteIcon} alt="Delete" style={DeleteRedIcon} />
                &nbsp;&nbsp;&nbsp;
                {selectedItem.length === 1 ? (
                  <DialogContentText style={DeleteText}>Are you sure you want to delete this user ?</DialogContentText>
                ) : (
                  <DialogContentText style={DeleteText}>
                    Are you sure you want to delete these users ?
                  </DialogContentText>
                )}
              </DialogContent>
              <DialogActions style={DialogBoxActions}>
                <Button variant="contained" style={CancelBtn} onClick={handleCancel}>
                  Cancel
                </Button>
                &nbsp;&nbsp;
                <Button variant="contained" style={DeleteBtn} onClick={handleDelete}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

`;
