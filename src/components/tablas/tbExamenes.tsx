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
import { getFilterExamApi, getPagedExaminationsApi, deleteExaminationApi } from '../../api';
import { Button, Grid, InputLabel, Modal, Tab, TextField, Tooltip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

interface Data {
  codigo: string;
  nombre: string;
  servicio: string;
}


function createData(
  codigo: string,
  nombre: string,
  servicio: string
): Data {
  return {
    codigo,
    nombre,
    servicio
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
    id: 'codigo',
    numeric: false,
    disablePadding: false,
    label: 'Codigo',
    disableOrder: false
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
    disableOrder: false
  },
  {
    id: 'servicio',
    numeric: false,
    disablePadding: false,
    label: 'Servicio',
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

export default function TbExamenes({ busquedaex }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<any>([]);


  const [values, setValues] = React.useState<string>("1");
  const [abrirDetalleExamen, setAbrirDetalleExamen] = React.useState<any>(false);
  const [rowSetExamenes, setRowsSetExamenes] = React.useState<any>([]);
  const [nombreExamen, setNombreExamen] = React.useState<string>("");
  const [servicioExamen, setServicioExamen] = React.useState<string>("");
  const [indicacionesExamen, setIndicacionesExamen] = React.useState<string>("");
  const [idBorrar, setId] = React.useState<any>([]);

  const [tiposMuestra, setTiposMuestra] = React.useState<string>("");
  const [volumen, setVolumen] = React.useState<string>("");
  const [insumos, setInsumos] = React.useState<string>("");
  const [temperaturaConservacion, setTemperaturaConservacion] = React.useState<string>("");
  const [condicionesAyuno, setCondicionesAyuno] = React.useState<string>("");
  const [frecuenciaCorridas, setFrecuenciaCorridas] = React.useState<string>("");
  const [horaProceso, setHoraProceso] = React.useState<string>("");
  const [tiempoReporte, setTiempoReporte] = React.useState<string>("");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleOpenDetalleExamen = (obj: any) => {

    let fila = [];
    for (let a = 0; a < obj.examenes.length; a++) {
      fila.push(obj.examenes[a].name);
    }
    setRowsSetExamenes(fila)
    setIndicacionesExamen(obj.indicaciones)
    setNombreExamen(obj.nombre)
    setServicioExamen(obj.servicio)
    setTiposMuestra(obj.tipoMuestra)
    setVolumen(obj.volumen)
    setInsumos(obj.insumos)
    setTemperaturaConservacion(obj.temperaturaConservacion)
    setCondicionesAyuno(obj.condicionesAyuno)
    setFrecuenciaCorridas(obj.frecuenciaCorridas)
    setHoraProceso(obj.horaProceso)
    setTiempoReporte(obj.tiempoReporte)
    setAbrirDetalleExamen(true);
  }
  const handleCloseDetalleExamen = () => {
    setAbrirDetalleExamen(false);
  }


  var DeleteExam=()=>{
    Swal.fire({
        title: 'Examen - Eliminado exitosamente!!!',
        icon: 'success',
      })
  }

  var DeleteExamError=()=>{
    Swal.fire({
        title: 'Examen - Error al eliminar!!!',
        icon: 'warning',
      })
  }



  let aux = rows
  const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
  const handleDelete = async (id: any, id2: any) => {
    console.log(id);
    var DeleteExamination=()=>{
      Swal
      .fire({
          title: "Desea eliminar el examen: "+id2+"?",
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
  
                deleteExaminationApi(id).then((x: any) => {
                  setId(x.data.id)
                  //setId(x.data.name)
                });
          
                setRows(aux.filter((row: any) => row.id !== id));
          
              } catch(error) {
                 console.error(error)
                 DeleteExamError()
                 
              }
              DeleteExam()
              //setAbrirDeleteConfirmConvenio(true);
          } else {
              // Dijeron que no
              console.log("*NO se elimina el convenio");
          }
      });
    } 
    DeleteExamination()
  };

  React.useEffect(() => {
    if (busquedaex == "") {
      getPagedExaminationsApi(0, 1000).then((ag: any) => {
        let mapeado: any = [];
        ag.data.forEach((d: any) => {
          mapeado.push({
            id: d.id,
            codigo: d.code,
            nombre: d.name,
            servicio: d.service.name,
            examenes: d.examinationGroups,
            indicaciones: d.indications,
            tipoMuestra: d.typeSample,
            volumen: d.volume,
            insumos: d.supplies,
            temperaturaConservacion: d.storageTemperature,
            condicionesAyuno: d.fastingConditions,
            frecuenciaCorridas: d.runFrequency,
            horaProceso: d.processTime,
            tiempoReporte: d.reportTime,
          })
        });
        setRows(mapeado)
        
        
      });
    } else {
      getFilterExamApi(busquedaex).then((ag: any) => {
        let mapeado: any = [];
        ag.data.forEach((d: any) => {
          mapeado.push({
            id: d.id,
            codigo: d.code,
            nombre: d.name,
            servicio: d.service.name,
            examenes: d.examinationGroups,
            indicaciones: d.indications,
            tipoMuestra: d.typeSample,
            volumen: d.volume,
            insumos: d.supplies,
            temperaturaConservacion: d.storageTemperature,
            condicionesAyuno: d.fastingConditions,
            frecuenciaCorridas: d.runFrequency,
            horaProceso: d.processTime,
            tiempoReporte: d.reportTime,
          })
        });
        setRows(mapeado)
      });
    }


  }, [busquedaex]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeValor = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValues(newValue);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
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
  return (
    <Box sx={{ width: '100%' }}>
      <br></br>
      <br></br>
      <Paper sx={{ width: '100%', mb: 60 }} className="card-table-general">
        <TableContainer>
          <Table
            sx={{ minWidth: 700 }}
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
                        {row.nombre}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.servicio}
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          <div style={{ paddingRight: "5px" }}>
                            <Tooltip title="Ver Examen" followCursor>
                              <Button onClick={() => handleOpenDetalleExamen(row)} variant="contained" className='boton-icon'>
                                <PlagiarismRoundedIcon />
                              </Button>
                            </Tooltip>
                          </div>
                          <div style={{ paddingLeft: "5px" }}>
                            <Link to={`/apps/examinations/` + row.id}>
                              <Tooltip title="Editar Examen" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <ModeEditRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>

                          <div style={{ paddingLeft: "5px" }}>
                            <Tooltip title="Borrar Examen" followCursor>
                              <Button onClick={() => handleDelete(row.id, row.nombre)}  variant="contained" className='boton-icon'>
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
          open={abrirDetalleExamen}
          onClose={handleCloseDetalleExamen}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Detalles del examen</InputLabel >
            <TabContext value={values} >
              <Box>
                <Tabs scrollButtons="auto" indicatorColor="primary" textColor="primary" onChange={handleChangeValor}  >
                  <Tab className="h-64 normal-case" label="Datos básicos" value="1" />
                  <Tab className="h-64 normal-case" label="Valores del grupo" value="2" />
                  <Tab className="h-64 normal-case" label="Dátos técnicos" value="3" />
                </Tabs>
              </Box>
              <TabPanel value="1">
                <Grid container style={{ alignItems: "center" }}>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Nombre: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{nombreExamen}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Servicio: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{servicioExamen}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Indicaciones: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{indicacionesExamen}</InputLabel >
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container style={{ alignItems: "center" }}>
                  <Grid container item mt={0.5}>
                    <Grid item xs={3}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Item</b></InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Descripción</b></InputLabel >
                    </Grid>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  {rowSetExamenes.map((rowsExamen: any, index: any) => {
                    return (
                      <Grid container item mt={1} key={index}>
                        <Grid item xs={3}>
                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }} >{index + 1}</InputLabel >
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{rowsExamen}</InputLabel >
                        </Grid>
                        <Grid item xs={4}></Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Tipo(s) de muestra: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{tiposMuestra}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Volumen: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{volumen}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Insumos: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{insumos}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Temperatura de conservación: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{temperaturaConservacion}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Condiciones de ayuno: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{condicionesAyuno}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Frecuencia de corridas: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{frecuenciaCorridas}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Hora de proceso: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{horaProceso}</InputLabel >
                  </Grid>
                </Grid>
                <Grid container item mt={0.5}>
                  <Grid item xs={8}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Tiempo de reporte: </InputLabel >
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{tiempoReporte}</InputLabel >
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Modal>
      </div>
      
      
    </Box>

    
  );
}
