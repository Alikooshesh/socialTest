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
import {_deleteData} from "../../../services";
import {useFormik} from "formik";

export interface RemoveDialogProps extends connectionData{
    removeDialogOpen : boolean,
    setRemoveDialogOpen : Function
}

const RemoveDialog:React.FC<RemoveDialogProps> = (props)=>{

    const acceptDeleteData = () => {
        props.id && _deleteData(props.id)
        formik.resetForm()
        props.setRemoveDialogOpen(false)
    }

    const formik = useFormik({
        initialValues : {
            acceptDelInput : ''
        },
        onSubmit : (values) => {

        }
    })

    return(
        <Dialog open={props.removeDialogOpen} onClose={()=> {
            props.setRemoveDialogOpen(false)
            formik.resetForm()
        }}>
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
                    value={formik.values.acceptDelInput}
                    onChange={formik.handleChange}
                    name={'acceptDelInput'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> props.setRemoveDialogOpen(false)} color={'warning'}>انصراف</Button>
                <Button onClick={() => acceptDeleteData()}
                        color={'inherit'} disabled={formik.values.acceptDelInput === 'تایید' ? false : true}>حذف</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveDialog