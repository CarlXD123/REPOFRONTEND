import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import { getAgreementsAllApi, getHeadquartersAllApi, reportExamMonthly, getAppointmentsApi } from "../../../api";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import * as XLSX from 'xlsx';
import { months } from "../../../constant";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import Swal from 'sweetalert2';

export default function TbCitasDate() {
    const ExcelJS = require("exceljs");
    const [rows, setRows] = React.useState<any[]>([]);
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [fecha, setFecha] = React.useState<any>("");
    const [fechaCreacion, setFechaCreacion] = React.useState<any>('');
    const [bloqueaboton, setBloquearBoton] = React.useState<any>(true);
    const [dia, setDia] = React.useState<any>('');
    const [mes, setMes] = React.useState<any>('');
    const [anio, setAnio] = React.useState<any>('');
    const tableRef = React.useRef(null);
    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [convenio, setConvenio] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');
    const [docTitle, setDocTitle] = React.useState<any>("");


    React.useEffect(() => {
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });
        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
        getAppointmentsApi(0, 1000, "", "").then((ag: any) => {
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
                idclient: d.client.id,
                sexo: d.client.genderStr,
                medico: d.Doctor.name,
                sede: d.headquarter.name,

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
              })
            });
            setRows2(mapeado)
            setDocTitle(mapeado.docTitle)
          });
    }, [])

    const busca = rows2.filter(
        (n: any) => ( n.fechaFiltro <= fecha && n.fechaFiltro >= fechaCreacion)
    )  
    console.log(rows)
    console.log(rows2)
    console.log(busca)
    console.log(fecha)
    console.log(fechaCreacion)

    const fechatotal=()=>{
        Swal.fire({
            title: 'Por favor, ingrese los dos rangos de fecha',
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

    const filt = () => {

        if (fechaCreacion == "" && fecha == "") {
            fechatotal()
            return;
        }
        if (fechaCreacion == "") {
            fechainitial()
            return;
        }
        if (fecha == "") {
            fechasecond()
            return;
        }
        setRows(busca)
        exportarExcel()
    }

    let dateNow = moment().format('YYYY-MM-DD');
    let HourNow = moment().format('H-m-s');

    const exportExcelFile2 = () => {
        if (fechaCreacion == "" && fecha == "") {
            fechatotal()
            return;
        }
        if (fechaCreacion == "") {
            fechainitial()
            return;
        }
        if (fecha == "") {
            fechasecond()
            return;
        }
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



    const exportarExcel = () => {
        if (busca.length > 0) { 
            setBloquearBoton(false)
        } else if(busca.length == 0){
            setBloquearBoton(true)
        }
    }
    const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFechaCreacion(event.target.value);
    };
    const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(event.target.value);
    };

    let componente: any;
    return (
        <Grid container >
            <Box sx={{ width: '100%' }} className="card-table-examfinish">
                <Paper sx={{ width: '100%', borderRadius: "12px", overflowY: "scroll", maxHeight: "30000px", mb: 15}} className="card-table-general" >
                    <Grid container spacing={1} mt={2.5}>
                        <Grid item xs={0.5} mt={2.5} ></Grid>
                        <Grid item xs={0.5} mt={2.5} ></Grid>
                        <Grid item xs={0.5} mt={2.5} ></Grid>
                        <Grid container item xs={2} mt={2.5} spacing={1}>
                            <Grid container item md={15} >
                              <TextField type="date" value={fechaCreacion} onChange={handleChangeFechaCreacion}focused fullWidth id="outlined-basic" label="Fecha Inicial*" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid container item xs={2} mt={2.5} spacing={1}>
                            <Grid container item md={15} >
                              <TextField type="date" value={fecha} onChange={handleChangFecha} focused fullWidth id="outlined-basic" label="Fecha Final*" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}>
                                <Tooltip title="Generar Reporte" followCursor>
                                    <Button onClick={filt} fullWidth variant="contained" style={{ width: '15.5ch', height: '6.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }}>
                                      Generar
                                    </Button>
                                </Tooltip>
                        </Grid>

                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>

                        <Grid item xs={0.5} mt={2.5}>
                                <Tooltip title="Descargar Excel" followCursor>
                                    <Button disabled={bloqueaboton} onClick={exportExcelFile2}fullWidth variant="contained" style={{ width: '15.5ch', height: '6.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }}>
                                      Descargar Excel
                                    </Button>
                                </Tooltip>
                        </Grid>

                    </Grid>
                    <br></br>
                    <Grid container >
                        <Box sx={{ width: '100%' }}
                            ref={(ins) => (componente = ins)}>
                            <Grid container mt={2.5} sx={{ placeContent: "center" }}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.8rem" }} >CONSOLIDADO DE CITAS POR FECHA</InputLabel >
                            </Grid>
                            <Grid container mt={2.5}>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                                <Grid item xs={11} mt={2.5}>
                                    <TableContainer id={"sheetjs"}>
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
                                                        DOCTOR
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
                                                            {row.medico}
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
                            </Grid>
                        </Box>
                    </Grid>
                </Paper >
            </Box >
        </Grid>
    );
}


