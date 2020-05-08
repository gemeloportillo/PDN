import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core"
import TableHead from "@material-ui/core/TableHead";

const styles = theme => ({
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px',
        padding: theme.spacing(1),
        maxWidth: '1200px',
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    container1: {
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
        maxWidth: '1200px',
        overflowX: 'auto',
        padding: theme.spacing(1)
    },
    container2: {
        display: 'tableCell',
        overflowX: 'auto',
        width: '100%'
    }
});

const columnData = [
    {id: 'nombres', label: 'Nombres'},
    {id: 'primerApellido', label: 'Primer apellido'},
    {id: 'segundoApellido', label: 'Segundo apellido'},
    {id: 'institucion.nombre', label: 'Institución/Dependencia'},
    {id: 'tipoProcedimiento', label: 'Tipo procedimiento'}
];

class TablaServidores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, data, rowsPerPage, page, totalRows} = this.props;
        return (

            <Grid container justify='center' spacing={0} className={classes.gridTable} id={'containerTest'}>
                {
                    data && data.length > 0 &&
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                    </Grid>
                }

                <Grid item xs={12} className={classes.container1}>
                    <div className={classes.container2}>
                        {
                            data && data.length > 0 &&
                            <Table>
                                <TableHead style={{backgroundColor: '#f5f5f5'}}>
                                    <TableRow>
                                        {
                                            columnData.map(column => {
                                                return (
                                                    <TableCell key={column.id}>
                                                        <Typography className={classes.tableHead}
                                                                    variant={"body1"}>
                                                            {column.label}
                                                        </Typography>
                                                    </TableCell>
                                                );
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.props.verDetalle(event, n)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell component="th" scope="row"
                                                           padding="default">{n.nombres}</TableCell>
                                                <TableCell>{n.primerApellido}</TableCell>
                                                <TableCell>{n.segundoApellido}</TableCell>
                                                <TableCell>{n.institucionDependencia.nombre}</TableCell>
                                                <TableCell
                                                    style={{width: '25%'}}>{n.tipoProcedimiento.map(e => e.valor).join(', ')}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            className={classes.tablePagination}
                                            colSpan={5}
                                            count={totalRows}
                                            rowsPerPage={rowsPerPage}
                                            page={page - 1}
                                            onChangePage={this.props.handleChangePage}
                                            onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                                            labelRowsPerPage='Registros por página'
                                            labelDisplayedRows={({from, to, count}) => {
                                                return `${from}-${to} de ${count}`;
                                            }}
                                            rowsPerPageOptions={[10, 25, 50]}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        }
                    </div>
                </Grid>
            </Grid>

        )
            ;
    }
}


export default withStyles(styles)(TablaServidores);
