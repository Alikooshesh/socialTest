import {Box, Button, Stack, Typography} from "@mui/material";
import {FaTwitter, MdDelete, MdModeEditOutline} from "react-icons/all";

const ConnectionCard = ()=>{
    return(
        <>
            <Box sx={{backgroundColor:'#eeeeee', padding: '1rem' , height: '4rem'}} borderRadius={'15px'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{width: '50%'}}>
                        <FaTwitter fontSize={'2rem'}/>
                        <Typography variant={'h6'}>توییتر</Typography>
                        <Stack direction={'row'}>
                            <Typography>آی دی (ID) :</Typography>
                            <Typography>@test</Typography>
                        </Stack>
                        <Stack direction={'row'}>
                            <Typography>آی دی (ID) :</Typography>
                            <Typography>@test</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} sx={{width: '50%'}}>
                        <Button color={'warning'}>
                            <MdModeEditOutline />
                            <Typography component={'p'} sx={{marginRight: '0.5rem'}}>ویرایش</Typography>
                        </Button>
                        <Button color={'error'}>
                            <MdDelete />
                            <Typography component={'p'} sx={{marginRight: '0.5rem'}}>حذف</Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default ConnectionCard