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
import { getAppointmentsApi, getEmployeeApi, getEmployeeById, getExaminationValuesByExamId, getExamValuesApi, getFilterAppointmentsApi, getAppointmentsByPersonId, getAppointmentsByReferer } from '../../api';
import { Button, Grid, InputLabel, Modal, TextField, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../img/logo-redlab.png'
import logobg from '../../img/logo-redlab-bg.png'
import { Label, Pages } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import moment from 'moment';
import Swal from 'sweetalert2';

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
  // return `${auxDay}${date.getDate()}_${month}_${date.getFullYear()}`; (dd_mm_yyyy)
  return `${auxDay}${date.getDate()}${month}${date.getFullYear()}`; // (ddmmyyyy)
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

//#region modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  border: '1px solid #white',
  borderRadius: "15px",
  boxShadow: 24,
  p: 4
};
//#endregion




export default function TbResultadosAtendidas({ texto, opcion }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = React.useState<any>([]);
  const [rows2, setRows2] = React.useState<any>([]);
  const [rangeDate, setRangeDate] = React.useState<any>(false);
  const [fechaCreacion, setFechaCreacion] = React.useState<any>('');

  const [abrirResultado, setAbrirResultado] = React.useState<any>(false);

  const [nombreCompleto, setNombreCompleto] = React.useState<any>("");
  const [edad, setEdad] = React.useState<any>("");
  const [dni, setDni] = React.useState<any>("");
  const [sexo, setSexo] = React.useState<any>("");
  const [codigo, setCodigo] = React.useState<any>("");
  const [medico, setMedico] = React.useState<any>("");
  const [fecha, setFecha] = React.useState<any>("");
  const [sede, setSede] = React.useState<any>("");


  const [examenLista, setExamenLista] = React.useState<readonly string[]>([]);

  const [direccion, setDireccion] = React.useState<any>("");
  const [sedeUser, setSedeUser] = React.useState<any>("");
  const [telfUser, setTelfUser] = React.useState<any>("");
  const [correoUser, setCorreoUser] = React.useState<any>("");
  const [firma, setFirma] = React.useState<any>("");

  const [docTitle, setDocTitle] = React.useState<any>("");

  const handleCloseResultado = () => {
    setAbrirResultado(false);
  }

  const handleCloseRangeDate = () => {
    setRangeDate(false);
  }

  const handleAbrirResultado = async (obj: any) => {
    setAbrirResultado(true);
    setNombreCompleto(obj.nombreCompleto)
    setEdad(obj.edad)
    setDni(obj.dni)
    setSexo(obj.sexo)
    setCodigo(obj.codigo)
    setMedico(obj.medico)
    setFecha(obj.fecha)
    setSede(obj.sede)
    setDocTitle(obj.docTitle)
    getExamValuesApi(obj.id).then(async (y: any) => {
      let daton: any = [];
      for (let exam of y.data) {
        let x = await getExaminationValuesByExamId(exam.ExaminationId, "")
        x.data.forEach((p: any) => {
          p.examGroupId = p.examGroup.name
        })
        const valor = x.data.reduce((examGroup: any, daton: any) => {
          const { examGroupId } = daton;
          examGroup[examGroupId] = examGroup[examGroupId] ?? [];
          examGroup[examGroupId].push(daton);
          return examGroup;
        }, {})

        daton.push({
          name: exam.name,
          detalleExam: valor
        })
      }
      setExamenLista(daton)
      // console.log(daton)

    })

    const dato = localStorage.getItem('dataUser')
    if (dato != null) {
      const info = JSON.parse(dato);
      setDireccion(info.person.headquarter.address)
      setSedeUser(info.person.headquarter.name)
      setTelfUser(info.person.headquarter.tlfNumber)
      setCorreoUser(info.person.headquarter.email)
      let x = await getEmployeeApi(info.person.id)
      setFirma(x.data.person.digitalSignatureUrl)
      console.log(x);
    }


  }

  const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFechaCreacion(event.target.value);
  };

  const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };

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

  const filt = () => {
    if(opcion == "dateResultAtend"){
      setRows(busca)
    }
  }

  var impreso=()=>{
    Swal.fire({
        title: 'Documento impreso',
        icon: 'success',
    })
}

let dateNow = moment().format('YYYY-MM-DD');

