import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { useEth } from "../contexts/EthContext"
import { useState } from "react"

const Header = ()=>{
    const {state} = useEth()
    const [anchorEl,setAnchorEl] = useState(null)

    const handleExpand =(event)=>{
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (event)=>{
        setAnchorEl(null)
    }

    return(
        <AppBar position="fixed">
            <Container>
            <Stack py={2} w={'100%'} direction="row" alignItems={"center"} justifyContent={'space-between'}>
                <Box>
                    <Typography variant="h5" textTransform={'uppercase'}>Note App</Typography>
                </Box>
                <Box flex position={'relative'}>
                    <IconButton onClick={handleExpand} sx={{height:40,width:40,border:3}}>
                        <Avatar src="user.png"/>
                    </IconButton>
                    <Menu 
                        anchorEl={anchorEl}
                        border={`2px solid #141414`}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onBlur={handleClose}
                        keepMounted
                        anchorOrigin={{
                            vertical:40,
                            horizontal:"left"
                        }}
                        sx={{padding:0}}
                    >
                        <Typography p={'5px'} component="div" variant="p" bgcolor={"#f2f2f2"} fontWeight={"medium"} pl={1} fontSize={12} color={'gray'}>Accounts</Typography>
                        {state.accounts&&(state.accounts.map(ele=>(
                            <MenuItem key={ele}>
                                <Typography variant="span" color={'#454545'}>
                                    {ele}
                                </Typography>
                            </MenuItem>
                        )))}
                    </Menu>
                </Box>
            </Stack>
            </Container>
        </AppBar>
    )
}

export default Header