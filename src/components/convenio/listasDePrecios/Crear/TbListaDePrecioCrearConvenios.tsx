import { Button, CardContent, Grid, InputAdornment, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Link, useParams } from "react-router-dom";
import { visuallyHidden } from '@mui/utils';
import { Contenido } from "../../../Home";
import { editAgreementApi, editPriceListApi, getPagedExaminationsApi, getExaminationsAllApi, getPriceListApi, savePriceListApi } from "../../../../api";
import { isNumeric } from "../../../../util";
import { Modal } from "@material-ui/core";
import Swal from 'sweetalert2';

export default function TbListaDePrecioCrearConvenios() {

    const { id } = useParams();

    //#region
    interface Data {
        name: string;
        precio: string;
    }
    function createData(
        name: string,
        precio: string
    ): Data {
        return {
            name,
            precio
        };
    }
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    type Order = 'asc' | 'desc';

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
            a: { [key in Key]: number | string },
            b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    interface HeadCell {
        disablePadding: boolean;
        id: any;
        label: string;
        numeric: boolean;
        disableOrder: boolean;
    }

    const headCells: readonly HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
            disableOrder: false
        },
        {
            id: 'precio',
            numeric: false,
            disablePadding: false,
            label: 'Precio',
            disableOrder: false
        },
    ];

    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
    }

    function EnhancedTableHead(props: EnhancedTableProps) {
        const { order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler =
            (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead >
                <TableRow >
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                        >
                            {headCell.disableOrder ? headCell.label :
                                <TableSortLabel style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}

                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>("");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState<any>([]);
    const [nombre, setNombre] = React.useState<any>([]);
    const [abrirGuardarPrecioConvenio, setAbrirGuardarPrecioConvenio] = React.useState<any>(false);
    const [abrirGuardarPrecioConvenioError, setAbrirGuardarPrecioConvenioError] = React.useState<any>(false);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };



    React.useEffect(() => {
        getPagedExaminationsApi(0, 1000).then((x: any) => {
            setRows(x.data)
        });
    }, []);
    
    
    console.log(rows)
    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //#endregion
    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };

    const handleClosePrecioConvenios = () => {
        setAbrirGuardarPrecioConvenio(false);
    }

    const handleClosePrecioConveniosError = () => {
        setAbrirGuardarPrecioConvenioError(false);
    }
    const editarCelda = (event: any, index: any) => {
        let aux = [...rows];

        aux[index].discountPrice = event.target.value;

        setRows(aux);
    }

    var convenioListPrice=()=>{
        Swal.fire({
            title: 'Lista de precio creada exitosamente',
            icon: 'success',
        })
    }

    var convenioExitPrice=()=>{
        Swal.fire({
            title: 'Hubo algun error al crear la lista de precio',
            icon: 'warning',
        })
    }

    var nameListPrice=()=>{
        Swal.fire({
            title: 'Ingrese el nombre la lista de precio',
            icon: 'warning',
        })
    }

    var priceListPrice=()=>{
        Swal.fire({
            title: 'Ingrese correctamente el precio',
            icon: 'warning',
        })
    }


    const crear = () => {
        if (nombre == "") {
            //alert("Ingrese el nombre")
            nameListPrice()
            return;
        }

        let aux = [...rows];
        let error= false;
        aux.forEach((e: any) => {
            e.discountPrice = e.discountPrice == undefined || e.discountPrice == "" ? 0 : e.discountPrice
            if(!isNumeric(e.discountPrice)){
                error=true;
            }
        });

        if(error){
            //alert("Ingrese correctamente el precio");
            priceListPrice()
            return;
        }

        savePriceListApi({
            AgreementId: id,
            examinations: aux,
            name: nombre
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                //setAbrirGuardarPrecioConvenio(true);
                convenioListPrice()
                window.location.href = `/apps/agreements/priceLists/${id}`
            } else {
                //alert(x.message.text);
                convenioExitPrice()
            }
        });


    }
    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container >
                        <Link to={`/apps/agreements/priceLists/${id}`}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Lista de precio</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Prueba de lista</InputLabel >
                        </Grid>
                        <Grid item xs>
                            <Button onClick={crear} variant="contained" style={{ width: '22ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 20 }} className="card-table-textField">
                            <Grid container style={{ alignItems: "center" }} spacing={1}>
                                <Grid container item mt={2} >
                                    <Grid item xs={0.5} >
                                    </Grid>
                                    <Grid item xs={11} >
                                        <TextField fullWidth id="outlined-basic" label="Nombre de la lista *" variant="outlined" value={nombre} onChange={handleChangeNombre} />
                                    </Grid>
                                    <Grid item xs={0.5} >
                                    </Grid>
                                </Grid>
                                
                                <Grid item md={12} >

                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}
                                        >
                                            <EnhancedTableHead
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onRequestSort={handleRequestSort}
                                                rowCount={rows.length}
                                            />
                    
                                            <TableBody>
                                                {stableSort(rows, getComparator(order, orderBy))
                                                    .map((row: any, index: any) => {
                                                        const labelId = `enhanced-table-checkbox-${index}`;

                                                        return (
                                                            <TableRow
                                                                hover
                                                                tabIndex={-1}
                                                                key={row.name}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                >
                                                                    {row.name}
                                                                </TableCell>
                                                                <TableCell
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                >
                                                                    <TextField id="outlined-basic" label="Ingresar precio (S/)"
                                                                        type="number"
                                                                        variant="standard" value={row.discountPrice == undefined ? "" : row.discountPrice}
                                                                        onChange={event => editarCelda(event, index)} />

                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow
                                                        style={{
                                                            height: (53) * emptyRows,
                                                        }}
                                                    >
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                                
                                            </TableBody>
                                            
                                        </Table>
                                    </TableContainer>
                                  
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </div >

                
                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPrecioConvenio}
                        onClose={handleClosePrecioConvenios}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Lista de precios creada!!!</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <Grid item xs={6} ></Grid>
                                <Grid container item xs={6} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleClosePrecioConvenios} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPrecioConvenioError}
                        onClose={handleClosePrecioConveniosError}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <Grid item xs={6} ></Grid>
                                <Grid container item xs={6} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleClosePrecioConveniosError} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


            </Contenido>
        </div>
    )
}


