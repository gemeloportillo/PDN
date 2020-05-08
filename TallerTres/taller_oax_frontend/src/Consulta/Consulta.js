import React from 'react';
import Banner from "../assets/banner.jpg";
import {withStyles} from "@material-ui/core/styles";
import Header from "../Header/Header";
import Buscador from "./Buscador";

const style = theme => ({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(5)
        },
        root2: {
            flexGrow: 1
        },
        space: {
            flexGrow: 1,
        },
        toolbar: {
            maxWidth: 1200,
        },
        container1: {
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            position: 'relative',
            backgroundImage: `url(${Banner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
        },
        item2: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        whiteText: {
            color: theme.palette.white
        }
    }
);
class Consulta extends React.Component{
    render() {
        return (
            <div>
                <Header/>
                <Buscador/>
            </div>
        )
    }
}

export default (withStyles(style)(Consulta));