const ope2 = () => {
  getAppointmentsApi(0, 1000, "E",dateNow).then((ag: any) => {
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


  getAppointmentsApi(0, 1000, "E","").then((ag: any) => {
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

  const ope = () => {
    if(opcion == "dateResultAtend"){
      setRangeDate(true);
    }
  }

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

   const busca = rows2.filter(
    (n: any) => ( n.fechaFiltro <= fecha && n.fechaFiltro >= fechaCreacion)
  )  
  console.log(rows2)
  console.log(busca)
  console.log(fecha)
  console.log(fechaCreacion)


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
      getAppointmentsApi(0, 1000, "E", dateNow).then((ag: any) => {
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
            sede: d.headquarter.name,

            docTitle: d.code + "_" + d.client.code + "_" + d.client.name + "_" + d.client.lastNameP + "_" + d.client.lastNameM + "_" + getCurrentDate()

          })
        });
        setRows(mapeado)
        //setRows2(mapeado)
      });
    } 

    if (texto == "") {
      getAppointmentsApi(0, 1000, "E", "").then((ag: any) => {
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
            sede: d.headquarter.name,

            docTitle: d.code + "_" + d.client.code + "_" + d.client.name + "_" + d.client.lastNameP + "_" + d.client.lastNameM + "_" + getCurrentDate()

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

  console.log(rows)
  console.log(rows2)

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
  let componente: any;
  const pageStyle = `
  @page {
    size: 210mm 297mm;
    
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
      page-break-after: always !important;
      page-break-inside: avoid !important;
    }

    .no-break-inside {
      // apply this class to every component that shouldn't be cut off between to pages of your PDF
      break-inside: "avoid";
    }
  
    .break-before {
      // apply this class to every component that should always display on next page
      break-before: "always";
    }
  }
`;
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
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}        
            />
            <TableBody>
              {
                stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                            <Link to={`/apps/edit/results/${row.id}`}>
                              <Tooltip title="Editar resultado" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <ModeEditRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>
                          <div style={{ paddingLeft: "5px" }}>
                            <Tooltip title="Imprimir Resultado" followCursor>
                              <Button onClick={() => handleAbrirResultado(row)} variant="contained" className='boton-icon'>
                                <LocalPrintshopRoundedIcon />
                              </Button>
                            </Tooltip>
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
                    No tiene Atendidas
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
        open={abrirResultado}
        onClose={handleCloseResultado}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Grid container  >
          <Grid item xs={12} >
            <Box sx={style} >
              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Imprimir Resultados</InputLabel >
              <Grid container item>
                <Grid container item
                  style={{ overflowY: "scroll", maxHeight: "500px" }}>
                  <Grid container item ref={(ins) => (componente = ins)}
                    style={{ justifyContent: "center" }}>
                    {examenLista.map((data: any, indexX: any) =>
                      <>
                        <Grid container item key={indexX}
                          style={{
                            justifyContent: "center",
                            // backgroundColor:'red',
                            background: `url(${logobg}) no-repeat center center transparent`,
                            backgroundRepeat: "no-repeat", 
                            maxWidth: "204mm", 
                            minWidth: "204mm",
                            height: "282mm",
                            minHeight: "281mm"                                          
                          }}
                         
                        >
                      <div style={{height: "250mm"}}></div>
                       
                          <Grid container item xs={11} >
                          <Grid item xs={8} ></Grid>
                            {/* Header */} 
                            <Grid container item alignItems="flex-start">
                              <Grid item xs={12}>                                
                                <Grid container item xs={12} style={{ justifyContent: "end", marginBlock: "10px"}}>
                                  <img src={logo} width="235em" height="100em"></img>                            
                                </Grid>
                                <Grid item xs={12}  >
                                  <div style={{ border: '2px solid black', borderRadius: '5px', width: "770px", maxWidth: "100%" }}>
                                    <div style={{ marginInline: "15px", marginBlock: "1px"}}>
                                      <Grid container item mt={1}>
                                        <Grid container item xs={8}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Paciente:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{nombreCompleto}</InputLabel >                                                                           
                                        </Grid>
                                        
                                        <Grid container item xs={4}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Fecha:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{fecha}</InputLabel >                                                                           
                                        </Grid>
                                      </Grid>

                                      <Grid container item mt={1}>
                                        <Grid container item xs={8}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >DNI:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{dni}</InputLabel >                                                                           
                                        </Grid>
                                        
                                        <Grid container item xs={4}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Código:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{codigo}</InputLabel >                                                                           
                                        </Grid>
                                      </Grid>

                                      <Grid container item mt={1}>
                                        <Grid container item xs={8}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Sexo:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{sexo}</InputLabel >                                                                           
                                        </Grid>
                                        
                                        <Grid container item xs={4}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Página:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{indexX+1} de {examenLista.length}</InputLabel >                                                                           
                                        </Grid>
                                      </Grid>
                                      
                                      <Grid container item mt={1}>
                                        <Grid container item xs={8}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Edad:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{edad}</InputLabel >                                                                           
                                        </Grid>
                                        
                                        <Grid container item xs={4}>                          
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.9rem" }} >Sede:&nbsp;</InputLabel >
                                          <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.9rem" }} >{sede}</InputLabel >                                                                           
                                        </Grid>
                                      </Grid>    
                                    </div>
                                  </div>
                                </Grid> 
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} height="15px" ></Grid>
                                <Grid container item xs={12} style={{ justifyContent: "center", marginBlock: "8px"}}>
                                  <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.8rem" }} ><b>Examen:   {data.name}</b></InputLabel >                                                     
                                </Grid> 
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} height="20px" ></Grid>
                                <Grid container item xs={10} style={{ marginBlock: "5px"}}>
                                  <Grid container item xs={3} style={{ justifyContent: "center" }}>
                                  </Grid>
                                  <Grid container item xs={2} style={{ justifyContent: "center" }}>
                                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.8rem" }} >Resultados</InputLabel >
                                  </Grid>
                                  <Grid container item xs={2} style={{ justifyContent: "center" }}>
                                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.8rem" }} >Unidades</InputLabel >
                                  </Grid>
                                  <Grid container item xs={3} style={{ justifyContent: "center" }} >
                                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.8rem" }} >Rangos Referenciales</InputLabel >
                                  </Grid>
                                  <Grid container item xs={2} style={{ justifyContent: "center" }}>
                                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.8rem" }} >Metodología</InputLabel >
                                  </Grid>
                                </Grid>

                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                <Grid item xs={8} ></Grid>
                                  {/* Contenido */}   
                                <Grid container item xs={10}>
                                  {
                                    Object.keys(data.detalleExam).map((nombre: any, indexY: any) =>
                                    <Grid container item key={indexY}>
                                      <Grid container item xs={3} style={{ justifyContent: "right", marginBlock: "5px"}}>
                                        <div style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "0.7rem", textAlign: "right"}} ><u>{nombre}</u></div>                                                     
                                      </Grid>
                                      <Grid container item xs={9}>
                                        
                                      </Grid>                                       
                                      {data.detalleExam[nombre].map((daton: any, indexW: any) =>
                                        <Grid container item key={indexW} >
                                          <Grid container item xs={3} style={{ justifyContent: "right" }}>
                                            <div style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.7rem", textAlign: "right"}} >{daton.name}</div>
                                          </Grid>
                                          <Grid container item xs={2} style={{ justifyContent: "center" }} >
                                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.7rem" }} >{daton.result}</InputLabel >
                                          </Grid>
                                          <Grid container item xs={2} style={{ justifyContent: "center" }}>
                                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.7rem" }} >{daton.unit.name}</InputLabel >
                                          </Grid>
                                          <Grid container item xs={3} style={{ justifyContent: "center" }}>
                                            {daton.examinationReferenceValues.map((datito: any, indexT: any) =>
                                              <Grid container item style={{ justifyContent: "center" }}>
                                                <InputLabel key={indexT} style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.7rem" }} >{datito.name}</InputLabel >
                                              </Grid>

                                            )}
                                          </Grid>
                                          <Grid container item xs={2} style={{ justifyContent: "center" }}>
                                            <div style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.7rem" }} >{daton.methodology.name}</div>
                                          </Grid>
                                        </Grid>
                                      )}
                                    </Grid>
                                    )
                                  }
                                </Grid>

                              </Grid>
                            </Grid>

                            {/* Body */}                                           
                        

                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={8} height= "50px" ></Grid>
                            {/* Footer */}
                            <Grid container item >
                              <Grid item xs={12}  >
                                <div style={{ width: "800px", maxWidth: "100%", justifyContent: "left", maxHeight: "100%"}}>
                                  <div style={{ margin: "5px" }}>
                                  <Grid container item xs={12} style={{ justifyContent: "end" }}>
                                    <img src={firma} height="25px" width="80px"></img>                            
                                  </Grid>
                                  <Grid container item mt={1} style= {{justifyContent: "left"}} >
                                    <Grid container item xs={8} >                          
                                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.6rem" }} ><b>Sede:</b>   {sedeUser}</InputLabel >
                                    </Grid>                                  
                                    <Grid container item xs={4} style= {{justifyContent: "end"}}>                          
                                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.6rem" }} ><b>Correo:</b>   {correoUser}</InputLabel >
                                    </Grid>
                                  </Grid>
                                  <Grid container item mt={1}>
                                    <Grid container item xs={8}>                          
                                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.6rem" }} ><b>Teléfono:</b>   {telfUser}</InputLabel >
                                    </Grid>                                  
                                    <Grid container item xs={4} style= {{justifyContent: "end"}}>                          
                                      <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.6rem" }} ><b>Dirección:</b>   {direccion}</InputLabel >
                                    </Grid>
                                  </Grid>
                                
                                  <Grid container item mt={1}>
                                    <Grid container item xs={8}>                          
                                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "0.6rem" }} ><b>www.redlabperu.com</b></InputLabel >
                                    </Grid>
                                  </Grid>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          
                          </Grid>
                          

                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs mt={2.5}>
                  <Grid item xs={8} ></Grid>
                  <Grid container item xs={4} spacing={2}>
                    <Grid item xs={6} >
                      <Button onClick={handleCloseResultado} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={6} >
                      <ReactToPrint
                        trigger={() => (
                          <Button variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Imprimir</Button>
                        )}
                        pageStyle={pageStyle}
                        content={() => componente}
                        documentTitle={docTitle}
                      
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Modal>
      </div >

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
                                    <TextField type="date" focused fullWidth id="outlined-basic" label="Fecha final *" variant="outlined" value={fecha} onChange={handleChangFecha}/>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={filt} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Filtrar</Button>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Button onClick={ope2} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Actualizar</Button>
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

