import * as React from 'react';
import { useSnackbar } from '@mui/base';
import { ClickAwayListener } from '@mui/base';
import {  keyframes, styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackBar } from '../../redux/features/notificationsSlice';




export default function SnackbarComponent() {
  const { open, message, type } = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideSnackBar());
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    autoHideDuration: 3000,
  });


  return (
    <React.Fragment>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()} type={type}>{message}</CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </React.Fragment>
  );
}


const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;


const CustomSnackbar = styled('div')(({ type }) => ({
  position: 'fixed', 
  zIndex: 5500,
  right: '16px',
  bottom: '16px',
  maxWidth: '560px',
  minWidth: '300px',
  backgroundColor: '#fff', 
  border: `5px solid ${type === 'error' ? '#f44336' : '#ffa800'}`, 
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgb(0 0 0 / 30%)',
  padding: '16px 24px',
  color: '#000',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 500,
  animation: `${snackbarInRight} 200ms`,
  transition: 'transform 0.2s ease-out',
}));
