import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        backgroundColor: "white",
        marginBottom: theme.spacing(8)
    },
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2)
    },
    cuadroActualizacion: {
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
        fontWeight: "bold",
        padding: "5px 10px"
    },
    titulo: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        textDecoration: "underline",
        textDecorationColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark,
    },
    tituloCard: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 10
    },
    dataCard: {
        fontSize: 14,
        paddingBottom: 10,
        marginBottom: 10,
        paddingLeft: 20
    },
    divider: {
        backgroundColor: theme.palette.primary.dark,
        height: theme.spacing(1)
    },
    btnBack: {
        color: theme.palette.primary.dark,
    },
    container: {
        maxWidth: '1200px',
        margin: "0 auto"
    }
});

class DetalleServidor extends React.Component {
    render() {
        const {classes, handleChangeDetail, servidor} = this.props;
        return (
            <Grid container spacing={0} className={classes.infoBusqueda}>
                <Grid item xs={12} className={classes.container}>
                    <Paper className={classes.paper} elevation={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography style={{textAlign: "right"}}>
                                <span className={classes.cuadroActualizacion}>
                                  Actualización:{" "}{servidor.fechaCaptura}
                                </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant={"h6"}>
                                    {servidor.nombres}{" "}{servidor.primerApellido}{" "}{servidor.segundoApellido}
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.puesto.nombre}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className={classes.tituloCard}>
                                    Dependencia
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.institucionDependencia.nombre}{servidor.institucionDependencia.siglas ? '(' + servidor.institucionDependencia.siglas + ')' : ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} variant={"middle"}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.titulo} align={"center"}>
                                    Información del servidor y su participación
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Ejercicio fiscal
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.ejercicioFiscal}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Ramo
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.ramo? servidor.ramo.valor:'Dato no proporcionado'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Tipo procedimiento
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.tipoProcedimiento? servidor.tipoProcedimiento.map(element => element.valor).join(', '):"Dato no proporcionado"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Tipo área
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.tipoArea? servidor.tipoArea.map(element => element.valor).join(', '):"Dato no proporcionado"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Nivel Responsabilidad
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.nivelResponsabilidad ? servidor.nivelResponsabilidad.map(element => element.valor).join(', '):"Dato no proporcionado"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.titulo} align={"center"}>
                                    Información del superior
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Nombre
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.superiorInmediato?servidor.superiorInmediato.nombres+" "+(servidor.superiorInmediato.primerApellido?servidor.superiorInmediato.primerApellido:'')+" "+(servidor.superiorInmediato.segundoApellido?servidor.superiorInmediato.segundoApellido:''):"Dato no proporcionado"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography className={classes.tituloCard}>
                                    Puesto
                                </Typography>
                                <Typography className={classes.dataCard}>
                                    {servidor.superiorInmediato && servidor.superiorInmediato.puesto ? servidor.superiorInmediato.puesto.nombre: "Dato no proporcionado"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{textAlign: 'right'}}>
                                <Button className={classes.btnBack} onClick={() => handleChangeDetail()}
                                        startIcon={<ArrowBackIosIcon/>}
                                >Regresar</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

DetalleServidor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetalleServidor);