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
import { getFilterPatientsApi, getPagedPatientsApi, deletePatientApi, editPatientApi } from '../../api';
import { Button, Grid, InputLabel, Modal, Tab, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tabs } from '@mui/material';
import { nationality } from '../../constant';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { text } from 'stream/consumers';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Swal from 'sweetalert2';

interface Data {
  dni: string;
  tipoDocumento: string;
  nombre: string;
  telefono: string;
}

function createData(
  dni: string,
  tipoDocumento: string,
  nombre: string,
  telefono: string
): Data {
  return {
    dni,
    tipoDocumento,
    nombre,
    telefono
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
    id: 'dni',
    numeric: false,
    disablePadding: false,
    label: 'Nro. de documento',
    disableOrder: true
  },
  {
    id: 'tipoDocumento',
    numeric: false,
    disablePadding: false,
    label: 'Tipo Documento',
    disableOrder: true
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
    disableOrder: false
  },
  {
    id: 'telefono',
    numeric: false,
    disablePadding: false,
    label: 'Teléfono',
    disableOrder: true
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

export default function TbPacientes({ texto, opcion }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = React.useState<any>([]);

  const [abrirColegiatura, setAbrirColegiatura] = React.useState<any>(false);
  const [values, setValues] = React.useState<string>("1");
  const [tipoDoc, setTipoDoc] = React.useState<any>('');
  const [numDoc, setNumDoc] = React.useState<any>('');
  const [numHistoria, setNumHistoria] = React.useState<any>('');
  const [nombres, setNombres] = React.useState<any>('');
  const [apePa, setApePa] = React.useState<any>('');
  const [apeMa, setApeMa] = React.useState<any>('');
  const [genero, setGenero] = React.useState<any>('');
  const [estadoCivil, setEstadoCivil] = React.useState<any>('');
  const [feNacimiento, setFeNacimiento] = React.useState<any>('');
  const [nacionalidad, setNacionalidad] = React.useState<any>('');

  const [region, setRegion] = React.useState<any>('');
  const [provincia, setProvincia] = React.useState<any>('');
  const [distrito, setDistrito] = React.useState<any>('');
  const [direcLugar, setDirecLugar] = React.useState<any>('');

  const [correo, setCorreo] = React.useState<any>('');
  const [telMovil, setTelMovil] = React.useState<any>('');
  const [telFijo, setTelFijo] = React.useState<any>('');
  const [id, setId] = React.useState<any>("");


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  React.useEffect(() => {
    if (texto == "") {
      getPagedPatientsApi(0, 1000).then((ap: any) => {
        let mapeado: any = [];
        ap.data.forEach((d: any) => {
          mapeado.push({
            tipoDocumento: d.typeDoc.name,
            dni: d.typeDoc.dni,
            nombreCompleto: d.person.name + " " + d.person.lastNameP + " " + d.person.lastNameM,
            numHistoriaCli: d.person.historyNumber,
            nombre: d.person.name,
            apellidoPa: d.person.lastNameP,
            apellidoMa: d.person.lastNameM,
            genero: d.person.genderStr,
            estCivil: d.person.civilStatusStr,
            fechaNacimiento: d.person.birthDate,
            nacionalidad: d.nacion.name,

            region: d.region.name,
            provincia: d.province.name,
            distrito: d.district.name,
            direcLugar: d.person.address,


            correo: d.user.username,
            telMovil: d.person.phoneNumber,
            telFijo: d.person.tlfNumber,


            id: d.person.id,
            userid2: d.person.UserId,
            userid: d.user.id
          })
        });
        setRows(mapeado)
      });
    } else {
      getFilterPatientsApi(opcion, texto).then((ap: any) => {
        let mapeado: any = [];
        ap.data.forEach((d: any) => {
          mapeado.push({
            tipoDocumento: d.typeDoc.name,
            dni: d.typeDoc.dni,
            nombreCompleto: d.person.name + " " + d.person.lastNameP + " " + d.person.lastNameM,
            numHistoriaCli: d.person.historyNumber,
            nombre: d.person.name,
            apellidoPa: d.person.lastNameP,
            apellidoMa: d.person.lastNameM,
            genero: d.person.genderStr,
            estCivil: d.person.civilStatusStr,
            fechaNacimiento: d.person.birthDate,
            nacionalidad: d.nacion.name,

            region: d.region.name,
            provincia: d.province.name,
            distrito: d.district.name,
            direcLugar: d.person.address,


            correo: d.user.username,
            telMovil: d.person.phoneNumber,
            telFijo: d.person.tlfNumber,


            id: d.person.id,
            userid2: d.person.UserId,
            userid: d.user.id
          })
        });
        setRows(mapeado)
      });
    }


  }, [texto, opcion]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCloseColegiatura = () => {
    setAbrirColegiatura(false);
  }
  const handleChangeValor = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValues(newValue);
  };

  const DeletePaciente=()=>{
    Swal.fire({
        title: 'Paciente eliminado correctamente!!!',
        icon: 'success',
      })
  }


  let aux = rows
  const handleDelete = async (id: any, nombre: any) => {
    console.log(id);
    var DeleteClient=()=>{
    Swal
    .fire({
        title: "Desea eliminar al paciente "+nombre+"?",
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

              deletePatientApi(id).then((x: any) => {
                setId(x.data.id)
                //setId(x.data.name)
              });

          
              setRows(aux.filter((row: any) => row.userid2 !== id));
        
            } catch(error) {
               console.error(error)
               
            }
            DeletePaciente();
        } else {
            // Dijeron que no
            console.log("*NO se elimina el convenio");
        }
    });
  }
   
  DeleteClient()

  };

  rows.sort((a: any, b: any) => (
    a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)
  )

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleOpenColegiatura = (obj: any) => {
    setAbrirColegiatura(true);
    setTipoDoc(obj.tipoDocumento)
    setNumDoc(obj.dni)
    setNumHistoria(obj.numHistoriaCli)
    setNombres(obj.nombre)
    setApePa(obj.apellidoPa)
    setApeMa(obj.apellidoMa)
    setGenero(obj.genero)
    setEstadoCivil(obj.estCivil)
    setFeNacimiento(obj.fechaNacimiento)
    setNacionalidad(obj.nacionalidad)

    setRegion(obj.region)
    setProvincia(obj.provincia)
    setDistrito(obj.distrito)
    setDirecLugar(obj.direcLugar)

    setCorreo(obj.correo)
    setTelMovil(obj.telMovil)
    setTelFijo(obj.telFijo)
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "500px",
    margin: "auto",
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
                        {row.dni}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.tipoDocumento}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.nombreCompleto}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.telFijo}
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          <div style={{ paddingRight: "5px" }}>
                            <Tooltip title="Ver Paciente" followCursor>
                              <Button onClick={() => handleOpenColegiatura(row)} variant="contained" className='boton-icon'>
                                <PersonSearchRoundedIcon />
                              </Button>
                            </Tooltip>
                          </div>
                          <div style={{ paddingLeft: "5px" }}>
                            <Link to={"/apps/patients/" + row.id + "/user/" + row.userid}>
                              <Tooltip title="Editar" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <ModeEditRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>
                          <div style={{ paddingLeft: "5px" }}>
                            <Tooltip title="Borrar Paciente" followCursor>
                              <Button onClick={() => handleDelete(row.userid2, row.nombreCompleto)}  variant="contained" className='boton-icon'>
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
          open={abrirColegiatura}
          onClose={handleCloseColegiatura}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.5rem" }} >Detalles del paciente</InputLabel >
            <TabContext value={values} >
              <Box>
                <Tabs value={values} scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChangeValor}  >
                  <Tab className="h-64 normal-case" label="Datos personales" value="1" />
                  <Tab className="h-64 normal-case" label="Domicilio" value="2" />
                  <Tab className="h-64 normal-case" label="Datos del paciente" value="3" />
                </Tabs>
              </Box>
              <TabPanel value="1">
                <Grid container style={{ alignItems: "center" }}>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Tipo de documento: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{tipoDoc}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Nro. de documento: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{numDoc}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Nro. de historia clínica: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{numHistoria}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Nombre: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{nombres}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Apellido paterno: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{apePa}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Apellido materno: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{apeMa}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Género: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{genero}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Estatus civil: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{estadoCivil}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Fecha de nacimiento: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{feNacimiento}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Nacionalidad: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{nacionalidad}</InputLabel >
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container style={{ alignItems: "center" }}>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Departamento: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{region}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Provincia: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{provincia}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Distrito: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{distrito}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Dirección: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{direcLugar}</InputLabel >
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container style={{ alignItems: "center" }}>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Correo: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{correo}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Teléfono móvil: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{telMovil}</InputLabel >
                    </Grid>
                  </Grid>
                  <Grid container item mt={0.5}>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} >Teléfono fijo: </InputLabel >
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }} >{telFijo}</InputLabel >
                    </Grid>
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
