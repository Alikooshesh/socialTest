import {
    Box,
    Button,
    Collapse,
    Container,
    FormControl,
    Grid,
    InputLabel, ListItemIcon,
    MenuItem,
    Select,
    Stack, TextField,
    Typography
} from "@mui/material";
import {BsDot, FaTelegram, FaTwitter, GrFacebook, GrLinkedin, MdHttp, RiInstagramFill} from "react-icons/all";
import ConnectionCard from "../ConnectionCard";
import React, {useEffect, useState} from "react";
import {_addData, _editData, serverAddress} from "../../services";
import {connectionData} from "../../interfaces/dataInterface";
import {FormikValues, useFormik} from "formik";
import * as yup from 'yup';
import axios from "axios";

export interface Iduty{
    mode : 'edit' | 'refresh' | null,
    onEdit? : connectionData | null
}

const ConnectionBox = () => {
    const [duty , setDuty] = useState<Iduty>({mode : 'refresh'})
    const [connectionDataList , setConnectionDataList] = useState<connectionData[] | null>(null)
    const [addEditBoxOpen , setAddEditBoxOpen] = useState<boolean>(false)

    const refreshData = async () => {
        let _data:any = []
        axios.get(`http://${serverAddress}/socials`)
            .then(async (data) => {
                _data = await data.data.map((item:any) => {
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
                })
                setConnectionDataList([..._data])
            })
            .catch(err => {
                console.error(err)
                throw err
            })
        duty.mode === 'refresh' && setDuty({mode:null})
    }

    useEffect(()=>{
        duty && duty.mode === 'refresh' && refreshData()
        duty && duty.mode === 'edit' && formik.setValues({
            social_type: duty.onEdit?.social_type || '',
            social_id: duty.onEdit?.social_id || '',
            social_link: duty.onEdit?.social_link || '',
        })
    },[duty])

    const duplicateCheck = (type:string , id:string , link:string) => {
        let result:boolean = false
        const similarTypeData = connectionDataList?.filter(item => item.social_type === type)
        const similarIDData = similarTypeData?.filter(item => item.social_id === id)
        const similarLinkData = similarIDData?.filter(item => item.social_link === link)

        similarLinkData && similarLinkData.length > 0 ? result = true : result = false
        return result
    }

    const formik = useFormik({
        initialValues:{
            social_type : (duty.mode === 'edit' && duty?.onEdit?.social_type) || '' ,
            social_id : (duty.mode === 'edit' && duty?.onEdit?.social_id) ? duty?.onEdit?.social_id : '',
            social_link : (duty.mode === 'edit' && duty?.onEdit?.social_link) || ''
        },
        onSubmit: (values)=>{
            submitForm(values)
        },
        validationSchema : yup.object({
            social_type: yup.string().required('الزامی است')
        })
    })

    const submitForm= (values:FormikValues)=>{
        if(!duplicateCheck(values.social_type , values.social_id , values.social_link)){
            (duty.mode === 'edit' && duty.onEdit?.id) ?
                _editData(duty.onEdit?.id , {social_link : values.social_link , social_id : values.social_id}) :
                _addData({social_link : values.social_link , social_id : values.social_id})
            setDuty({mode: 'refresh'})
            refreshData()
            formik.resetForm()
        }else {
            console.error('duplicate data')
        }
    }

    return(
        <>
            {console.log({duty : duty})}
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
                    <Collapse in={duty.mode === "edit" || addEditBoxOpen}>
                        <Box sx={{backgroundColor:'#eeeeee', padding: '1rem' , marginBottom: '2.5rem'}} borderRadius={'15px'}>
                            <Typography variant={'h6'} color={'black'}>{duty.mode !== 'edit' ? 'افزودن مسیر ارتباطی' : `ویرایش مسیر ارتباطی ${duty.onEdit?.social_type}`}</Typography>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <FormControl sx={{width : '30%'}}>
                                    <InputLabel id="socialMedia-select-label">نوع*</InputLabel>
                                    <Select
                                        name={'social_type'}
                                        labelId="socialMedia-select-label"
                                        id="socialMedia-select"
                                        color={'warning'}
                                        value={formik.values.social_type}
                                        label="*نوع"
                                        required={true}
                                        onChange={formik.handleChange}
                                        error={formik.touched.social_type && Boolean(formik.errors.social_type)}
                                    >
                                        <MenuItem value={"twitter"}>
                                            <ListItemIcon>
                                                <FaTwitter/>
                                            </ListItemIcon>
                                            <span>توییتر</span>
                                        </MenuItem>
                                        <MenuItem value={"instagram"}>
                                            <ListItemIcon>
                                                <RiInstagramFill/>
                                            </ListItemIcon>
                                            <span style={{marginRight : '8px'}}>اینستاگرام</span>
                                        </MenuItem>
                                        <MenuItem value={"facebook"}>
                                            <ListItemIcon>
                                                <GrFacebook/>
                                            </ListItemIcon>
                                            <span style={{marginRight : '8px'}}>فیسبوک</span>
                                        </MenuItem>
                                        <MenuItem value={"telegram"}>
                                            <ListItemIcon>
                                                <FaTelegram/>
                                            </ListItemIcon>
                                            <span style={{marginRight : '8px'}}>تلگرام</span>
                                        </MenuItem>
                                        <MenuItem value={"linkedin"}>
                                            <ListItemIcon>
                                                <GrLinkedin/>
                                            </ListItemIcon>
                                            <span style={{marginRight : '8px'}}>لینکدین</span>
                                        </MenuItem>
                                        <MenuItem value={"webSite"}>
                                            <ListItemIcon>
                                                <MdHttp/>
                                            </ListItemIcon>
                                            <span style={{marginRight : '8px'}}>وبسایت</span>
                                        </MenuItem>
                                    </Select>
                                    <Typography>{formik.touched.social_type && formik.errors.social_type}</Typography>
                                </FormControl>
                                <TextField name={'social_link'} label="لینک" color={'warning'} variant="outlined" sx={{width : '30%'}}
                                    value={formik.values.social_link} onChange={formik.handleChange}/>
                                <TextField name={'social_id'} label="آی دی (ID)" color={'warning'} variant="outlined" sx={{width : '30%'}}
                                    value={formik.values.social_id} onChange={formik.handleChange}/>
                            </Stack>

                            <Stack direction={'row'} justifyContent={'end'} sx={{marginTop: '2rem'}}>
                                <Button size={'large'} color={'inherit'} variant={'outlined'} sx={{marginLeft: '1rem' , borderRadius:'8px'}}
                                        onClick={()=> {
                                            setAddEditBoxOpen(false)
                                            formik.resetForm()
                                            setDuty({mode:null})
                                        }}>انصراف</Button>
                                <Button size={'large'} color={'warning'} variant={'contained'} sx={{borderRadius:'8px'}} onClick={() => submitForm(formik.values)}>
                                    {duty.mode !== 'edit' ? 'ثبت مسیر ارتباطی' : `ویرایش مسیر ارتباطی ${duty.onEdit?.social_type}`}
                                </Button>
                            </Stack>
                        </Box>
                    </Collapse>
                    <Grid direction={'column'} container rowSpacing={2}>
                        {connectionDataList?.map((item ) => {
                            return(
                                <Grid key={`item-connectionCard-id-${item.id}`} item>
                                    <ConnectionCard key={`connection-data-${item.id}`} id={item.id} social_id={item.social_id}
                                                    social_link={item.social_link} social_type={item.social_type} setDuty={setDuty}
                                                    refreshData={refreshData}/>
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