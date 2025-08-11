import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import instance from '../../service/AxiosOrder';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        instance.post('/login', {
            email: email,
            password: password,
        })
            .then(function (response) {
                console.log(response.data.token);
                localStorage.setItem('amwd-token', response.data.token);
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ width: 400, height: 450, border: '1px solid #1e3799', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 3, backgroundColor: '#e9ecef' }}>

                <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center', marginBottom: 6, fontWeight: 600, color: '#1e3799' }}>
                    Login
                </Typography>

                <TextField onChange={(val) =>
                    setEmail(val.target.value)
                }
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    sx={{ marginBottom: 5 }}
                />

                <TextField onChange={(val) =>
                    setPassword(val.target.value)
                }
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    sx={{ marginBottom: 5 }}
                />


                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                    <Typography variant='body2' color='gray'>
                        Don't you have an account?
                    </Typography>
                    <Link to={'/register'}>
                    <Typography variant='body2' color='Green' sx={{fontFamily: 'Poppins'}}>
                        Register
                    </Typography>
                </Link>
                </Box>


                <Button onClick={handleLogin} variant="contained" sx={{ marginTop: 1 }}>Login</Button>

            </Box>

        </Box>
    )
}