import { Box, Button, Grid, InputLabel, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import { getAgreementsAllApi, getHeadquartersAllApi, getEmployeeApi, getExaminationValuesByExamId, getExamValuesApi, getAppointmentApi, getAppointmentsApi, getAppointmentPatientApi, reportExamMonthly } from "../../api";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import logo from '../../img/logo-redlab.png'
import logobg from '../../img/logo-redlab-bg.png'
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import { cp } from "fs/promises";

export default function TbPatientExamination() {

    const { id } = useParams();
    const [rows, setRows] = React.useState<any[]>([]);
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);
    const [abrirResultado, setAbrirResultado] = React.useState<any>(false);

    const [nombreCompleto, setNombreCompleto] = React.useState<any>("");
    const [edad, setEdad] = React.useState<any>("");
    const [dni, setDni] = React.useState<any>("");
    const [sexo, setSexo] = React.useState<any>("");
    const [codigo, setCodigo] = React.useState<any>("");
    const [medico, setMedico] = React.useState<any>("");
    const [fecha, setFecha] = React.useState<any>("");
    const [sede, setSede] = React.useState<any>("");
    const [firma, setFirma] = React.useState<any>("");

    const [sedeUser, setSedeUser] = React.useState<any>("");
    const [telfUser, setTelfUser] = React.useState<any>("");
    const [correoUser, setCorreoUser] = React.useState<any>("");

    const [docTitle, setDocTitle] = React.useState<any>("");
    const [examenLista, setExamenLista] = React.useState<readonly string[]>([]);
    const [direccion, setDireccion] = React.useState<any>("");
    const dato = localStorage.getItem('dataUser')??"{}"
          
    const info = JSON.parse(dato);
    const handleCloseResultado = () => {
        setAbrirResultado(false);
    }

    function getCurrentDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let auxDay = date.getDate() < 10 ? "0" : "";
        // return `${auxDay}${date.getDate()}_${month}_${date.getFullYear()}`; (dd_mm_yyyy)
        return `${auxDay}${date.getDate()}${month}${date.getFullYear()}`; // (ddmmyyyy)
      }

    React.useEffect(() => {
        getAppointmentsApi(0, 1000, "E", "").then((ag: any) => {
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
                clientid:d.ClientId,
                sede: d.headquarter.name
    
              })
            });
            setRows(mapeado)
          });
          getAppointmentPatientApi(info.person.id).then((x: any) => {
            setRows2(x.data)
          })
          

    }, [])
   
    const handleAbrirResultado = async (obj: any) => {
        setAbrirResultado(true);
        setNombreCompleto(obj.client.name+" "+obj.client.lastNameP+" "+obj.client.lastNameM)
        setEdad(obj.client.years)
        setDni(obj.client.dni)
        setSexo(obj.client.gender)
        setCodigo(obj.code)
        setMedico(obj.Doctor.name)
        setFecha(obj.dateAppointmentEU)
        setCorreoUser(obj.headquarter.email)
        setSede(obj.headquarter.name)
        setTelfUser(obj.headquarter.tlfNumber)
        setSedeUser(obj.headquarter.name)
        setDireccion(obj.headquarter.address)
        setFirma(obj.Empleado.url)
        setDocTitle( obj.code + "_" + obj.client.code + "_" + obj.client.name + "_" + obj.client.lastNameP + "_" + obj.client.lastNameM + "_" + getCurrentDate())
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
          let x = await getEmployeeApi(info.person.id)
          console.log(x);
        }
    
    
    
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


    console.log(rows2)
    console.log(rows)
    let componente: any;
    return (
        <Grid container >
            <Box sx={{ width: '100%' }}  className="card-table-general">
                <Paper sx={{ width: '100%', borderRadius: "12px", overflowY: "scroll", maxHeight: "480px", mb: 10}} className="card-table-general" >
                    <Grid container spacing={1} mt={2.5}>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid container >
                        <Box sx={{ width: '100%' }}
                            ref={(ins) => (componente = ins)}>
                            <Grid container mt={2.5} sx={{ placeContent: "center" }}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.8rem" }} >EXAMENES REALIZADOS</InputLabel >
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
                                                        CODIGO
                                                    </TableCell>
                                                    <TableCell 
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        FECHA
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        HORA
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>
                                                        PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRECIO FINAL
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        IMPRIMIR
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {rows2.map((row: any, index: any) =>
                                                    <TableRow
                                                        key={index}
                                                    >
                                                        <TableCell
                                                            align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.code}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.dateAppointmentEU}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.time12h}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.client.name+" "+row.client.lastNameP+" "+row.client.lastNameM}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.finalPrice}
                                                        </TableCell>
                                                       
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            <div style={{ paddingLeft: "5px" }}>
                                                              <Tooltip title="Imprimir Resultado" followCursor>
                                                                  <Button onClick={() => handleAbrirResultado(row)} variant="contained" className='boton-icon'>
                                                                      <LocalPrintshopRoundedIcon />
                                                                  </Button>
                                                              </Tooltip>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                 {
                                                   rows2.length == 0 ? <TableRow >
                                                    <TableCell colSpan={8} >
                                                       No tiene examenes realizados
                                                    </TableCell>
                                                   </TableRow> : ""
                                                 }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                            </Grid>
                        </Box>
                    </Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                    </Grid>
                    <br></br>
                    
                </Paper >






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

















            </Box >
        </Grid>
    );
}


