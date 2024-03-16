import { Box, Button, Container, Dialog,DialogTitle,FormControl,FormLabel,IconButton, Input, Stack, TextField, Typography} from "@mui/material";
import PropTypes from 'prop-types'
import { useCallback } from "react";
import {CloseRounded} from '@mui/icons-material'
import { useEth } from "../contexts/EthContext";

function AddNoteDialog(props){
    const {state} = useEth()

    const editNote = useCallback(async({id,note,heading,tags})=>{
        if(state.contract){
            const data = await state.contract.methods.editNote(id,note,tags,heading).send({from:state.accounts[0]})
            console.log(data)
        }
    },[state.contract,state.accounts])

    const addNote = useCallback(async({note,heading,tags})=>{
        if(state.contract){
            const data = await state.contract.methods.createNote(note,tags,heading).send({from:state.accounts[0]})
            console.log(data)
        }
    },[state.contract,state.accounts])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const {note,tags,heading} = e.target;
        const parsedTags = tags.value.split(' ')
        if(props.open!=='edit'){
            addNote({note:note.value,tags:parsedTags,heading:heading.value})
        }else editNote({note:note.value,tags:parsedTags,heading:heading.value,id:props.data.id})
        props.handleClosePopup()
    }

    return(
        <Dialog onClose={props.handleClosePopup} open={props.open}>
            <Box width={"80vw"} minWidth={"300px"} maxWidth={'500px'}>
                <DialogTitle gap={4}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-around"}>
                        <Typography sx={{flexGrow:1}} variant="span">
                            {props.open==='edit'&&'Edit Note: '}
                            {
                                props.open==='edit'?<Typography variant="span" fontWeight={'medium'}>{props.data[0]}</Typography>:"Add new Note"
                            }
                        </Typography>
                    <IconButton color="blue" onClick={props.handleClosePopup}>
                        <CloseRounded/>
                    </IconButton>
                    </Stack>
                </DialogTitle>
                <Box p={"1rem"}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={"column"} gap={2}>
                            <TextField defaultValue={props.data&&props.data.heading} variant="outlined" label="Heading" name="heading"/>
                            <TextField defaultValue={props.data&&props.data.note} variant="outlined" label="note" multiline rows={3} name="note"/>
                            <TextField defaultValue={props.data&&JSON.stringify(props.data.tags)} variant="outlined" label="Tags" name="tags"/>
                        </Stack>
                    <Stack mt={2} direction={'row'} gap={2} alignItems={'center'} justifyContent={'end'}>
                        <Button type="submit" variant="outlined" color="primary">
                            {props.open==='edit'?"Edit":"Add"} 
                        </Button>
                        <Button onClick={()=>props.handleClosePopup()} type="button" variant="outlined" color="error">
                            Cancel
                        </Button>
                    </Stack>
                    </form>
                </Box>
            </Box>
        </Dialog>
    )
}

AddNoteDialog.propTypes = {
    open:PropTypes.bool.isRequired,
    handleClosePopup:PropTypes.func
}

export {AddNoteDialog}