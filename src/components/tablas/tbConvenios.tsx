//import * as React from 'react';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { getAgreementsApi,getPriceListApi, getFilterAgreeApi, deleteAgreementApi,getAgreementApi } from '../../api';
import { Button, Tooltip, Modal, InputLabel, Grid} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import DeleteIcon from '@mui/icons-material/Delete';

interface Data {
  name: string;
  description: string;
  options: string;
}

var a = "";

var b = "";
function createData(
  name: string,
  description: string,
  options: string
): Data {
  return {
    name,
    description,
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descripción',
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

export default function TbConvenios({ busqueda }: any) {

  const { id } = useParams();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<any>([]);
  const [idBorrar, setId] = React.useState<any>([]);
  const [idBorrar2, setId2] = React.useState<any>([]);
  const [abrirEliminarConfirmConvenio, setAbrirDeleteConfirmConvenio] = React.useState<any>(false);
  const [eliminarConvenio, setEliminarConvenio] = React.useState<any>(false);
  const [eliminaerrorConvenio, setEliminarErrorConvenio] = React.useState<any>(false);
  

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCloseEliminarConvenio = () => {
    setAbrirDeleteConfirmConvenio(false);
  }

  var convenioDelete=()=>{
    Swal.fire({
        title: 'El convenio fue eliminado correctamente',
        icon: 'success',
    })
  }

 
  let aux = rows
  const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
  const handleDelete = async (id: any, id2: any) => {
    console.log(id2)
  var DeleteConvenio=()=>{
    Swal
    .fire({
        title: "Desea eliminar el convenio: "+id2+"?",
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
              setRows([])
              //await sleep(50)
               
              setRows(aux)

              deleteAgreementApi(id).then((x: any) => {
                setId(x.data.id)
                //setId(x.data.name)
              });
        
              setRows(aux.filter((row: any) => row.id !== id));
        
            } catch(error) {
               console.error(error)
               
            }
            //setAbrirDeleteConfirmConvenio(true);
            convenioDelete()
        } else {
            // Dijeron que no
            console.log("*NO se elimina el convenio");
        }
    });
  }
  DeleteConvenio()     
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'white',
  border: '1px solid #white',
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

  React.useEffect(() => {
    if (busqueda == "") {
      getAgreementsApi(0, 1000).then(ag => {
        setRows(ag.data)
      });
    } else {
      getFilterAgreeApi(busqueda, "").then(ag => {
        setRows(ag.data)
      });
    }

  }, [busqueda]);

 
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <br></br>
      <br></br>
      <Paper sx={{ width: '100%', mb: 60 }} className="card-table-general">
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
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
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
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          <div style={{ paddingRight: "5px" }}>
                            <Link to={"/apps/agreements/" + row.id}>
                              <Tooltip title="Editar" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <ModeEditRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>
                          <div style={{ paddingLeft: "5px" }}>
                            <Link to={"/apps/agreements/priceLists/" + row.id}>
                              <Tooltip title="Lista de precios" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <RequestQuoteRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>


                          <div style={{ paddingLeft: "5px" }}>
                            
                              <Tooltip title="Eliminar Convenio" followCursor>
                                <Button onClick={() => handleDelete(row.id, row.name)} variant="contained" className='boton-icon'>
                                  <DeleteIcon />
                                </Button>
                              </Tooltip>
                            
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

              <div>
               <Modal
                 keepMounted
                 open={abrirEliminarConfirmConvenio}
                 onClose={handleCloseEliminarConvenio}
                 aria-labelledby="keep-mounted-modal-title"
                 aria-describedby="keep-mounted-modal-description"
                >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "200", fontSize: "1.5rem" }} >Convenio eliminado correctamente </InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={6} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseEliminarConvenio} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
               </div>

    </Box>
  );
}

