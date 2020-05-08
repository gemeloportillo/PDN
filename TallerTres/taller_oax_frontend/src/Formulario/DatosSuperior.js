import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import {puestos} from './catalogos';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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


class DatosSuperior extends React.Component {
    render() {
        const {classes, superior, handleChange} = this.props;
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"superiorNombre"} label={"Nombre"} value={superior.nombres} onChange={(e)=>handleChange('nombres',e)}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"superiorApellidioUno"} label={"Apellido paterno"} value={superior.primerApellido} onChange={(e)=>handleChange('primerApellido',e)}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"superiorAppellidoDos"} label={"Apellido materno"} value={superior.segundoApellido} onChange={(e)=>handleChange('segundoApellido',e)}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"superiorCURP"} label={"CURP"} value={superior.curp} onChange={(e)=>handleChange('curp',e)}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField className={classes.field} id={"superiorRFC"} label={"RFC"} value={superior.rfc} onChange={(e)=>handleChange('rfc',e)}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.field}>
                        <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                        <Select
                            labelId="puesto-label"
                            id="puesto"
                            value={superior.puesto}
                            onChange={(e)=>handleChange('puesto',e)}
                        >
                            {
                                puestos.map((puesto)=>{
                                    return  <MenuItem key={puesto.nivel} value={puesto}>{puesto.nombre}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}

export default (withStyles(style)(DatosSuperior));