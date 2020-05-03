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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import DatosServidor from "./DatosServidor";
import DatosSuperior from "./DatosSuperior";



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

class Formulario extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: ['Datos del Servidor Público', 'Datos del superior', 'Agregar'],
            skipped: new Set(),
            registro: registroNuevo,
        }
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
    handleSave = () => { }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DatosServidor registro={this.state.registro} handleChange={this.handleChangeCampo}
                                      handleDates={this.handleChangeDates}
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
         
    render() {
        const {classes} = this.props;
        const {activeStep, steps} = this.state;
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
                <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (this.isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">                Opcional</Typography>;
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

                </Grid>
            </div>
        );
    }
}

export default (withStyles(style)(Formulario));
