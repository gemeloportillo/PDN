import React from 'react';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from "@material-ui/core/Grid";
import Banner from "../assets/banner.jpg";
import Header from "../Header/Header";


const style = theme => ({
    root: {
        maxWidth: 1200,
        margin: '0 auto',
    },
    paper: {
        padding: theme.spacing(3),
        maxWidth: 1200,
        margin: '0 auto',
        marginBottom: theme.spacing(8)
    },
    field: {
        width: '100%'
    },
    botonera: {
        textAlign: "right"
    },
    boton: {
        margin: theme.spacing(2)
    }

});

class Formulario extends React.Component{
    render() {
        const {classes} = this.props;
        //const {activeStep, steps} = this.state;
        return (
            <div>
                <Header/>
                <Grid container className={classes.root}>
                <Paper elevation={3}className={classes.paper} >
                    <Grid item xs={12}>
                        <Typography variant={"h6"} paragraph color={"primary"} align={"center"}>
                            <b>Formulario de captura</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph color={"textPrimary"}>
                            Registra a los servidores que intervienen en procesos de contrataciones públicas, el
                            otorgamiento de licencias, permisos, concesiones y autorizaciones, así
                            como en la enajenación de bienes muebles, así como en la emisión de dictámenes de avalúos y
                            justipreciación de rentas.
                        </Typography>
                        <Typography paragraph color={"textPrimary"}>
                            <b>Instrucciones:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography color="textPrimary" display='inline'>
                                    Captura la información solicitada:
                                </Typography>
                                <ul className={classes.ul}>
                                    <li className={classes.li}>
                                        <Typography color="textPrimary" display='inline'>
                                            En área, selecciona las áreas en las que participa el servidor público a
                                            registrar
                                        </Typography>
                                    </li>
                                    <li className={classes.li}>
                                        <Typography color="textPrimary" display='inline'>
                                            En nivel de responsabilidad, selecciona aquellos que tenga el servidor
                                            público a registrar
                                        </Typography>
                                    </li>
                                    <li className={classes.li}>
                                        <Typography color="textPrimary" display='inline'>
                                            En Tipo procedimiento, selecciona los tipos de procedimientos en los que
                                            haya podido particpar el servidor público a registrar
                                        </Typography>
                                    </li>
                                </ul>
                            </li>
                            <li className={classes.li}>
                                <Typography color="textPrimary" display='inline'>
                                    Pulsa el botón "Enviar"
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                </Paper>
                </Grid>
            </div>
        );
    }
}

export default (withStyles(style)(Formulario));
