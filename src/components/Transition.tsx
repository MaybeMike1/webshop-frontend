import { Fade } from "@mui/material";
import React, { ReactElement } from "react";

interface FadeProps {
    children : ReactElement;
}


export const Transition : React.FC<FadeProps> = (props) => {
    return (
        <Fade in={true}>
            {props.children}
        </Fade>
    )
}
