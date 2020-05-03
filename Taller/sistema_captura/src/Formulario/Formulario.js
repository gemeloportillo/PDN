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

    //Petición HTTP: Si la función isValido retorna un verdadero, se hace la llamada al API para almacenar los datos
    //               Si retorna false muestra un mensaje de error, asignando true al atributo error y el mensaje correspondiente
    handleSave = () => {
        if (this.isValido()) {
            //Guardar el registro
            //.post *La petición será de tipo POST.
            //.then(response) *Si es exitosa se ejecuta esta función y la respuesta estará encapsulada en response. 
            //.catch(error) *Si la petición no es exitosa se ejecuta esta función y el error estará encapsulado en error.
            //url 'http://localhost:3200/v1/spic/create' *Url donde se está ejecutando el API (back).
            //body: el API espera en el body el registro que se va a almacenar, ese registro será devuelto por la función this.limpiaRegistro()
            axios.post('http://localhost:3000/v1/spic/create',
                this.limpiaRegistro()
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
    
    //En caso de que un atributo no tenga valor, o que sea un arreglo y se encuentre vacio, no se envía para almacenarse.
    //Tratandose del superiorInmediato, en caso de que ninguno de sus atributos tenga valor, deberá omitirse su envío.
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

    //Validaciones: Retorna un booleano que indica si el formulario es válido o no, es decir, si los campos que son requeridos
    //han sido capturados y en caso de haber introducido RFC y/o CURP valida que tenga el formato correcto
    isValido = () => {
        let valido = true;
        let {registro} = this.state;
        if(!registro.nombres || !registro.primerApellido || !registro.institucionDependencia || !registro.puesto || registro.tipoProcedimiento.length===0 ||
            registro.rfc.match(regRFC)== null || registro.curp.match(regCURP)== null
        )
            valido = false;
        return valido;
    }



    //Alertas: Resultado de las validaciones mostramos mensajes para informar al usuario lo ocurrido.
    //Se utiliza el componente Dialog de MaterialUI   
    //      Manejador para cerrar el diálogo: Agrega al state los atributos error igual a false
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
