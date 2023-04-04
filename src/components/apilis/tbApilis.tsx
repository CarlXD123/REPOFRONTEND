import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link } from 'react-router-dom';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import TablePagination from '@mui/material/TablePagination';
import MediationIcon from '@mui/icons-material/Mediation';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

export default function TbApilis() {
    type Order = 'asc' | 'desc';
    const ExcelJS = require("exceljs");
    const [rowstotal, setVSumTotal] = React.useState(0);
    const [rows, setRows] = React.useState<any[]>([]);
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);

    const [fecha, setFecha] = React.useState<any>("");
    const [fechaCreacion, setFechaCreacion] = React.useState<any>('');
    const [bloqueaboton, setBloquearBoton] = React.useState<any>(true);

    const [filtros, setFiltros] = React.useState<any>('');
    const [filtros2, setFiltros2] = React.useState<any>('');
    const [textfiltro, setTextFiltro] = React.useState<any>('');
    const [textfiltro2, setTextFiltro2] = React.useState<any>('');
    const [nuevatabla, setNuevaTabla] = React.useState<any>(false);
    const [dia, setDia] = React.useState<any>('');
    const [mes, setMes] = React.useState<any>('');
    const [anio, setAnio] = React.useState<any>('');
    const tableRef = React.useRef(null);
    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [convenio, setConvenio] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [referenciaList, setReferenciaList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');
    const [docTitle, setDocTitle] = React.useState<any>("");
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>("");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);


    const style2 = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };

    const handleCloseNuevaTabla = () => {
        setNuevaTabla(false);
      }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


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


    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }

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







    React.useEffect(() => {
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });
        getRefererApi().then((ag: any) => {
            setReferenciaList(ag.data);
        });
        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
        getAppointmentsApi(0, 1000, "E", "").then((ag: any) => {
            let mapeado: any = []
            let mapeado2: any = []
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
                paciente: d.client.lastNameP + " " + d.client.lastNameM + "," + d.client.name,
                precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
                descuento: d.discount == null ? "" : "S/. " + d.discount,
                precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,
    
                nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
                edad: d.client.years + " años",
                dni: d.client.dni,
                idclient: d.client.id,
                sexo: d.client.genderStr,
                medico: d.Doctor.name,
                sede: d.headquarter.name,
                sedecode: d.HeadquarterId,

                citaprice:d.totalPrice,
                citadescuento:d.discount,
                citafinalprice:d.finalPrice,
                referercode:d.refererCode,
                doctornotes:d.doctorNotes,
                tlfclient:d.client.tlfNumber,
                phoneclient:d.client.phoneNumber,
                birthclient:d.client.birthDate,
                direcclient:d.client.address,
                nationality:d.client.nationality,
                distrito:d.District.name,
                provincia:d.Provinces.name,
                departamento:d.Region.name,
                convenio:d.Convenio.name,
                examen1: d.Exam.exam.length == 0 ? [0] : d.Exam.exam,
              })
              
            setRows3(mapeado2)
            setRowsExamenes(mapeado)
            setRows2(mapeado)
            
           });
          });

    }, [])

   
    let dateNow = moment().format('YYYY-MM-DD');
    let HourNow = moment().format('H-m-s');


    const busca = rows2.filter(
        (n: any) => ( n.fechaFiltro <= fecha && n.fechaFiltro >= fechaCreacion)
    )  

    const busca2 = rows2.filter((elemento: any)=>{

        if(parseInt(textfiltro) ==elemento.sedecode){
    
    
            return elemento.sede
              
        }
        
    });

    const busca3 =  rows2.filter((elemento: any)=>{

        if(parseInt(textfiltro2) ==elemento.codigoRef){
    
    
            return elemento.referencia
              
        }
        
    });

    const busca4 =  busca.filter((elemento: any)=>{

        if(parseInt(textfiltro) ==elemento.sedecode){
    
    
            return elemento.sede
              
        }
        
    });

    const busca5 =  busca.filter((elemento: any)=>{

        if(parseInt(textfiltro2) ==elemento.codigoRef){
    
    
            return elemento.referencia
              
        }
        
    });

    const busca6 =  busca2.filter((elemento: any)=>{

        if(parseInt(textfiltro2) ==elemento.codigoRef && textfiltro !=""){
    
    
            return elemento.referencia
              
        }
        
    });

    const busca7 =  busca.filter((elemento: any)=>{

        if(parseInt(textfiltro2) ==elemento.codigoRef && parseInt(textfiltro) ==elemento.sedecode){
    
    
            return elemento.fechaFiltro <= fecha && elemento.fechaFiltro >= fechaCreacion
              
        }
        
    });
   

    console.log(rowsExamenes)
    console.log(rows)
    console.log(rows2)
    console.log(rows3)
    console.log(busca)
    console.log(busca2)

   
    const fechatotal=()=>{
        Swal.fire({
            title: 'Por favor, ingrese un filtro',
            icon: 'warning',
          })
    }

    const otrosfilt=()=>{
        Swal.fire({
            title: 'Por favor, ingrese uno de los filtros',
            icon: 'warning',
          })
    }

    const fechainitial=()=>{
        Swal.fire({
            title: 'Ingrese la fecha inicial por favor',
            icon: 'warning',
          })
    }

    const fechasecond=()=>{
        Swal.fire({
            title: 'Ingrese la fecha secundaria por favor',
            icon: 'warning',
          })
    }




    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Reporte Examenes Realizados");
    
        sheet.getRow(1).border = {
          top: { color: { argb: "#060606" } },
          left: { color: { argb: "#060606" } },
          bottom: {  color: { argb: "#060606" } },
          right: { color: { argb: "#060606" } },
        };
    
        sheet.getRow(1).fill = {
          type: "pattern",
          fgColor: { argb: "#060606" },
        };
    
        sheet.getRow(1).font = {
          name: "Comic Sans MS",
          family: 4,
          size: 10,
          bold: true,
        };
    
        sheet.columns = [
          {
            header: "Fecha",
            key: "fecha",
            width: 15,
          },
          { header: "Codigo Cita", key: "codigo", width: 20 },
          {
            header: "Sede",
            key: "sede",
            width: 15,
          },
          {
            header: "Convenio",
            key: "convenio",
            width: 20,
          },
          {
            header: "Referencia",
            key: "referencia",
            width: 25,
          },
          {
            header: "Apellido y Nombres",
            key: "paciente",
            width: 30,
          },
          {
            header: "Examenes",
            key: "examen1",
            width: 30,
          },
          {
            header: "Precios",
            key: "precios",
            width: 20,
          },
          {
            header: "Total",
            key: "precio",
            width: 8,
          },
        ];

        const promise = Promise.all([
          rows.map(async (product: any, index: any) => {
            {product.examen1.map((x: any, indeex: any) =>{
            sheet.addRow({
                fecha: product.fecha,
                codigo: product.codigo,
                referencia: product.referencia,
                paciente: product.paciente,
                sede: product.sede,
                precio: product.precio,
                convenio:product.convenio, 
                examen1: x.listaexamen == "" ? "" : x.listaexamen,
                precios:x.listaprecios == null ? "" : "S/." + x.listaprecios,
            });

            })}  
         }),
        sheet.addRow({
            precios: "S/."+rowstotal,
            precio: "S/."+rowstotal,
        })
        ]
        );
    
        promise.then(() => {
          const priceCol = sheet.getColumn(5);
    
          // iterate over all current cells in this column
          priceCol.eachCell((cell: any) => {
            const cellValue = sheet.getCell(cell?.address).value;
            // add a condition to set styling
            if (cellValue > 50 && cellValue < 1000) {
              sheet.getCell(cell?.address).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF0000" },
              };
            }
          });
    
          workbook.xlsx.writeBuffer().then(function (data : any) {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `Examenes_realizados_${dateNow}_${HourNow}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
        });

    }




    const exportExcelFile2 = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Reporte Citas por Fecha");
    
        sheet.getRow(1).border = {
          top: { color: { argb: "#060606" } },
          left: { color: { argb: "#060606" } },
          bottom: {  color: { argb: "#060606" } },
          right: { color: { argb: "#060606" } },
        };
    
        sheet.getRow(1).fill = {
          type: "pattern",
          fgColor: { argb: "#060606" },
        };
    
        sheet.getRow(1).font = {
          name: "Comic Sans MS",
          family: 4,
          size: 10,
          bold: true,
        };
    
        sheet.columns = [
          {
            header: "Codigo Cita",
            key: "codigo",
            width: 20,
          },
          { header: "Fecha Cita", key: "fecha", width: 20 },
          {
            header: "Sede",
            key: "sede",
            width: 15,
          },
          {
            header: "Convenio",
            key: "convenio",
            width: 20,
          },
          {
            header: "Doctor",
            key: "doctor",
            width: 25,
          },
          {
            header: "Apellido Paterno Paciente",
            key: "apellidopaterno",
            width: 30,
          },
          {
            header: "Apellido Materno Paciente",
            key: "apellidomaterno",
            width: 30,
          },
          {
            header: "Nombres Paciente",
            key: "nombpaci",
            width: 30,
          },
          {
            header: "Codigo Paciente",
            key: "codigopac",
            width: 15,
          },
          {
            header: "Nro_Documento",
            key: "nrodocument",
            width: 20,
          },
          {
            header: "Genero",
            key: "sexopac",
            width: 20,
          },
          {
            header: "Edad",
            key: "edadpac",
            width: 20,
          },
          {
            header: "Nacionalidad",
            key: "nacionalidad",
            width: 20,
          },
          {
            header: "Precio",
            key: "precio",
            width: 10,
          },
          {
            header: "Descuento",
            key: "preciodescue",
            width: 10,
          },
          {
            header: "Precio Final",
            key: "preciofinal",
            width: 15,
          },
          {
            header: "Codigo Referido",
            key: "codigoRefer",
            width: 20,
          },
          {
            header: "Notas Doctor",
            key: "notasdoc",
            width: 20,
          },
          {
            header: "Telefono",
            key: "telefono",
            width: 20,
          },
          {
            header: "Celular",
            key: "clientephone",
            width: 20,
          },
          {
            header: "Fecha Nacimiento",
            key: "nacimientopac",
            width: 20,
          },
          {
            header: "Distrito",
            key: "distrito",
            width: 20,
          },
          {
            header: "Provincia",
            key: "provincia",
            width: 20,
          },
          {
            header: "Departamento",
            key: "departamento",
            width: 20,
          },
          {
            header: "Direccion",
            key: "direcclient",
            width: 20,
          },
        ];

        const promise = Promise.all([
          rows.map(async (product: any, index: any) => {
            sheet.addRow({
                codigo: product.codigo,
                fecha: product.fecha,
                sede: product.sede,
                convenio:product.convenio, 
                doctor: product.medico,
                codigopac: product.idclient,
                nrodocument: product.dni,
                apellidopaterno: product.apP,
                apellidomaterno: product.apM,
                nombpaci: product.pac2,
                sexopac: product.sexo,
                edadpac: product.edad,
                nacionalidad: product.nationality,
                precio: product.citaprice,
                preciodescue: product.citadescuento,
                preciofinal: product.citafinalprice,
                codigoRefer: product.referercode,
                notasdoc: product.doctornotes,
                telefono: product.tlfclient,
                clientephone: product.phoneclient,
                nacimientopac: product.birthclient,
                distrito: product.distrito,
                provincia: product.provincia,
                departamento: product.departamento,
                direcclient: product.direcclient,
            });
         }),
        ]
        );
    
        promise.then(() => {
          const priceCol = sheet.getColumn(5);
    
          // iterate over all current cells in this column
          priceCol.eachCell((cell: any) => {
            const cellValue = sheet.getCell(cell?.address).value;
            // add a condition to set styling
            if (cellValue > 50 && cellValue < 1000) {
              sheet.getCell(cell?.address).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF0000" },
              };
            }
          });
    
          workbook.xlsx.writeBuffer().then(function (data : any) {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `Citas_Por_Fechas_${dateNow}_${HourNow}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
        });

    }






















    const filt = () => {

        if (fechaCreacion == "" && fecha == "" && textfiltro == "" && textfiltro2 == "") {
            fechatotal()
           return;
        }


    if (fechaCreacion != "" || fecha != "" || textfiltro != "" || textfiltro2 != "") {
        //Filtro por fecha
      if (fecha != "" && fechaCreacion!="") {
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

        setDocTitle(nombtitle)

        setRows(busca)
        const sumar = busca.map((o) => parseFloat(o.citaprice))
        .reduce((previous, current) => {
          return previous + current;
        }, 0);
      setVSumTotal(sumar);
      }

       //Filtro por sedes
       if (textfiltro !="") {
           
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

    setDocTitle(nombtitle)
    setRows(busca2)
    const sumar = busca2.map((o) => parseFloat(o.citaprice))
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
  setVSumTotal(sumar);
    } 

    //Filtro por referencia
    if (textfiltro2 !="") {
           
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

    setDocTitle(nombtitle)
    setRows(busca3)
    const sumar = busca3.map((o) => parseFloat(o.citaprice))
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
  setVSumTotal(sumar);
    } 

    //Filtro por sede al filtro de fecha
    if (textfiltro !="" && fecha != "" && fechaCreacion!="") {
           
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

    setDocTitle(nombtitle)
    setRows(busca4)
    const sumar = busca4.map((o) => parseFloat(o.citaprice))
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
  setVSumTotal(sumar);
    } 


    //Filtro por sede al filtro de fecha
    if (textfiltro2 !="" && fecha != "" && fechaCreacion!="") {
           
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

    setDocTitle(nombtitle)
    setRows(busca5)
    const sumar = busca5.map((o) => parseFloat(o.citaprice))
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
  setVSumTotal(sumar);
    } 

    //Filtro por referencia al filtro por sedes
    if (textfiltro2 !="" && textfiltro !="") {
           
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

    setDocTitle(nombtitle)
    setRows(busca6)
    const sumar = busca6.map((o) => parseFloat(o.citaprice))
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
  setVSumTotal(sumar);
    } 


    //Filtro por referencia y sedes al filtro de fecha
    if (textfiltro2 !="" && textfiltro !="" && fechaCreacion != "" && fecha != "") {
           
        const nombtitle = `Reporte_de_examenes_realizados_${dateNow}_${HourNow}`

    setDocTitle(nombtitle)
    setRows(busca7)
    const sumar = busca7.map((o) => parseFloat(o.citaprice))
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
  setVSumTotal(sumar);
    } 
   

        exportarExcel()
     }
    }

    console.log(rowstotal)

    const borrarFitro = () => {
       setRows(rows3)
       setVSumTotal(0)
       setBloquearBoton(true)
       setFecha("")
       setFechaCreacion("")
       setTextFiltro("")
       setTextFiltro2("")
    }

    const exportarExcel = () => {
        if (busca.length > 0) { 
            setBloquearBoton(false)
        } else if (busca2.length > 0){
            setBloquearBoton(false)
        } else if (busca3.length > 0){
            setBloquearBoton(false)
        } else if (busca4.length > 0){
            setBloquearBoton(false)
        } else if (busca5.length > 0){
            setBloquearBoton(false)
        } else if (busca6.length > 0){
            setBloquearBoton(false)
        } else if (busca7.length > 0){
            setBloquearBoton(false)
        } else if (busca.length == 0){
            setBloquearBoton(true)
        } else if (busca2.length == 0){
            setBloquearBoton(true)
        } else if (busca3.length == 0){
            setBloquearBoton(true)
        } else if (busca4.length == 0){
            setBloquearBoton(true)
        } else if (busca5.length == 0){
            setBloquearBoton(true)
        } else if (busca6.length == 0){
            setBloquearBoton(true)
        } else if (busca7.length == 0){
            setBloquearBoton(true)
        } else if (rows.length == 0){
            setBloquearBoton(true)
        } 
    }
    const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFechaCreacion(event.target.value);
    };
    const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(event.target.value);
    };
    const handleFiltros = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltros(event.target.value);
    };

    

    const handleFiltros2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltros2(event.target.value);
    };

    const handleTextFiltros = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFiltro(event.target.value);
    };

    const handleTextFiltros2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFiltro2(event.target.value);
    };

    let componente: any;


    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200}>
                    <Grid item xs={300}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ width: "1150px" }} className="nav-tabla">
                        <Grid item xs={4}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <MediationIcon style={{ color: "white", fontSize: "35px" }}></MediationIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem"}} >APILIS</InputLabel >
                            </div>
                        </Grid>
                      </div>

                        <Grid container item className='contenedor-tabla-apilis'>
                        <Grid xs={5.3} mt={1}>
                        <Grid container item xs={1} mt={1}></Grid>
                        <Grid container item xs={30} mt={1} className='contenedor-tabla-apilis'>

                        <Grid container item xs={1.5} mt={1}>                          
                           
                        </Grid>



                        <Grid container item xs={4.5} mt={1}>                          
                           <Grid container item xs={15}>                          
                            <TextField InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    maxWidth: "520px"
                                },     
                            }} type="date" value={fechaCreacion} onChange={handleChangeFechaCreacion}focused id="outlined-basic" variant="outlined" /> 
                           </Grid>
                        </Grid>

                       
                        <Grid container item xs={4.5} mt={1}>                          
                           <Grid container item xs={15}>                          
                           <TextField InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    maxWidth: "520px"
                                },     
                            }} type="date" value={fecha} onChange={handleChangFecha} focused id="outlined-basic"  variant="outlined" />      
                           </Grid>
                        </Grid>

                        
                        
                        </Grid>


                        </Grid>

    
                        <Grid>
                        <Grid container item className='contenedor-tabla-apilis contenedor-tabla-apilis2'>

                        <Grid item xs={4} mt={0.1}>
                                <Tooltip title="Limpiar" followCursor>
                                    <Button onClick={filt} fullWidth variant="contained" style={{ width: '15.5ch', height: '3.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>
                                      Limpiar
                                    </Button>
                                </Tooltip>
                        </Grid>

                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        
                        <Grid item xs={4} mt={0.1}>
                                <Grid item xs={6} >
                                <Link to={'/apps/apilis/configure'}>
                                    <Tooltip title="Configurar" followCursor>
                                       <Button  variant="contained"  style={{ width: '15.5ch', height: '3.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>Configurar</Button> 
                                    </Tooltip>
                                </Link>
                                 </Grid>
                                
                        </Grid>

                        </Grid>
                        
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                     
                       
                        
                        <Grid container item>

                        <Grid item xs={5} mt={0.1}>
                                <Tooltip title="Buscar" followCursor>
                                    <Button disabled={bloqueaboton} onClick={exportExcelFile}fullWidth variant="contained" style={{ width: '15.5ch', height: '3.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>
                                      Buscar
                                    </Button>
                                </Tooltip>
                        </Grid>

                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        
                        </Grid>


                        </Grid>
                        </Grid>
                    


                        </div>
                       </div>
                    </Grid>
                </Grid>
            <br></br>
            <div>
            <Grid container>
            <Box sx={{ width: '100%' }} className="card-table-examfinish contenedor-tabla-apilis1">
                <Paper sx={{ width: '100%', borderRadius: "12px", overflowY: "scroll", maxHeight: "30000px", maxWidth: "1500px", mb: 50}} className="contenedor-tabla-apilis1  card-table-general" >
                                    <TableContainer id={"sheetjs"} sx={{width: '100%'}}>
                                        <Table sx={{ width: '100%'}}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead style={{backgroundColor: "rgb(244 241 241)"}}>
                                                <TableRow>
                                                    <TableCell sx={{minWidth: 50}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Codigo
                                                    </TableCell>
                                                    <TableCell sx={{minWidth: 50}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Cod.Apilis
                                                    </TableCell>
                                                    <TableCell sx={{minWidth: 70}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Paciente
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 150}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Examen
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 122}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Fecha Proceso
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Estado
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 01
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 02
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 03
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 04
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 05
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 06
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 07
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 08
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 09
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 10
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 11
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 12
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 13
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 14
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 15
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 16
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 17
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 18
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 19
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 20
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 21
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 22
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 23
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 24
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 25
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 26
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 27
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 28
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 29
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 30
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 31
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 32
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 33
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 34
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 35
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 36
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 37
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 38
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 39
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 40
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
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
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
                                                        </TableCell>
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
                                                        </TableCell>
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
                                                        </TableCell>
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
                                                        </TableCell>
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
                                                        </TableCell>
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
                                                        </TableCell>
                                                        <TableCell
                                                          align="left"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.telFijo}
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
                                            {
                                              rows.length == 0 ? <TableRow >
                                            <TableCell colSpan={8} >
                                              No tiene Procesos
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
                </Paper >


                <div>
                  <Modal
                    keepMounted
                    open={nuevatabla}
                    onClose={handleCloseNuevaTabla}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                   >
                        <Box sx={style2}>
                        <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Filtro por fecha</InputLabel >
                        <Grid container >
                        <Box sx={{ width: '100%' }}>
                            <Grid container mt={2.5} sx={{ placeContent: "center" }}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.8rem" }} >REPORTE DE EXAMENES REALIZADOS - RedLab Perú</InputLabel >
                            </Grid>
                            <Grid container mt={2.5}>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                                <Grid item xs={11} mt={2.5}>
                                    <TableContainer id={"sheetjs2"}>
                                        <Table sx={{ minWidth: 750}}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead>
                                                <TableRow>
                                                <TableCell 
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO CITA
                                                    </TableCell>
                                                    <TableCell 
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        FECHA CITA
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        SEDE
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>
                                                        CONVENIO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DOCTOR
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        APELLIDO PATERNO PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        APELLIDO MATERNO PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NOMBRES PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NRO_DOCUMENTO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        GENERO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        EDAD
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NACIONALIDAD
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRECIO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DESCUENTO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRECIO FINAL
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO REFERIDO
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 250 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NOTAS DOCTOR
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        TELEFONO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CELULAR
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        FECHA NACIMIENTO
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DISTRITO
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PROVINCIA
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DEPARTAMENTO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DIRECCION
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {rows.map((row: any, index: any) =>
                                                    <TableRow
                                                        key={index}
                                                    >
                                                        <TableCell
                                                            align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.codigo}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.fecha}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.sede}
                                                        </TableCell>
                                                        <TableCell sx={{ minWidth: 200 }} align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.convenio}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.medico}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.apP}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.apM}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.pac2}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.idclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.dni}
                                                        </TableCell>
                                                        
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.sexo}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.edad}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.nationality}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.citaprice}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.citadescuento}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.citafinalprice}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.referercode}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.doctornotes}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.tlfclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.phoneclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.birthclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.distrito}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.provincia}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.departamento}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.direcclient}
                                                        </TableCell>

                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                                <Grid container item xs mt={2.5}>
                               <Grid item xs={8} ></Grid>
                            <Grid container item xs={4} spacing={2}>
                              <Grid item xs={20} >
                                <Button onClick={handleCloseNuevaTabla} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                            </Grid>
                
              </Grid>
            </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                        </Box>
                    </Modal>
                </div>


























               
            </Box >
        </Grid>
            </div>

        </Contenido>
    </div>
    );
}


