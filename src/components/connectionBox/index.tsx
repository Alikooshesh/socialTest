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

const ConnectionBox = () => {
    return(
        <>
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
                    <Button sx={{borderRadius:'4px' , marginBottom:'8px'}} size={'large'} color={'warning'}>+ افزودن مسیر ارتباطی</Button>
                    <Collapse in={true}>
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
                                <Button size={'large'} color={'inherit'} variant={'outlined'} sx={{marginLeft: '1rem' , borderRadius:'8px'}}>انصراف</Button>
                                <Button size={'large'} color={'warning'} variant={'contained'} sx={{borderRadius:'8px'}}>ثبت مسیر ارتباطی</Button>
                            </Stack>
                        </Box>

                        <Grid direction={'column'} container rowSpacing={2}>
                            <Grid item>
                                <ConnectionCard/>
                            </Grid>
                            <Grid item>
                                <ConnectionCard/>
                            </Grid>
                            <Grid item>
                                <ConnectionCard/>
                            </Grid>

                        </Grid>
                    </Collapse>
                </Box>
            </Container>
        </>
    )
}

export default ConnectionBox