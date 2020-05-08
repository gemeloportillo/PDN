import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import TablaServidores from "./TablaServidores";
import DetalleServidor from "./DetalleServidor";

const axios = require('axios');
const style = theme => ({
        root: {
            maxWidth: 1200,
            margin: '0 auto',
        },
        formControl: {
            width: '100%'
        },
        inputShrink: {
            transform: `scale(1)`
        },
        button: {
            margin: theme.spacing(2),
            marginRight: theme.spacing(1),
        }
    }
);

const tiposProcedimiento = [
    {clave: 1, valor: 'Contrataciones públicas'},
    {clave: 2, valor: 'Concesiones, licencias, permisos, autorizaciones y prórrogas'},
    {clave: 3, valor: 'Enajenación de bienes muebles'},
    {clave: 4, valor: 'Asignación y emisión de dictámenes de avalúos nacionales'}
]

const camposOrdenamiento = [
    {label: 'Nombre', value: 'nombres'},
    {label: 'Apellido Uno', value: 'primerApellido'},
    {label: 'Apellido Dos', value: 'segundoApellido'},
    {label: 'Institución', value: 'institucionDependencia'},
    {label: 'Puesto', value: 'puesto'}
]

const tiposOrdenamiento = [
    {label: 'Ascendente', value: 'asc'},
    {label: 'Descendente', value: 'desc'}
]

class Buscador extends React.Component {
    constructor() {
        super();
        this.state = {
            nombres: '',
            primerApellido: '',
            segundoApellido: '',
            rfc: '',
            curp: '',
            tipoProcedimiento: [],
            institucionDependencia: "",
            campoOrden: '',
            tipoOrden: '',
            elementoSeleccionado: null,
            institucionesLista: [],
            page: 1,
            rowsPerPage: 10,
            filterData:[]
        }
    }

    componentDidMount() {
        this.loadInstituciones();
    }

