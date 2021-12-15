import React from 'react';
import './App.css';
import Navbar from "./components/navbar";
import ConnectionBox from "./components/connectionBox";
import {Box, createTheme, ThemeProvider} from "@mui/material";

const rtlTheme = createTheme({ direction: "rtl" })

function App() {
    return (
        <ThemeProvider theme={rtlTheme}>
            <Box sx={{backgroundColor: '#eeeeee',width:'100%',height:'100%'}}>
                <header>
                    <Navbar/>
                </header>
                <main>
                    <ConnectionBox/>
                </main>
            </Box>
        </ThemeProvider>
    );
}

export default App;
