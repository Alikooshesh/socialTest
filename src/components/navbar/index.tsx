import {AppBar, Avatar, Box, Grid, Toolbar} from "@mui/material";
import {MdSearch} from "react-icons/all";
import React from "react";

const Navbar = () => {
    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color={'transparent'} sx={{boxShadow: 'none'}}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <div>
                            <MdSearch style={{fontSize: '24px'}}/>
                        </div>
                        <Box>
                            <Grid container item={true} spacing={2} sx={{alignItems:'center'}}>
                                <Grid item>
                                    <img width={'30px'} height={'20px'} alt={"Iran's flag"} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/255px-Flag_of_Iran.svg.png'}/>
                                </Grid>

                                <Grid item>
                                    <Avatar alt={'avatar'} src={'https://mui.com/static/images/avatar/2.jpg'}/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar