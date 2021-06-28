import { TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import './dbookform.css'
import {   withStyles,InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { FormControl } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from '../actions/dBook'
import Grid from '@material-ui/core/Grid'
import Form from './Form'
import Input from './Input'
import Autocomplete from '@material-ui/lab/Autocomplete';



const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})



const initialFieldValues={

    bookName:'',
    description:'',
    category:'',
    author:''
    

}
const top100Films = [
    { title: 'Thriller' },
    { title: 'Biography' },
    { title: 'Drama' },
    { title: 'History' }
]


const DBookForm =({classes,...props})=>{

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [autoComplete,setAutoComplete]=React.useState(null);

    React.useEffect(() => {
        if(inputLabel.current){
        setLabelWidth(inputLabel.current.offsetWidth);
        }
    }, []);
   
    const validate=()=>{
        let temp={}
        temp.bookName=values.bookName?"" : "This field is required."
        temp.description=values.description ? "" : "This field is required."
        temp.author=values.author ? "" : "This field is required."
        
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }


    const [open, setOpen] = React.useState(false)
const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {

    setOpen(false);
  }
  
  const handleSubmit=e=>{
      e.preventDefault()
      
      if(validate()){
          if(props.currentId==0)
        props.createBooks({...values,category:autoComplete.title},()=>{window.alert('insert')})
        else
        props.updateBooks(props.currentId,{...values,category:autoComplete.title},()=>{window.alert('updated')})
      }
  }
  useEffect(() => {
    if (props.currentId != 0) {
        console.log(props.BookList ,"this is the list")
        setValues({
            ...props.BookList.find(x => x.bookId == props.currentId)
            
        })
        setErrors({})
    }
}, [props.currentId])


    return (<div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
             New Book
             </Button>
             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogContent>
             <Form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} >
             <h1>Add a Book</h1>
       
            <Input fullWidth margin="dense"
             label="Book Name"
             name="bookName"
             variant="outlined"
             value={values.bookName}
             onChange={handleInputChange}></Input>
                    
         

         
           <Input fullWidth margin="dense"
                    label="Author"
                    name="author"
                    variant="outlined"
                    value={values.author}
                    onChange={handleInputChange}></Input>    

      

             <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        value={autoComplete}
                        onChange={(e,value)=>{setAutoComplete(value)}}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />} />
    
      
             <div className="ButtonGroup">
             <Button className="CreateBook"
                        variant="contained"
                        color="primary"
                        type="submit">
                            Create
             </Button>
             <Button className="Cancel"
                        variant="contained"
                        onClick={resetForm} >
                            Cancel
                            
             </Button>
             </div>          
        </Form>
        </DialogContent> 
        </Dialog>
        </div>               
    )                      
}
const mapStateToProps=state=>({
    
    BookList:state.Book.list
})

const mapActionsToProps={
    createBooks: actions.create,
    updateBooks: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DBookForm ));
