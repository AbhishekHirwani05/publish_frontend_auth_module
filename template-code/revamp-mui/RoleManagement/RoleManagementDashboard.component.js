module.exports = `
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { SelectChangeEvent } from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { toast } from 'react-toastify';
import { API_URL } from 'shared/apiEndPointURL';
import { useNavigate } from 'react-router-dom';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import Header from 'components/Header/Header.component';
import { v4 as uuidv4 } from 'uuid';
import {
  EditIcon,
  DeleteIcon,
  SearchIconCSS,
  DialogBox,
  DeleteText,
  ListText,
  RefreshIcon,
  IconPaper,
  TableCheckbox,
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
  RoleInput,
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
} from './RoleManagementStyle.css';
import Edit from '../../../auth-assets/images/edit.png';
import Refresh from '../../../auth-assets/images/refresh.png';
import SearchIcon from '../../../auth-assets/images/search.png';
import RedDeleteIcon from '../../../auth-assets/images/deleteiconred.png';
import Sorted from '../../../auth-assets/images/unsorted.png';
import AuthLogo from '../../../auth-assets/images/logo.png';
import { axiosApiInstance } from '../api';

const RoleManagementDashboard = () => {
  /* this state is for map the table data */
  const [data, setData] = useState<any[]>([]);

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

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [inputArray, setInputArray] = useState([]);

  /* this state is use for props value for UserMenu */
  const [menuItems, setMenuItems] = useState({
    username: '',
    profile: '',
    account: '',
    logout: '',
    role: '',
  });

  /* StyledTableRow is a custom TableRow component  */
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
    getRoleList();
  }, []);

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
        headers: { Authorization: \`Bearer \${auth_token}\` },
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
  }, [rowsPerPage]);

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
  // const refreshHandler = async () => {
  //   setPage(1);
  //   setAgreement(false);
  //   setOpen(false);
  //   setIsEditMode(false);
  //   setEdit(true);
  //   setIsEditMode(false);
  //   setEditedRow({
  //     _id: 0,
  //     name: '',
  //     role: '',
  //   });
  //   setRowIDToEdit(undefined);
  //   getData(rowsPerPage, 1);
  //   setSelectedItem([]);
  // };

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
            headers: { Authorization: \`Bearer \${auth_token}\` },
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

  /* this function is use for sorting the name column */
  const sortOnClick = () => {
    if (sortStatus) {
      const strAscending = inputArray.sort((a, b) => (a.input1.toUpperCase() > b.input1.toUpperCase() ? 1 : -1));
      setSortStatus(false);
      setData(strAscending);
    } else {
      const strDescending = inputArray.sort((a, b) => (a.input1.toUpperCase() > b.input1.toUpperCase() ? -1 : 1));
      setSortStatus(true);
      setData(strDescending);
    }
  };

  const [openDialog, setOpenDialogBox] = useState(false);
  const [editRolePopulatedData, setEditRolePopulatedData] = useState(null);

  const handleClickOpen = () => {
    setOpenDialogBox(true);
    setInput1('');
    setInput2('');
    setPersonName([]);
  };

  const handleClose = () => {
    setOpenDialogBox(false);
    setEditRolePopulatedData(null);
    setInput1('');
    setInput2('');
    setPersonName([]);
  };

  const names = [
    'Feature 1',
    'Feature 2',
    'Feature 3',
  ];

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'input1') {
      setInput1(value);
    } else if (name === 'input2') {
      setInput2(value);
    }
  };

  const handleAddToInputArray = () => {
    const newInput = {
      id: uuidv4(),
      input1,
      input2,
      input3: personName,
    };

    axios
      .post(
        'http://localhost:3000/roles',
        newInput,
      )
      .then((response) => {
        setInputArray([...inputArray, response.data]);
      })
      .catch((err) => {
        console.error(err);
      });

    setInput1('');
    setInput2('');
    setPersonName([]);
    setOpenDialogBox(false);
  };
  console.log("inputArray", inputArray);
  const getRoleList = async () => {
    const roles = await axios.get('http://localhost:3000/roles');
    if (roles && roles.data) {
      setInputArray(roles.data);
    }
  };

  const updateRole = async () => {
    const newInput = {
      input1,
      input2,
      // input3: personName,
    };
    await axios.put(\`http://localhost:3000/roles/\${editRolePopulatedData.id}\`, newInput);
    setOpenDialogBox(false);
    setEditRolePopulatedData(null);
    getRoleList();
  };

  const deleteRole = async (id) => {
    await axios.delete(\`http://localhost:3000/roles/\${id}\`);
    setOpenDialogBox(false);
    getRoleList();
  };

  const openInPopup = (id: string) => {
    const rowData = inputArray.filter((item) => item.id === id)[0];
    setEditRolePopulatedData(rowData);
    setInput1(rowData.input1);
    setInput2(rowData.input2);
    // setPersonName(rowData.personName);
    setOpenDialogBox(true);
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box>
      <Box style={Navbar}>
        <Header appLogo={AuthLogo} logoWidth="40px" menuItems={menuItems} />
      </Box>
      <Button
        style={{ marginLeft: '10px', marginTop: '20px' }}
        variant="outlined"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => onBack()}
      >
        Back
      </Button>
      <Button
        variant="outlined"
        endIcon={<AddIcon />}
        style={{ marginLeft: '10px', marginTop: '20px', textTransform: 'capitalize' }}
        onClick={() => handleClickOpen()}
      >
        Create New Role
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
                      <img src={RedDeleteIcon} alt="delete" onClick={showDeletePopupHandler} style={DeleteIcon} />
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
                    Role
                    <IconButton onClick={sortOnClick}>
                      <img src={Sorted} alt="sorted" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left" style={RowHead}>
                    Description
                    <IconButton onClick={sortOnClick}>
                      <img src={Sorted} alt="sorted" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left" style={RowHead}>
                    Features
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
                    <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                      No records found
                    </TableCell>{' '}
                  </TableRow>
                ) : (
                  inputArray
                    .map(({ id, input1, input2, input3 }) => (
                      <StyledTableRow key={id}>
                        <TableCell style={FirstCell}>
                          <Checkbox
                            style={TableCheckbox}
                            checked={selectedItem.includes(id)}
                            onChange={(event) => checkboxHandler(event, id)}
                          />
                        </TableCell>
                        <TableCell align="left" style={SecondCell}>
                          {input1}
                        </TableCell>
                        <TableCell align="left" style={SecondCell}>
                          {input2}
                        </TableCell>
                        <TableCell align="left" style={ThirdCell}>
                          <Tooltip title={input3} style={TooltipCss}>
                            {input3}
                          </Tooltip>
                        </TableCell>
                        <TableCell align="left" style={FourthCell}>
                          <Tooltip title="Edit" style={TooltipCss} placement="left">
                            <IconButton
                              disabled={selectedItem.length >= 2}
                              onClick={() => openInPopup(id)}
                            >
                              <img src={Edit} alt="edit" style={EditIcon} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" style={TooltipCss} placement="right">
                            <IconButton
                              onClick={() => deleteRole(id)}
                            >
                              <img src={RedDeleteIcon} alt="delete" style={EditIcon} />
                            </IconButton>
                          </Tooltip>
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
                control={(
                  <Select value={rowsPerPage} onChange={(e) => handleChangeRowsPerPage(e)} style={SelectRow}>
                    {[5, 10, 15, 20, 25].map((option) => (
                      <MenuItem key={option} value={option}>
                        {\`\${option} rows\`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
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
          <Dialog open={openDialog} onClose={() => handleClose()}>
            <DialogTitle>Create New Role <CloseIcon style={{ marginLeft: '160px' }} onClick={() => handleClose()} /></DialogTitle>
            <DialogContent>
              <p>Role </p>
              <TextField
                name="input1"
                value={input1}
                onChange={handleInputChange}
                style={RoleInput}
                fullWidth
              />
              <p>Description  </p>
              <TextField
                name="input2"
                value={input2}
                onChange={handleInputChange}
                style={RoleInput}
                fullWidth
              />
              <Box>
                <FormControl sx={{ m: 2, width: 300, marginLeft: '0px' }}>
                  <InputLabel id="demo-multiple-checkbox-label">Features</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button style={{ textTransform: 'capitalize' }} variant="outlined" onClick={() => handleClose()}>Cancel</Button>
              <Button style={{ textTransform: 'capitalize' }} type="submit" variant="contained" onClick={() => (editRolePopulatedData ? updateRole() : handleAddToInputArray())}>{editRolePopulatedData ? 'Update' : 'Save'}</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default RoleManagementDashboard;`;
