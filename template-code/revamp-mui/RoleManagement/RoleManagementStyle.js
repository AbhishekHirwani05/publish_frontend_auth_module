module.exports = `import CSS from 'csstype';

export const MainTable: CSS.Properties = {
  minWidth: '60vw',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  border: '1.5px solid #E0E0E0',
  borderRadius: '6px',
};

export const MainTableHead: CSS.Properties = {
  background: '#02005F',
};

export const RoleInput: CSS.Properties = {
  display: 'flex',
  width: '100%',
};

export const ParentBox: CSS.Properties = {
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  justifyContent: 'center',
};

export const InnerBox: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '70vh',
  minWidth: '90vw',
};

export const Navbar: CSS.Properties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  minHeight: '7vh',
  minWidth: '100%',
};

export const HeaderBox: CSS.Properties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '7vh',
  minWidth: '100%',
};

export const StartBox: CSS.Properties = {
  display: 'flex',
  marginLeft: '48%',
  marginBottom: '7px',
};

export const EditIcon: CSS.Properties = {
  cursor: 'pointer',
  width: '32px',
  height: '32px',
};

export const RightIcon: CSS.Properties = {
  width: '32px',
  height: '32px',
  top: '276px',
  cursor: 'pointer',
};

export const SearchIconCSS: CSS.Properties = {
  margin: '10px 10px',
  height: '20px',
  width: '20px',
};

export const RowHead: CSS.Properties = {
  fontWeight: 600,
  color: '#FFFFFF',
};

export const DeleteText: CSS.Properties = {
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '35px',
  display: 'flex',
  alignItems: 'center',
  color: '#515151',
};

export const ListText: CSS.Properties = {
  fontSize: '20px',
  color: '#000000',
};

export const RefreshIcon: CSS.Properties = {
  height: '38px',
  width: '34px',
  marginTop: '-7px',
  borderRadius: '6px',
};

export const DeleteIcon: CSS.Properties = {
  cursor: 'pointer',
  position: 'absolute',
  height: '38px',
  width: '34px',
  margin: '2px -34px',
};

export const IconPaper: CSS.Properties = {
  display: 'flex',
  alignItems: 'center',
  width: '40rem',
  height: '2rem',
  background: '#FFFFFF',
  border: '2px solid #DEE2E7',
  boxShadow: '1px 1px 2px rgba(191, 190, 190, 0.16)',
};

export const TooltipCss: CSS.Properties = {
  background: 'none',
};

export const TableCheckbox: CSS.Properties = {
  height: '20px',
  width: '20px',
};

export const OptionFormControl: CSS.Properties = {
  minWidth: '160px',
  textTransform: 'capitalize',
};

export const DialogBox: CSS.Properties = {
  margin: 'auto',
  width: '65rem',
};

export const DialogBoxContent: CSS.Properties = {
  display: 'flex',
  height: '35%',
};

export const DeleteRedIcon: CSS.Properties = {
  width: '28px',
  height: '30px',
  left: '611px',
  top: '406px',
};

export const DialogBoxActions: CSS.Properties = {
  padding: '1% 7% 7% 50%',
};

export const CancelBtn: CSS.Properties = {
  background: '#ECECEC',
  color: '#858585',
  borderRadius: '4px',
  width: '7rem',
  height: '2rem',
};

export const DeleteBtn: CSS.Properties = {
  background: '#E74242',
  width: '7rem',
  height: '2rem',
};

export const FirstCell: CSS.Properties = {
  width: '15%',
  paddingLeft: '3%',
};

export const SecondCell: CSS.Properties = {
  width: '28%',
};

export const ThirdCell: CSS.Properties = {
  width: '20%',
  textTransform: 'capitalize',
  background: 'none',
};

export const FourthCell: CSS.Properties = {
  width: '20%',
};

export const SelectRow: CSS.Properties = {margin: '15px', height: '40px'};

export const CustomPagination: CSS.Properties = {float: 'right', margin: '15px'};
`;
