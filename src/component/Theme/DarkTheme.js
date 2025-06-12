import { createTheme } from "@mui/material";

export const style={
    background:'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
}

export const darkTheme=createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#FF5722", // Use a solid color for primary

        },  
        secondary:{
            main:"#5A20CB"
        },
        black:{
            main:"#242B2E"
        },
        background:{
            main:"#000000",
            default:"#0D0D0D",
            // paper:"0D0D0D"
        },
        textColor:{
            main:"#111111"
        }

    }
})