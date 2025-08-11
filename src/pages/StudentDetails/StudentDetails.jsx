import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../../service/AxiosOrder';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function StudentDetails() {

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updateData, setUpdateData] = useState({
        id: '',
        student_name: '',
        student_age: '',
        student_address: '',
        student_contact: ''
    });


    const handleOpenDialog = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };


    useEffect(() => {
        instance.get('student/getAll')
            .then((response) => {
                setCards(response.data);
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
            });
    }, []);


    const handleConfirmDelete = () => {
        instance.delete(`student/delete/${deleteId}`)
            .then(() => {
                alert("Student deleted successfully!");
                setCards(prev => prev.filter(card => card.id !== deleteId));
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete student.");
            });
        handleCloseDialog(); // Close the dialog
    };

    const handleOpenUpdateDialog = (card) => {
        setUpdateData(card);
        setOpenUpdateDialog(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateSubmit = () => {
        instance.put(`student/update/${updateData.id}`, updateData)
            .then(() => {
                alert("Student updated successfully!");
                setCards(prev => prev.map(card => card.id === updateData.id ? updateData : card));
                setOpenUpdateDialog(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to update student.");
            });
    };



    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
            }}
        >
            {cards.map((card, index) => (
                <Card key={card.id}>
                    {/* Action area for card click only */}
                    <CardActionArea
                        onClick={() => setSelectedCard(index)}
                        data-active={selectedCard === index ? '' : undefined}
                        sx={{
                            '&[data-active]': {
                                backgroundColor: 'action.selected',
                                '&:hover': {
                                    backgroundColor: 'action.selectedHover',
                                },
                            },
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Student ID {card.id}
                            </Typography>
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Name : {card.student_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Age : {card.student_age}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Address : {card.student_address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Contact No : {card.student_contact}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>

                    {/* Move buttons OUTSIDE the CardActionArea */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                        <Button size="small" sx={{ color: 'green' }} onClick={() => handleOpenUpdateDialog(card)}>Update</Button>
                        <Button size="small" sx={{ color: 'red' }} onClick={() => handleOpenDialog(card.id)}>Delete</Button>
                    </Box>
                </Card>
            ))}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this student?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Update Student Dialog */}
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
                <DialogTitle>Update Student</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, width: 300 }}>
                        <TextField  
                            label="Name"
                            name="student_name"
                            value={updateData.student_name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Age"
                            name="student_age"
                            value={updateData.student_age}
                            onChange={handleInputChange}
                            type="number"
                        />
                        <TextField
                            label="Address"
                            name="student_address"
                            value={updateData.student_address}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Contact No"
                            name="student_contact"
                            value={updateData.student_contact}
                            onChange={handleInputChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handleUpdateSubmit} color="success">Update</Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
}
