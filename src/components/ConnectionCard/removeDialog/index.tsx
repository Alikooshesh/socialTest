import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Stack,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {connectionData} from "../../../interfaces/dataInterface";
import {deleteData} from "../../../services";

export interface RemoveDialogProps extends connectionData{
    removeDialogOpen : boolean,
    setRemoveDialogOpen : Function
}

const RemoveDialog:React.FC<RemoveDialogProps> = (props)=>{

    const acceptDeleteData = () => {
        props.id && deleteData(props.id)
        props.setRemoveDialogOpen(false)
    }

    return(
        <Dialog open={props.removeDialogOpen} onClose={()=> props.setRemoveDialogOpen(false)}>
            <DialogTitle>آیا از تصمیم خود مطمئن هستید؟</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Stack direction={"row"} alignItems={'center'} justifyContent={'start'}>
                        <Typography>برای حذف مسیر ارتباطی</Typography>
                        <Typography fontSize={'0.75rem'} sx={{padding : '0 5px 0 5px',direction : 'ltr'}}>{props.social_id}</Typography>
                        <Typography>لطفا تایید را بنویسید</Typography>
                    </Stack>
                </DialogContentText>
                <TextField
                    margin="dense"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder={'تایید'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> props.setRemoveDialogOpen(false)} color={'warning'}>Cancel</Button>
                <Button onClick={acceptDeleteData} color={'inherit'}>حذف</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveDialog