import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
    ramos,
    generos,
    puestos,
    dependencias,
    tiposArea,
    tiposProcedimiento,
    nivelesResponsabilidad
} from './catalogos';

const style = theme => ({
    root: {
        maxWidth: 1200,
        margin: '0 auto',
    },
    paper: {
        padding: theme.spacing(3),
        maxWidth: 1200,
        margin: '0 auto',
    },
    field: {
        width: '100%'
    }
});

let regRFC = new RegExp('^$|^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\\d]{3})$');
let regCURP = new RegExp('^$|^([A-Z][AEIOUX][A-Z]{2}\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\\d])(\\d)$')

class DatosServidor extends React.Component {
    render() {
        const {classes, registro, handleChange, handleChangeObject} = this.props;
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.field} >
                        <InputLabel id="ejercicioFiscal-label">Ejercicio fiscal</InputLabel>
                        <Select
                            labelId="ejercicioFiscal-label"
                            id="ejercicioFiscal"
                            value={registro.ejercicioFiscal}
                            onChange={(e) => handleChange('ejercicioFiscal', e)}
                        >
                            <MenuItem value={2018}>2018</MenuItem>
                            <MenuItem value={2019}>2019</MenuItem>
                            <MenuItem value={2020}>2020</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.field}>
                        <InputLabel id="demo-simple-select-label">Ramo</InputLabel>
                        <Select
                            labelId="ejercicioFiscal-label"
                            id="ejercicioFiscal"
                            value={registro.ramo}
                            onChange={(e) => {
                                handleChange('ramo', e)
                            }}
                        >
                            {
                                ramos.map((ramo) => {
                                    return <MenuItem key={ramo.clave} value={ramo}>{ramo.valor}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl required className={classes.field} error={!registro.institucionDependencia} >
                        <InputLabel id="dependencia-label">Dependencia</InputLabel>
                        <Select
                            labelId="dependencia-label"
                            id="dependencia"
                            value={registro.institucionDependencia}
                            onChange={(e) => {
                                handleChange('institucionDependencia', e)
                            }}
                        >
                            {
                                dependencias.map((dep) => {
                                    return <MenuItem key={dep.clave} value={dep}>{dep.nombre}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField required className={classes.field} id={"nombre"} label={"Nombre"}
                               value={registro.nombres}
                               onChange={(e) => handleChange('nombres', e)}
                               error={!registro.nombres || registro.nombres.trim().length === 0}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField required className={classes.field} id={"apellidoUno"} label={"Apellido paterno"}
                               value={registro.primerApellido} onChange={(e) => handleChange('primerApellido', e)}
                               error={!registro.primerApellido || registro.primerApellido.trim().length === 0}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"apellidoDos"} label={"Apellido materno"}
                               value={registro.segundoApellido} onChange={(e) => handleChange('segundoApellido', e)}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"rfc"} label={"RFC"} value={registro.rfc}
                               onChange={(e) => handleChange('rfc', e)}
                               error={registro.rfc.match(regRFC) == null}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"curp"} label={"CURP"} value={registro.curp}
                               onChange={(e) => handleChange('curp', e)}
                               error={registro.curp.match(regCURP) == null}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl required className={classes.field} error={!registro.puesto}>
                        <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                        <Select
                            labelId="puesto-label"
                            id="puesto"
                            value={registro.puesto}
                            onChange={(e) => handleChange('puesto', e)}
                        >
                            {
                                puestos.map((puesto) => {
                                    return <MenuItem key={puesto.nivel} value={puesto}>{puesto.nombre}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Género</FormLabel>
                        <RadioGroup aria-label="genero" name="genero" row value={registro.genero}>
                            {generos.map((genero) => (
                                <FormControlLabel key={genero.clave} control={<Radio/>} label={genero.valor}
                                                  value={genero} onChange={(e) => {
                                    handleChangeObject('genero', genero)
                                }}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl required component="fieldset" className={classes.formControl}
                                 error={registro.tipoProcedimiento.length === 0}>
                        <FormLabel component="legend">Tipo procedimiento</FormLabel>
                        <FormGroup>
                            {
                                tiposProcedimiento.map(tp => {
                                    return (<FormControlLabel key={tp.clave}
                                                              control={<Checkbox
                                                                  checked={registro.tipoProcedimiento.indexOf(tp) > -1}
                                                                  value={tp}
                                                                  onChange={(e) => handleChangeObject('tipoProcedimiento', tp)}/>}
                                                              label={tp.valor}
                                    />)
                                })
                            }
                        </FormGroup>
                        <FormHelperText>Selecciona los tipos de procedimientos en los que puede participar el
                            SP</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Área</FormLabel>
                        <FormGroup>
                            {
                                tiposArea.map(ta => {
                                    return (<FormControlLabel key={ta.clave}
                                                              control={<Checkbox
                                                                  checked={registro.tipoArea.indexOf(ta) > -1}
                                                                  value={ta}
                                                                  onChange={(e) => handleChangeObject('tipoArea', ta)}/>}
                                                              label={ta.valor}
                                    />)

                                })
                            }
                        </FormGroup>
                        <FormHelperText>Selecciona los tipos de área en los que participa el SP</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Nivel responsabilidad</FormLabel>
                        <FormGroup>
                            {
                                nivelesResponsabilidad.map(nr => {
                                    return (<FormControlLabel key={nr.clave}
                                                              control={<Checkbox
                                                                  checked={registro.nivelResponsabilidad.indexOf(nr) > -1}
                                                                  value={nr}
                                                                  onChange={(e) => handleChangeObject('nivelResponsabilidad', nr)}/>}
                                                              label={nr.valor}
                                    />)

                                })
                            }
                        </FormGroup>
                        <FormHelperText>Selecciona los niveles de responsabilidad del SP</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }

}

export default (withStyles(style)(DatosServidor));