import { Button, CardContent, Grid, InputAdornment, InputLabel,Modal, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Link, useParams } from "react-router-dom";
import { visuallyHidden } from '@mui/utils';
import { Contenido } from "../../../Home";
import { editAgreementApi, editPriceListApi, getPagedExaminationsApi, getExaminationsAllApi, getPriceListApi } from "../../../../api";
import PaidIcon from '@mui/icons-material/Paid';
import TbListaDePrecioConvenios from "../TbListaDePrecioConvenios";
import { isNumeric } from "../../../../util";
import Swal from 'sweetalert2';

export default function TbListaDePrecioEditarConvenios() {

    const { id, idlista } = useParams();

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
    const [rows2, setRows2] = React.useState<any>([]);
    const [rows3, setRows3] = React.useState<any>([]);
    const [nombre, setNombre] = React.useState<any>([]);
    const [abrirUpdateListaPrecio, setAbrirActualizarListaPrecio] = React.useState<any>(false);


    const handleCloseAbrirActualizarListaPrecio = () => {
        setAbrirActualizarListaPrecio(false);
    }
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
        width: 490,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {

        getPriceListApi(id).then((x: any) => {
            setNombre(x.data.name)
            setRows2(x.data.examinations)
            if (x.data.examinations.length == 0) {
                getPagedExaminationsApi(0, 1000).then((y: any) => {
                    setRows(y.data)
                });
            } else {
                setRows(x.data.examinations)
            }
        });
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    console.log(rows2)
    rows.sort((a: any, b: any) => (
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
    )


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    //#endregion
    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };

    const editarCelda = (event: any, index: any) => {
        let aux = [...rows];
        aux[index].discountPrice = event.target.value;
        setRows(aux);
    }

    var convenioListPrice=()=>{
        Swal.fire({
            title: 'Lista de precio editada exitosamente',
            icon: 'success',
        })
    }

    var convenioExitPrice=()=>{
        Swal.fire({
            title: 'Hubo algun error al editar la lista de precio',
            icon: 'warning',
        })
    }

    var priceListPrice=()=>{
        Swal.fire({
            title: 'Ingrese correctamente el precio',
            icon: 'warning',
        })
    }

    const ruta = idlista;
    const modificar = () => {
        let aux = [...rows];
        let error = false;
        aux.forEach((e: any) => {
            e.discountPrice = e.discountPrice == undefined || e.discountPrice == "" ? 0 : e.discountPrice
            if (!isNumeric(e.discountPrice)) {
                error = true;
            }
        });
        if (error) {
            //alert("Ingrese correctamente el precio");
            priceListPrice()
            return;
        }
        editPriceListApi(id, {
            examinations: aux,
            name: nombre
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                //setAbrirActualizarListaPrecio(true)
                convenioListPrice()
                window.location.href = `/apps/agreements/priceLists/${ruta}`
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
                    <Grid container item>
                        <Link to={`/apps/agreements/priceLists/${ruta}`}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Lista de precio</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1}>
                        <Grid item md={3}>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Prueba de lista</InputLabel >
                        </Grid>
                        <Grid item xs md={6} >
                            <Grid item xs={11} >
                                <TextField fullWidth
                                    placeholder="Ingrese nombre de lista"
                                    id="outlined-basic"
                                    variant="outlined" value={nombre}
                                    onChange={handleChangeNombre}
                                    InputProps={{
                                        style: {
                                            backgroundColor: "white",
                                            color: "black",
                                            cursor: "pointer",
                                            borderStyle: "revert",
                                            borderColor: "#039be5",
                                            borderWidth: "0.1px",
                                            maxWidth: "320px"
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem", paddingLeft: "4px", cursor: "pointer" }} >Lista/Nombre :</InputLabel >
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs md={3} mt={1.5}>
                            <Button onClick={modificar} variant="contained" style={{ width: '22ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 20 }} className="card-table-textField">
                            <Grid container style={{ alignItems: "center" }} spacing={1}>
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
                                                                        type="number" variant="standard" value={row.discountPrice}
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
                        open={abrirUpdateListaPrecio}
                        onClose={handleCloseAbrirActualizarListaPrecio}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} > Lista de precio actualizada!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirActualizarListaPrecio} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
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


