import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useAlert from '../../util/hooks/useAlert';
import AlertType from '../../util/types/alert';
import { postData } from '../../util/api';

function ManageUsersButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAlert } = useAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        Manage Users
      </Button>
    </div>
  );
}

export default ManageUsersButton;
