import * as React from 'react';
import { useSnackbar } from '@mui/base';
import { ClickAwayListener } from '@mui/base';
import { css, keyframes, styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackBar } from '../../redux/features/notificationsSlice';




export default function SnackbarComponent() {
  const { open, message } = useSelector(state => state.notifications);
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
          <CustomSnackbar {...getRootProps()}>{message}</CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </React.Fragment>
  );
}


const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;


const CustomSnackbar = styled('div')`
  position: fixed;
  z-index: 5500;
  right: 16px;
  bottom: 16px;
  max-width: 560px;
  min-width: 300px;
  background-color: #ffa800;
  border: 8px solid #ffa800;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 30%);
  padding: 1rem;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  animation: ${snackbarInRight} 200ms;
  transition: transform 0.2s ease-out;
`;