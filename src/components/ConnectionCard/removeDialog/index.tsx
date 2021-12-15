import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
        props.id && deleteData(props.id) && props.setRemoveDialogOpen(false)
    }

    return(
        <Dialog open={props.removeDialogOpen} onClose={()=> props.setRemoveDialogOpen(false)}>
            <DialogTitle>آیا از تصمیم خود مطمئن هستید؟</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    برای حذف مسیر ارتباطی
                    {<Typography variant={'subtitle1'}>{props.social_id}</Typography>}
                    لطفا تایید را بنویسید
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
                <Button onClick={()=> props.setRemoveDialogOpen(false)}>Cancel</Button>
                <Button onClick={acceptDeleteData}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveDialog