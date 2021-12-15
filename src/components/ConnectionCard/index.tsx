import {Box, Button, Stack, Typography} from "@mui/material";
import {
    FaTelegram,
    FaTwitter,
    GrFacebook,
    GrLinkedin,
    MdDelete, MdHttp,
    MdModeEditOutline,
    RiInstagramFill
} from "react-icons/all";
import React, {useState} from "react";
import {connectionData} from "../../interfaces/dataInterface";
import RemoveDialog from "./removeDialog";

const ConnectionCard:React.FC<connectionData> = (props)=>{

    const [removeDialogOpen , setRemoveDialogOpen] = useState<boolean>(false)

    return(
        <>
            <Box sx={{backgroundColor:'#eeeeee', padding: '1rem' , height: '4rem'}} borderRadius={'15px'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{width: '50%'}}>
                        <Stack direction={'row'}>

                            {props.social_type === 'instagram' && <RiInstagramFill fontSize={'2rem'}/>}
                            {props.social_type === 'facebook' && <GrFacebook fontSize={'2rem'}/>}
                            {props.social_type === 'linkedin' && <GrLinkedin fontSize={'2rem'}/>}
                            {props.social_type === 'telegram' && <FaTelegram fontSize={'2rem'}/>}
                            {props.social_type === 'twitter' && <FaTwitter fontSize={'2rem'}/>}
                            {props.social_type === 'webSite' && <MdHttp fontSize={'2rem'}/>}
                            <Typography variant={'h6'}>
                                {props.social_type === 'instagram' && 'اینستاگرام'}
                                {props.social_type === 'facebook' && 'فیسبوک'}
                                {props.social_type === 'linkedin' && 'لینکداین'}
                                {props.social_type === 'telegram' && 'تلگرام'}
                                {props.social_type === 'twitter' && 'توییتر'}
                                {props.social_type === 'webSite' && 'وبسایت'}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'}>
                            <Typography> آی دی (ID) :</Typography>
                            <Typography>{props.social_id}</Typography>
                        </Stack>
                        <Stack direction={'row'}>
                            <Typography> لینک :</Typography>
                            <Typography>{props.social_link}</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} sx={{width: '50%'}}>
                        <Button color={'warning'}>
                            <MdModeEditOutline />
                            <Typography component={'p'} sx={{marginRight: '0.5rem'}}>ویرایش</Typography>
                        </Button>
                        <Button color={'error'} onClick={()=> setRemoveDialogOpen(true)}>
                            <MdDelete />
                            <Typography component={'p'} sx={{marginRight: '0.5rem'}}>حذف</Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            <RemoveDialog {...props} removeDialogOpen={removeDialogOpen} setRemoveDialogOpen={setRemoveDialogOpen}/>
        </>
    )
}

export default ConnectionCard