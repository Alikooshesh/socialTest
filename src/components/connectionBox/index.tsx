import {
    Box,
    Button,
    Collapse,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack, TextField,
    Typography
} from "@mui/material";
import {BsDot} from "react-icons/all";
import ConnectionCard from "../ConnectionCard";
import {useEffect, useState} from "react";
import {editData, getAllData} from "../../services";
import {connectionData} from "../../interfaces/dataInterface";

export interface Iduty{
    mode : 'edit' | 'refresh',
    id? : string
}

const ConnectionBox = () => {
    const [duty , setDuty] = useState<false|Iduty>({mode : 'refresh'})
    const [connectionDataList , setConnectionDataList] = useState<connectionData[] | null>(null)
    const [addEditBoxOpen , setAddEditBoxOpen] = useState<boolean>(false)

    const refreshData = async () => {
        let data:any = await getAllData()
        data.length ?
            setConnectionDataList(data.map((item:any) => {

                return(
                    {
                        id: item.id,
                        social_id : item.social_id,
                        social_link : item.social_link,
                        social_type : item.social_link.includes('instagram') ? 'instagram' :
                            item.social_link.includes('facebook') ? 'facebook' :
                                item.social_link.includes('linkedin') ? 'linkedin' :
                                    item.social_link.includes('telegram') ? 'telegram' :
                                        item.social_link.includes('twitter') ? 'twitter' :
                                            'webSite'
                    }
                )

            })):setConnectionDataList([])
        return connectionDataList
    }

    useEffect(()=>{
        if (duty){
            duty.mode === 'refresh' ?  refreshData() :
                duty.id &&
                editData(duty.id, {social_id : "" , social_link : ""}) &&
                setDuty({mode : 'refresh'})

        }
        setDuty(false)
    },[duty])

    return(
        <>
            {console.log(connectionDataList)}
            <Container maxWidth={'lg'}>
                <Typography variant={'h4'} color={'black'}>حساب کاربری</Typography>
                <Grid container spacing={1} alignItems={'end'} sx={{marginBottom: '1rem'}}>
                    <Grid item>
                        <Typography variant={'h6'} color={'gray'}>خانه</Typography>
                    </Grid>
                    <Grid item>
                        <BsDot style={{fontSize : '1.5rem'}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h6'} color={'gray'}>کاربر</Typography>
                    </Grid>
                    <Grid item>
                        <BsDot style={{fontSize : '1.5rem'}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h6'} color={'darkgray'}>تنظیمات کاربری</Typography>
                    </Grid>
                </Grid>

                <Box sx={{backgroundColor:'#f5f5f5', padding: '1rem' , boxShadow: 3}} borderRadius={'15px'}>
                    <Typography variant={'h6'} color={'darkgray'}>مسیر های ارتباطی</Typography>
                    <Button sx={{borderRadius:'4px' , marginBottom:'8px'}} size={'large'} color={'warning'} onClick={()=> setAddEditBoxOpen(!addEditBoxOpen)}>+ افزودن مسیر ارتباطی</Button>
                    <Collapse in={addEditBoxOpen}>
                        <Box sx={{backgroundColor:'#eeeeee', padding: '1rem' , marginBottom: '2.5rem'}} borderRadius={'15px'}>
                            <Typography variant={'h6'} color={'black'}>افزودن مسیر ارتباطی</Typography>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <FormControl sx={{width : '30%'}}>
                                    <InputLabel id="socialMedia-select-label">نوع*</InputLabel>
                                    <Select
                                        labelId="socialMedia-select-label"
                                        id="socialMedia-select"
                                        value={''}
                                        label="*نوع"
                                        required={true}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="لینک" variant="outlined" sx={{width : '30%'}}/>
                                <TextField label="آی دی (ID)" variant="outlined" sx={{width : '30%'}}/>
                            </Stack>

                            <Stack direction={'row'} justifyContent={'end'} sx={{marginTop: '2rem'}}>
                                <Button size={'large'} color={'inherit'} variant={'outlined'} sx={{marginLeft: '1rem' , borderRadius:'8px'}} onClick={()=>setAddEditBoxOpen(false)}>انصراف</Button>
                                <Button size={'large'} color={'warning'} variant={'contained'} sx={{borderRadius:'8px'}}>ثبت مسیر ارتباطی</Button>
                            </Stack>
                        </Box>
                    </Collapse>
                    <Grid direction={'column'} container rowSpacing={2}>
                        {connectionDataList?.map((item ) => {
                            return(
                                <Grid item>
                                    <ConnectionCard key={`connection-data-${item.id}`} id={item.id} social_id={item.social_id}
                                                    social_link={item.social_link} social_type={item.social_type} setDuty={setDuty}/>
                                </Grid>
                            )
                        })}

                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default ConnectionBox