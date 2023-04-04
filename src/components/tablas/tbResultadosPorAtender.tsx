import * as React from 'react';
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
import { getAppointmentsApi, getFilterAppointmentsApi } from '../../api';
import { Button, Grid, InputLabel, Modal, TextField, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import moment from 'moment';

interface Data {
  codigo: string,
  fecha: string,
  hora: string,
  codigoRef: string,
  referencia: string,
  paciente: string,
  precio: string,
  options: string
}


function createData(
  codigo: string,
  fecha: string,
  hora: string,
  codigoRef: string,
  referencia: string,
  paciente: string,
  precio: string,
  options: string
): Data {
  return {
    codigo,
    fecha,
    hora,
    codigoRef,
    referencia,
    paciente,
    precio,
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

function getCurrentDate() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let auxDay = date.getDate() < 10 ? "0" : "";
  return `${date.getFullYear()}-${month}-${auxDay}${date.getDate()}`;
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
    id: 'codigo',
    numeric: false,
    disablePadding: false,
    label: 'Código',
    disableOrder: true
  },
  {
    id: 'fecha',
    numeric: false,
    disablePadding: false,
    label: 'Fecha',
    disableOrder: true
  },
  {
    id: 'hora',
    numeric: false,
    disablePadding: false,
    label: 'Hora',
    disableOrder: false
  },
  {
    id: 'codigoRef',
    numeric: false,
    disablePadding: false,
    label: 'Código Ref.',
    disableOrder: false
  },
  {
    id: 'referencia',
    numeric: false,
    disablePadding: false,
    label: 'Referencia',
    disableOrder: false
  },
  {
    id: 'paciente',
    numeric: false,
    disablePadding: false,
    label: 'Paciente',
    disableOrder: false
  },
  {
    id: 'precio',
    numeric: false,
    disablePadding: false,
    label: 'Precio Final',
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

export default function TbResultadosPorAtender({ texto, opcion }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = React.useState<any>([]);
  const [rows2, setRows2] = React.useState<any>([]);
  const [fecha, setFecha] = React.useState<any>("");
  const [rangeDate, setRangeDate] = React.useState<any>(false);
  const [fechaCreacion, setFechaCreacion] = React.useState<any>('');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFechaCreacion(event.target.value);
  };
  const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };

  const handleCloseRangeDate = () => {
    setRangeDate(false);
  }

  
  var resultadosBusqueda = rows2.filter((elemento: any)=>{

    if(opcion == "nombre2" && texto !=""){

      if(elemento.pac2.toString().toLowerCase().includes(texto.toLowerCase())){

        return elemento
      }
  
      if(elemento.apP.toString().toLowerCase().includes(texto.toLowerCase())){
  
        return elemento
      }
  
      if(elemento.apM.toString().toLowerCase().includes(texto.toLowerCase())){
  
        return elemento
      }
    }
    
  });

  var resultadosBusqueda2 = rows2.filter((elemento: any)=>{

    if(opcion == "dniResultAtend" && texto !=""){

      if(elemento.tipoDocumento.toString().toLowerCase().includes(texto.toLowerCase())){

        return elemento
      }
    }
    
  });

  var resultadosBusqueda3 = rows2.filter((elemento: any)=>{
   
    if(opcion == "referente2" && texto !=""){

      if(elemento.referencia.toString().toLowerCase().includes(texto.toLowerCase())){

        return elemento
      }
    }
    
  });

  var resultadosBusqueda4 = rows2.filter((elemento: any)=>{
   
    if(opcion == "codeResultPorAtend" && texto !=""){

      if(elemento.codigo.toString().toLowerCase().includes(texto.toLowerCase())){

        return elemento
      }
    }
    
  });

  const filt = () => {
    if(opcion == "dateResultAtend"){
      setRows(busca)
    }
  }
  let dateNow = moment().format('YYYY-MM-DD');
  const ope2 = () => {
    getAppointmentsApi(0, 1000, "S",dateNow).then((ag: any) => {
      let mapeado: any = []
      ag.data?.forEach((d: any) => {
        mapeado.push({
          id: d.id,
          codigo: d.code,
          fecha: d.dateAppointmentEU,
          fechaCreada:moment(d.createdAt).format('YYYY-MM-DD'),
          fechaFiltro:d.dateAppointment,
          hora: d.time12h,
          codigoRef: d.Referer.id,
          referencia: d.Referer.name,
          tipoDocumento: d.client.dni,
          pac2:d.client.name,
          apP:d.client.lastNameP,
          apM:d.client.lastNameM,
          paciente: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
          precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
          descuento: d.discount == null ? "" : "S/. " + d.discount,
          precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,

          nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
          edad: d.client.years + " años",
          dni: d.client.dni,
          sexo: d.client.genderStr,
          medico: d.Doctor.name,
          sede: d.headquarter.name

        })
      });
      setRows(mapeado)
    });
  

    getAppointmentsApi(0, 1000, "S","").then((ag: any) => {
      let mapeado: any = []
      ag.data?.forEach((d: any) => {
        mapeado.push({
          id: d.id,
          codigo: d.code,
          fecha: d.dateAppointmentEU,
          fechaCreada:moment(d.createdAt).format('YYYY-MM-DD'),
          fechaFiltro:d.dateAppointment,
          hora: d.time12h,
          codigoRef: d.Referer.id,
          referencia: d.Referer.name,
          tipoDocumento: d.client.dni,
          pac2:d.client.name,
          apP:d.client.lastNameP,
          apM:d.client.lastNameM,
          paciente: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
          precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
          descuento: d.discount == null ? "" : "S/. " + d.discount,
          precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,

          nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
          edad: d.client.years + " años",
          dni: d.client.dni,
          sexo: d.client.genderStr,
          medico: d.Doctor.name,
          sede: d.headquarter.name

        })
      });

      
      //setRows(mapeado)
      setRows2(mapeado)
    });
  
}
 
  const ope = () => {
    if(opcion == "dateResultAtend"){
      setRangeDate(true);
    }
  }

  const busca = rows2.filter(
    (n: any) => ( n.fechaFiltro <= fecha && n.fechaFiltro >= fechaCreacion)
  )  

  busca.sort((a: any, b: any) => (
    a.fechaFiltro > b.Filtro ? 1 : a.Filtro < b.Filtro ? -1 : 0)
  )

  console.log(rows2)
  console.log(busca)
  console.log(fecha)
  console.log(fechaCreacion)
  
  const style2 = {
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
    if (texto == "") {
      getAppointmentsApi(0, 1000, "S", dateNow).then((ag: any) => {
        let mapeado: any = [];
        ag.data.forEach((d: any) => {
          mapeado.push({
            id: d.id,
            codigo: d.code,
            fecha: d.dateAppointmentEU,
            fechaCreada:moment(d.createdAt).format('YYYY-MM-DD'),
            fechaFiltro:d.dateAppointment,
            hora: d.time12h,
            codigoRef: d.Referer.id,
            referencia: d.Referer.name,
            tipoDocumento: d.client.dni,
            pac2:d.client.name,
            apP:d.client.lastNameP,
            apM:d.client.lastNameM,
            paciente: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
            precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
            descuento: d.discount == null ? "" : "S/. " + d.discount,
            precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,
  
            nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
            edad: d.client.years + " años",
            dni: d.client.dni,
            sexo: d.client.genderStr,
            medico: d.Doctor.name,
            sede: d.headquarter.name
          })
        });
        setRows(mapeado)
        //setRows2(mapeado)
      });
    } 
    

    if (texto == "") {
      getAppointmentsApi(0, 1000, "S","").then((ag: any) => {
        let mapeado: any = []
        ag.data?.forEach((d: any) => {
          mapeado.push({
            id: d.id,
            codigo: d.code,
            fecha: d.dateAppointmentEU,
            fechaCreada:moment(d.createdAt).format('YYYY-MM-DD'),
            fechaFiltro:d.dateAppointment,
            hora: d.time12h,
            codigoRef: d.Referer.id,
            referencia: d.Referer.name,
            tipoDocumento: d.client.dni,
            pac2:d.client.name,
            apP:d.client.lastNameP,
            apM:d.client.lastNameM,
            paciente: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
            precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
            descuento: d.discount == null ? "" : "S/. " + d.discount,
            precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,

            nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
            edad: d.client.years + " años",
            dni: d.client.dni,
            sexo: d.client.genderStr,
            medico: d.Doctor.name,
            sede: d.headquarter.name

          })
        });

        
        //setRows(mapeado)
        setRows2(mapeado)
      });
    } 

    if(opcion == "nombre2"){
      setRows(resultadosBusqueda)
    }

    if(opcion == "referente2"){
      setRows(resultadosBusqueda3)
    } 

    if(opcion == "codeResultPorAtend"){
      setRows(resultadosBusqueda4)
    } 

    if(opcion == "dniResultAtend"){
      setRows(resultadosBusqueda2)
    } 

    if(opcion == "dateResultAtend"){
      setRows(busca)
    }

  }, [texto, opcion]);

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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 50 }} className="card-table-resultados">
      <br></br>
      <div style={{ display: "flex" }}> 
      <div style={{ paddingLeft: "5px" }}>
        <Tooltip title="Filtro por fecha" followCursor>
            <Button onClick={ope} variant="contained" style={{ width: '25.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }} startIcon={<FilterAltIcon />}>
               Filtro por fecha
            </Button>
        </Tooltip>
      </div>
      <div style={{ paddingLeft: "5px" }}>
        <Tooltip title="Actualizar" followCursor>
            <Button onClick={ope2} variant="contained" style={{ width: '18.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }}>
               Actualizar
            </Button>
        </Tooltip>
      </div>
      
    </div>
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
                      key={index}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.codigo}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.fecha}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.hora}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.codigoRef}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.referencia}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.paciente}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.precio}
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          <div style={{ paddingRight: "5px" }}>
                            <Link to={`/apps/results/${row.id}`}>
                              <Tooltip title="Asignar resultados" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <FactCheckRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {(emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              ))}
              {
                rows.length == 0 ? <TableRow >
                  <TableCell colSpan={8} >
                    No tiene Resultados por Atender
                  </TableCell>
                </TableRow> : ""
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 100, 200]}
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
          open={rangeDate}
          onClose={handleCloseRangeDate}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
                        <Box sx={style2}>
                        <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Filtro por fecha</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={15} spacing={1}>
                                    <Grid item xs={9} >
                                    <TextField type="date" focused fullWidth id="outlined-basic" label="Fecha inicial *" variant="outlined" value={fechaCreacion} onChange={handleChangeFechaCreacion}/>
                                    </Grid>
                                    <Grid item xs={9} >
                                    <TextField type="date" focused fullWidth id="outlined-basic" label="Fecha final*" variant="outlined" value={fecha} onChange={handleChangFecha}/>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={filt} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Filtrar</Button>
                                    </Grid>
                      
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseRangeDate} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


    </Box>
  );
}