    loadInstituciones = () => {
        let sug = [];
        axios.get(process.env.REACT_APP_API + 'dependencias')
            .then(data => {
                data.data.forEach((item, index) => {
                    sug.push({value: item.nombre, label: item.nombre, key: index});
                });
                this.setState({institucionesLista: sug, institucionDependencia: ''});
            }).catch(err => {
            this.setState({error: true})
        });
    }

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        }, () => {
            switch (varState) {
                case 'campoOrden':
                    if (!this.state.tipoOrden) this.setState({tipoOrden: {label: 'Ascendente', value: 'asc'}});
                    if (!event.target.value) this.setState({tipoOrden: ''})
                    break;
                case 'tipoOrden':
                    if (!this.state.campoOrden && event.target.value) this.setState({
                        campoOrden: {
                            label: 'RFC',
                            value: 'rfc'
                        }
                    });
                    if (!event.target.value) this.setState({campoOrden: ''})
                    break;
            }
        })
    };
    handleCleanAll = () => {
        this.setState(
            {
                nombres: '',
                primerApellido: '',
                segundoApellido: '',
                rfc: '',
                curp: '',
                tipoProcedimiento: [],
                institucionDependencia: "",
                campoOrden: '',
                tipoOrden: '',
                elementoSeleccionado: null,
                filterData:[]
            })
    };
    makeFiltros = () => {
        let filtros = {};
        let {institucionDependencia, nombres, primerApellido, segundoApellido, rfc, curp, tipoProcedimiento} = this.state;
        if (nombres) filtros.nombres = nombres;
        if (primerApellido) filtros.primerApellido = primerApellido;
        if (segundoApellido) filtros.segundoApellido = segundoApellido;
        if (rfc) filtros.rfc = rfc;
        if (curp) filtros.curp = curp;
        if (institucionDependencia && institucionDependencia !== '') filtros.institucionDependencia = institucionDependencia;
        if (tipoProcedimiento.length > 0) filtros.tipoProcedimiento = tipoProcedimiento.map(item => item.clave);
        return filtros;
    };
    makeSort = () => {
        let sort = {};
        if (this.state.campoOrden && this.state.tipoOrden) sort[this.state.campoOrden.value] = this.state.tipoOrden.value;
        return sort;
    };
    buscar = () => {
        this.setState({loading: true}, () => {
            let body =
                {
                    "query": this.makeFiltros(),
                    "pageSize": this.state.rowsPerPage,
                    "page": this.state.page,
                    "sort": this.makeSort()
                };

            axios.post(process.env.REACT_APP_API, body)
                .then(res => {
                    let data = res.data;
                    this.setState({
                        filterData: data.results,
                        loading: false,
                        totalRows: data.pagination.totalRows,
                        error: false
                    },)
                }).catch(err => {
                this.setState({loading: false, error: true});
            });
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page:page+1}, () => {
            this.buscar();
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, page: 1}, () => {
            this.buscar();
        });
    };
    verDetalle = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento});
    };
    handleChangeDetail = () => {
        this.setState({elementoSeleccionado: null});
    };
    render() {
        const {classes} = this.props;
        const {nombres, primerApellido, segundoApellido, rfc, curp, institucionDependencia, campoOrden, tipoOrden, institucionesLista, tipoProcedimiento} = this.state;
        return (
            <div>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} paragraph color={"primary"} align={"center"}>
                            <b>Busca servidores públicos que intervienen en contrataciones, concesiones, enajenaciones y
                                dictámenes</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph color={"textPrimary"}>
                            Llena o selecciona los filtros que desees y pulsa el botón <b>Buscar</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Nombre(s)"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('nombres', e)}
                                value={nombres}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Primer apellido"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('primerApellido', e)}
                                value={primerApellido}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Segundo apellido"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('segundoApellido', e)}
                                value={segundoApellido}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="institucionDependencia-label">
                                Institución
                            </InputLabel>
                            <Select value={institucionDependencia}
                                    onChange={(e) => this.handleChangeCampo('institucionDependencia', e)}
                                    displayEmpty
                            >
                                <MenuItem value="" key={-1}><em>Cualquiera</em></MenuItem>
                                {
                                    institucionesLista.map((item => {
                                        return <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    }))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="tipoSancion-label">Tipo procedimiento</InputLabel>
                            <Select displayEmpty
                                    id="tipoSancion-checkbox"
                                    multiple
                                    value={tipoProcedimiento}
                                    onChange={e => this.handleChangeCampo('tipoProcedimiento', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Cualquiera</em>;
                                            }
                                            return selected.map(element => element.valor).join(', ')
                                        }
                                    }

                            >
                                <MenuItem disabled value={[]}>
                                    <em>Cualquiera</em>
                                </MenuItem>
                                {tiposProcedimiento.map(tipo => (
                                    <MenuItem key={tipo.clave} value={tipo}>
                                        <Checkbox checked={tipoProcedimiento.indexOf(tipo) > -1}/>
                                        <ListItemText primary={tipo.valor}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="curp"
                                label="CURP"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('curp', e)}
                                value={curp}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="rfc"
                                label="RFC"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('rfc', e)}
                                value={rfc}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="campoOrden-label">Ordenar por</InputLabel>
                            <Select displayEmpty
                                    id="campoOrden-checkbox"
                                    value={campoOrden}
                                    onChange={e => this.handleChangeCampo('campoOrden', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Ninguno</em>;
                                            }
                                            return selected.label
                                        }
                                    }
                            >
                                <MenuItem value={''}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {camposOrdenamiento.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="tipoOrden-label">Tipo ordenamiento</InputLabel>
                            <Select displayEmpty
                                    id="tipoOrden-checkbox"
                                    value={tipoOrden}
                                    onChange={e => this.handleChangeCampo('tipoOrden', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Ninguno</em>;
                                            }
                                            return selected.label
                                        }
                                    }

                            >
                                <MenuItem value={''}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {tiposOrdenamiento.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="right">
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={this.handleCleanAll}>
                            Limpiar
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.buscar}>
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
                {/*TABLA*/}
                {this.state.filterData && this.state.filterData.length > 0 && this.state.elementoSeleccionado === null &&
                <Grid container className={classes.root}>
                    <Grid item xs={12} >
                        <TablaServidores data={this.state.filterData} page={this.state.page}
                                                    rowsPerPage={this.state.rowsPerPage}
                                                    totalRows={this.state.totalRows}
                                                    handleChangePage={this.handleChangePage}
                                                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    verDetalle={this.verDetalle}/>
                    </Grid>
                </Grid>
                }
                {/*Detalle*/}
                {
                    this.state.elementoSeleccionado !== null &&
                    <DetalleServidor handleChangeDetail={this.handleChangeDetail}
                                               servidor={this.state.elementoSeleccionado}
                    />
                }
            </div>

        );
    }
}


export default (withStyles(style)(Buscador));