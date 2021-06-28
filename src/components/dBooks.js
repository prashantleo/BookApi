import React,{useState,useEffect} from 'react';
import  {connect} from "react-redux"
import * as actions from "../actions/dBook"
import Bookform from "../components/dBookform"
import {TableContainer} from "@material-ui/core"
import { Grid,TableHead, Paper,TableRow, TableCell, TableBody , withStyles, ButtonGroup, Button} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
const DBooks=({classes,...props})=>{
    const [currentId, setCurrentId] = useState(0)
    useEffect(()=>{
        props.fetchAllBooks()
    },[])

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteBooks(id)
    }
    return(
         <Paper className={classes.paper} elevation={3}>
         <Grid item xs={6}>
         <Bookform {...({currentId,setCurrentId})}></Bookform>
         </Grid>
         <Grid  item xs={6}>
         <TableContainer>
         <TableHead>
                    <TableRow>
                    <TableCell>Book Name</TableCell>
                    <TableCell>Description</TableCell>

                    <TableCell>Actions</TableCell>
                    
                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                                    props.BookList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                                <TableCell>{record.bookName}</TableCell>
                                                <TableCell>{record.description}</TableCell>
                                                <TableCell>
                                                <ButtonGroup variant="text">
                                                <Button><EditIcon color="primary"
                                                 onClick={() => { setCurrentId(record.bookId) }} /></Button>
                                                <Button><DeleteIcon color="secondary"
                                                 onClick={() => onDelete(record.bookId)} /></Button>
                                                </ButtonGroup>
                                                </TableCell>
                                                </TableRow>)
                                           }) 
                                          
                     }
            </TableBody>
            </TableContainer>
            </Grid>
            </Paper>)
}
const mapStateToProps=state=>({
    
        BookList:state.Book.list
    })

    const mapActionsToProps={
        fetchAllBooks:actions.fetchALL,
        deleteBooks: actions.Delete
    }

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(DBooks))
