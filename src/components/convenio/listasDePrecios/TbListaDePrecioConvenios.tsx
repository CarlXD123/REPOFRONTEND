import { Button, CardContent, Modal, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { editAgreementApi,getAgreementsApi, getPriceListApi, deletePriceListApi, deleteAppointmentApi,deleteAgreementApi, getAgreementApi, editPriceListApi,getAgreementsListPriceApi, getTypeAgreementsAllApi, saveAgreementApi } from "../../../api";
import { Link, useParams } from "react-router-dom";
import { visuallyHidden } from '@mui/utils';
import Swal from 'sweetalert2';

export default function TbListaDePrecioConvenios() {

    const { id } = useParams();

    //#region
    interface Data {
        name: string;
        options: string;
    }
    function createData(
        name: string,
        options: string
    ): Data {
        return {
            name,
            options
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
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Opciones',
            disableOrder: true
        }
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
    const [nombreListaPrecio, setNombreListaPrecio] = React.useState<any>([]);
    const [idBorrar, setId] = React.useState<any>("");
    const [eliminarPriceList, setEliminarPriceList] = React.useState<any>(false);
    const [eliminarErrorPriceList, setEliminarErrorPriceList] = React.useState<any>(false);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleCloseEliminarPriceList = () => {
        setEliminarPriceList(false);
    }

    const handleCloseErrorEliminarPriceList = () => {
        setEliminarErrorPriceList(false);
    }

    var convenioList=()=>{
        Swal.fire({
            title: 'Lista de precio eliminada exitosamente',
            icon: 'success',
        })
    }

    var convenioExit=()=>{
        Swal.fire({
            title: 'Hubo algun error al eliminar la lista de precio',
            icon: 'warning',
        })
    }

    //const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

    const handleDelete = async (id: any, id2: any) => {
    console.log(id);
    //var opcion = window.confirm("Desea eliminar la lista de precio "+ id + " del convenio? "+nombre)
    var DeletePriceList=()=>{
        Swal
        .fire({
            title: "Desea eliminar la lista de precio: "+ id2+" del convenio: "+nombre+" ?",
            showCancelButton: true,
            cancelButtonColor: '#0C3DA7',
            confirmButtonColor: '#FB0909',
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                try {
                    let aux = rows
                    setRows([])
                    //await sleep(50)
                    setRows(aux)
                    
                    deletePriceListApi(id).then((x: any) => {
                        setId(x.data.id)
                    });
            
                    editPriceListApi(id, {
                        examinations: aux,
                        status: 'E'
                    })
            
                    setRows(aux.filter((row: any) => row.id !== id));
                  } catch(error) {
                       console.error(error)
                       //setEliminarErrorPriceList(true);
                       convenioExit()
                  }
                  //setEliminarPriceList(true);
                  convenioList()
            } else {
                // Dijeron que no
                console.log("*NO se elimina la lista de precio");
            }
        });
      }

      DeletePriceList()  
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

        getAgreementsListPriceApi(id).then(x => {
            setRows(x.data)
        });

        getAgreementApi(id).then((x: any) => {
            setNombre(x.data.id)
            setNombre(x.data.name)
        });


    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    console.log(rows)
   
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    
    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //#endregion
    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container item >
                        <Link to={"/apps/agreements"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Convenios / {nombre}</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs md={8}>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Lista de precios</InputLabel >
                        </Grid>
                        <Grid item xs md={4} mt={1.5}>
                            <Link to={`/apps/agreements/priceLists/crear/${id}`}>
                                <Button variant="contained" style={{ width: '28ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Asignar lista de precios</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }} className="card-table">
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
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                        <TableCell align="left">
                                                            <div style={{ display: "flex" }}>
                                                                <div style={{ paddingRight: "5px" }}>
                                                                    <Link to={"/apps/agreements/priceLists/" + row.id + "/list/"+id}>
                                                                        <Button variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> EDITAR</Button>
                                                                    </Link>
                                                                </div>

                                                                <div style={{ paddingRight: "5px" }}>
                                                                    
                                                                    <Button onClick={() => handleDelete(row.id, row.name)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> ELIMINAR</Button>
                                                                    
                                                                </div>
                                                            </div>
                                                                                
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
                            <TablePagination
                                rowsPerPageOptions={[5, 15, 20]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                labelRowsPerPage={"Filas por Pagina: "}
                                labelDisplayedRows={
                                    ({ from, to, count }) => {
                                        return '' + from + '-' + to + ' de ' + count
                                    }
                                }
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </div >
            </Contenido>


            <div>
               <Modal
                 keepMounted
                 open={eliminarPriceList}
                 onClose={handleCloseEliminarPriceList}
                 aria-labelledby="keep-mounted-modal-title"
                 aria-describedby="keep-mounted-modal-description"
                >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Lista de precio eliminada correctamente </InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseEliminarPriceList} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
            </div>

            <div>
               <Modal
                 keepMounted
                 open={eliminarErrorPriceList}
                 onClose={handleCloseErrorEliminarPriceList}
                 aria-labelledby="keep-mounted-modal-title"
                 aria-describedby="keep-mounted-modal-description"
                >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Hubo algun error al eliminar la lista de precios </InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorEliminarPriceList} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
            </div>


        </div>

    )
}


