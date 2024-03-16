import { useCallback, useEffect, useState } from "react";
import Note from "./Note";
import {Box,Button,Grid, Icon, IconButton, Stack, Typography} from '@mui/material';
import {useEth} from '../contexts/EthContext'
import {AddNoteDialog} from "./addNotePopUp";
import { AddOutlined } from "@mui/icons-material";
import {blue} from '@mui/material/colors'

const NoteSection = ()=>{
    const {state} = useEth()
    const [loading,setLoading] = useState(false)
    const [popUp,setPopup] = useState(false)
    const [popupData,setPopUpdata] = useState()
    const [notes,setNotes] = useState([
        {heading:"first note",note:"thsi si a simple sample note for now",tags:[
            'first','sample'
        ]}
    ])

    const getNotes = useCallback(async()=>{
        if(state.contract){
            setLoading(true)
            const data = await state.contract.methods.getNotes().call({from:state.accounts[0]})
            setNotes(data)
            console.log(data)
            setLoading(false)
        }
    },[state.accounts,state.contract])

    const handleOpenPopup = (type,data={}) => {
        if(type==='edit'){
            setPopup('edit')
            setPopUpdata(data)
        }else setPopup('add')
    }

    const handleClosePopup = () => {
        setPopUpdata()
        setPopup(false)
    }

    useEffect(()=>{
        getNotes()
    },[getNotes])

    return(
        <Box>
            <Box position={'absolute'} top={"10px"} left={"50%"}>
                <Typography variant="span" textAlign={'center'}>Loading ...</Typography>
            </Box>
            <Grid container>
                {!notes.length&&(
                    <Box top={"50%"} border={2} p={5} sx={{transform:"translate(-50%,-50%)"}} left={"50%"} position={'absolute'}>
                    <Stack gap={4}>
                        <Typography variant="p" fontSize={20}>
                            Start by creating a New Note
                        </Typography>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <Button variant="contained" onClick={handleOpenPopup}>
                                <Typography variant="span" mx={1}>
                                    Add Note
                                </Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
                )}
                {notes.map((ele,index)=>(
                    <Grid key={index} px={1} height={'auto'} item xs={12} md={4} lg={3}>
                        <Note editNote={()=>{handleOpenPopup('edit',ele)}} {...ele}/>
                    </Grid>
                ))}
            </Grid>
            <Box position={'fixed'} bottom={10} right={15}>
                <IconButton sx={{backgroundColor:blue[300],borderColor:blue[500]}} onClick={handleOpenPopup}>
                    <AddOutlined style={{color:"#fffff"}} fontSize="large"/>
                </IconButton>
            </Box>
            <AddNoteDialog data={popupData} open={popUp} handleClosePopup={handleClosePopup}></AddNoteDialog>
        </Box>
    )
}

export default NoteSection