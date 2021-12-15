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
import React, {useEffect, useState} from "react";
import {connectionData} from "../../interfaces/dataInterface";
import RemoveDialog from "./removeDialog";

export interface ConnectionCardProps extends connectionData{
    setDuty : Function
}

const ConnectionCard:React.FC<ConnectionCardProps> = (props)=>{

    const [removeDialogOpen , setRemoveDialogOpen] = useState<boolean>(false)

    useEffect(()=>{
        if (!removeDialogOpen){props.setDuty({mode:'refresh'})}
    },[removeDialogOpen])

    return(
        <>
            <Box sx={{backgroundColor:'#eeeeee', padding: '1rem' , height: '4rem'}} borderRadius={'15px'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4}>
                        <div style={{paddingLeft : '4px'}}>
                            {props.social_type === 'instagram' && <RiInstagramFill fontSize={'2rem'}/>}
                            {props.social_type === 'facebook' && <GrFacebook fontSize={'2rem'}/>}
                            {props.social_type === 'linkedin' && <GrLinkedin fontSize={'2rem'}/>}
                            {props.social_type === 'telegram' && <FaTelegram fontSize={'2rem'}/>}
                            {props.social_type === 'twitter' && <FaTwitter fontSize={'2rem'}/>}
                            {props.social_type === 'webSite' && <MdHttp fontSize={'2rem'}/>}
                        </div>
                        <Typography variant={'h6'}>
                            {props.social_type === 'instagram' && 'اینستاگرام'}
                            {props.social_type === 'facebook' && 'فیسبوک'}
                            {props.social_type === 'linkedin' && 'لینکداین'}
                            {props.social_type === 'telegram' && 'تلگرام'}
                            {props.social_type === 'twitter' && 'توییتر'}
                            {props.social_type === 'webSite' && 'وبسایت'}
                        </Typography>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography sx={{paddingLeft : '4px'}}>آی دی (ID) :</Typography>
                            <Typography sx={{direction : 'ltr'}} fontSize={"0.75rem"}>{props.social_id}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Typography sx={{paddingLeft : '4px'}}>لینک :</Typography>
                            <Typography sx={{direction : 'ltr'}}>
                                <a href={props.social_link} style={{color: "orange" ,textDecoration : 'none'}}>{props.social_link}</a>
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
                        <Button color={'warning'} onClick={()=> props.setDuty({mode : 'edit' , id : props.id})}>
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