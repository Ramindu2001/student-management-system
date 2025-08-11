import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import StudentDetails from '../StudentDetails/StudentDetails';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import instance from '../../service/AxiosOrder';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function ButtonAppBar() {

    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };


    function handleSubmit() {
        instance.post('/student/save', {
            student_name: name,
            student_age: age,
            student_address: address,
            student_contact: contact
        })
            .then(function (response) {
                console.log(response);
                window.location.reload();
                setOpen(false);
            })
            .catch(function (error) {
                console.log(error);
                setOpen(false);
            });
    };

    function logOutAction() {
        localStorage.removeItem('amwd-token');
        location.reload();
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
                    {/* <MenuIcon /> */}
                    {/* </IconButton> */}
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Student Management System
                    </Typography>
                    <Button color="inherit" onClick={logOutAction}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ margin: 2 }}>
                <StudentDetails />
            </Box>

            <Box sx={{ position: 'fixed', bottom: 60, right: 60 }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={handleClickOpen} />
                </Fab>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'center', fontWeight: 600 }}>Student Registration</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
                        <TextField onChange={(val) =>
                            setName(val.target.value)
                        }
                            id="outlined-basic-name"
                            label="Student Name"
                            variant="outlined"
                            sx={{ width: 450, margin: 1 }}
                        />
                        <TextField onChange={(val) =>
                            setAge(val.target.value)
                        }
                            id="outlined-basic-age"
                            label="Student Age"
                            variant="outlined"
                            sx={{ width: 450, margin: 1 }}
                        />
                        <TextField onChange={(val) =>
                            setAddress(val.target.value)
                        }
                            id="outlined-basic-address"
                            label="Student Address"
                            variant="outlined"
                            sx={{ width: 450, margin: 1 }}
                        />
                        <TextField onChange={(val) =>
                            setContact(val.target.value)
                        }
                            id="outlined-basic-cn"
                            label="Student Contact Number"
                            variant="outlined"
                            sx={{ width: 450, margin: 1 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', height: 45 }}>
                    <Button onClick={handleClose} sx={{ marginLeft: 3, color: 'red' }}>Cancel</Button>
                    <Button onClick={handleSubmit} sx={{ marginRight: 3, color: 'green' }}>Register</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
