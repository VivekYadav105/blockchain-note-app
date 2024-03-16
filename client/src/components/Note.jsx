import { Chip, IconButton, Stack, Typography } from "@mui/material";
import {EditNote} from '@mui/icons-material'
import PropTypes  from "prop-types";
import { useEffect } from "react";

const Note = (props) =>{
    useEffect(()=>{
        console.log(props)
    },[props])
    return(
        <Stack direction={'column'} border={"2px solid #343434"} height={'100%'} p={"1rem"} borderRadius={"10px"}>
            <Stack direction={'row'} borderBottom={1} >
                <Typography flex={1} textAlign={'center'} variant="h4" alignItems={"center"} fontSize={24} fontWeight={600}>{props.heading}</Typography>
                <IconButton onClick={()=>{props.editNote()}}>
                    <EditNote/>
                </IconButton>
            </Stack>
            <Typography mt={2} variant="p" flexGrow={'1'}>{props.note}</Typography>
            <Stack mt={3} direction={'row'}  gap={2} pb={2}>
                {props.tags.map((ele,index)=>(
                    <Chip key={index} color="primary" variant="outlined" label={`# ${ele}`}/>
                ))}
            </Stack>
        </Stack>
    )
}

Note.propTypes = {
    heading:PropTypes.string,
    note:PropTypes.string,
    tags:PropTypes.arrayOf(PropTypes.string)
}

export default Note