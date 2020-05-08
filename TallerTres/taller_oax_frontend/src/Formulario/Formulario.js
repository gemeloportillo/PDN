import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "../Header/Header";
import Typography from "@material-ui/core/Typography";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import DatosSuperior from "./DatosSuperior";
import DatosServidor from "./DatosServidor";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const axios = require('axios');

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

let registroNuevo = {
    fechaCaptura: new Date(),
    ejercicioFiscal: 2020,
    ramo: '',
    rfc: "",
    curp: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    genero: '',
    institucionDependencia: '',
    puesto: '',
    tipoArea: [],
    nivelResponsabilidad: [],
    tipoProcedimiento: [],
    superiorInmediato: {
        nombres: "",
        primerApellido: "",
        segundoApellido: "",
        curp: "",
        rfc: "",
        puesto: ''
    }
};

let regRFC = new RegExp('^$|^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\\d]{3})$');
let regCURP = new RegExp('^$|^([A-Z][AEIOUX][A-Z]{2}\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\\d])(\\d)$')

class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: ['Datos del Servidor Público', 'Datos del superior', 'Agregar'],
            skipped: new Set(),
            registro: registroNuevo,
            error: false
        }
    }

    handleChangeCampo = (campo, evento) => {
        let newVal = evento.target ? evento.target.value : evento.value;
        this.setState(prevState => {
            return {
                ...prevState,
                registro: {
                    ...prevState.registro,
                    [campo]: newVal
                }
            }
        })
    };

    handleChangeObject = (campo, val) => {
        let atributo = this.state.registro[campo];
        if (Array.isArray(atributo)) {
            if (atributo.indexOf(val) === -1) {//No esta->se agrega
                atributo.push(val)
            } else {
                atributo.splice(atributo.indexOf(val), 1)
            }
        } else {
            atributo = val;
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                registro: {
                    ...prevState.registro,
                    [campo]: atributo
                }
            }
        })
    }

    handleChangeSuperior = (campo, evento) => {
        let newVal = evento.target ? evento.target.value : evento.value;
        this.setState(prevState => {
            return {
                ...prevState,
                registro: {
                    ...prevState.registro,
                    superiorInmediato: {
                        ...prevState.registro.superiorInmediato,
                        [campo]: newVal
                    }
                }
            }
        })
    }

    isStepOptional = step => {
        return step === 1;
    };

    isStepSkipped = step => {
        return this.state.skipped.has(step);
    };

    handleNext = () => {
        let newSkipped = this.state.skipped;
        if (this.isStepSkipped(this.state.activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(this.state.activeStep);
        }

        this.setState((prevState) => {
            return {
                activeStep: prevState.activeStep + 1
            }
        });
        this.setState(newSkipped);
    };

    handleBack = () => {
        this.setState((prevState) => {
            return {
                activeStep: prevState.activeStep - 1
            }
        })
    };

    handleSkip = () => {
        if (!this.isStepOptional(this.state.activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState((prevState) => {
            return {
                activeStep: prevState.activeStep + 1,
                skipped: new Set(prevState.skipped.values()).add(prevState.activeStep + 1)
            }
        });

    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            registro: JSON.parse(JSON.stringify(registroNuevo))
        })
    };

    isValido = () => {
        let valido = true;
        let {registro} = this.state;
        if (!registro.nombres || !registro.primerApellido || !registro.institucionDependencia || !registro.puesto || registro.tipoProcedimiento.length === 0 ||
            registro.rfc.match(regRFC) == null || registro.curp.match(regCURP) == null
        )
            valido = false;
        return valido;
    }

    limpiaRegistro=(obj) =>{
        let objeto = obj? obj : this.state.registro;
        let propiedades = Object.keys(objeto);
        let objetoLimpio = {};

        for(let c = 0; c<= propiedades.length;c++){
            let propiedad = propiedades[c];
            if(objeto[propiedad]){
                if(propiedad === 'superiorInmediato'){
                    let si = this.limpiaRegistro(objeto[propiedad])
                    if(Object.keys(si).length>0)
                        objetoLimpio[propiedad] = si;
                }
                else if(Array.isArray(objeto[propiedad]) && objeto[propiedad].length>0)
                    objetoLimpio[propiedad] = objeto[propiedad]
                else if(!Array.isArray(objeto[propiedad]))
                    objetoLimpio[propiedad] = objeto[propiedad]
            }
        }
        return objetoLimpio
    }
    handleSave = () => {
        if (this.isValido()) {
            let registro = this.limpiaRegistro()
            axios.post(process.env.REACT_APP_API+'create',
                registro
            ).then(response => {
                this.handleNext();
            }).catch(error => {
                this.setState({
                    error: true,
                    mensajeError: error.message ? error.message : "Error al guardar el registro"
                })
            })
        } else {
            this.setState({
                error: true,
                mensajeError: 'Los campos marcados con asterisco son requeridos. En caso de introducir RFC y/o CURP deben ser valores válidos.'
            })
        }
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DatosServidor registro={this.state.registro} handleChange={this.handleChangeCampo}
                                      handleChangeObject={this.handleChangeObject}/>;
            case 1:
                return <DatosSuperior superior={this.state.registro.superiorInmediato}
                                      handleChange={this.handleChangeSuperior}/>;
            case 2:
                return 'Pulsa el botón Guardar para salvar el registro.';
            default:
                return 'No permitido';
        }
    }

    handleClose = () => {
        this.setState({
            error: false
        })
    }

    render() {
        const {classes} = this.props;
        const {activeStep, steps} = this.state;
        return (
            <div>
                <Header/>
                <Grid container className={this.props.classes.root}>
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
                </Grid>
                <Paper elevation={3} className={classes.paper}>
                        <Stepper activeStep={activeStep}>
                            {this.state.steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (this.isStepOptional(index)) {
                                    labelProps.optional = <Typography variant="caption">Opcional</Typography>;
                                }
                                if (this.isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>
                                        Registro guardado correctamente!
                                    </Typography>
                                    <Button onClick={this.handleReset} className={classes.button}>
                                        Nuevo
                                    </Button>
                                </div>
                            ) : (
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        {this.getStepContent(activeStep)}
                                    </Grid>
                                    <Grid item md={6}/>
                                    <Grid item xs={12} md={6} className={classes.botonera}>
                                        <Button disabled={activeStep === 0} onClick={this.handleBack}
                                                className={classes.boton}>
                                            Atrás
                                        </Button>
                                        {this.isStepOptional(activeStep) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSkip}
                                                className={classes.boton}
                                            >
                                                Saltar
                                            </Button>
                                        )}

                                        {
                                            (activeStep === steps.length - 1) ? <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleSave}
                                                    className={classes.boton}
                                                >
                                                    Guardar
                                                </Button> :
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.boton}
                                                >
                                                    Siguiente
                                                </Button>
                                        }
                                    </Grid>
                                </Grid>
                            )}
                        </div>

                    <Dialog
                        open={this.state.error}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.mensajeError}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

export default (withStyles(style)(Formulario));