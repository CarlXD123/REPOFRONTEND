import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getBrandAllApi, saveBrandApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link } from 'react-router-dom';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';

export default function NuevaMarca() {
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);
    const [marcaList, setMarcaList] = React.useState<any[]>([]);

    const [nommarca, setNomMarca] = React.useState<any>("");
    const [descrMarca, setDescrMarca] = React.useState<any>('');
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);


    React.useEffect(() => {
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

    const NomBrand=()=>{
      Swal.fire({
          title: 'Ingrese el nombre de la marca',
          icon: 'warning',
        })
    }

    const DescrBrand=()=>{
      Swal.fire({
          title: 'Ingrese descripcion de la marca',
          icon: 'warning',
        })
    }

    const BrandSuccess=()=>{
      Swal.fire({
          title: 'Marca agregada',
          icon: 'success',
        })
    }

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const crearMarca = () => {
      if (nommarca== "") {
          NomBrand()
          return;
      }

      if (descrMarca== "") {
        DescrBrand()
        return;
    }
     
      saveBrandApi({
          Descr: descrMarca,
          nameBrand: nommarca.toUpperCase(),
          Color: "#"+randomColor

      }).then((x: any) => {
          if (x.status) {
              //alert(x.message.text);
              BrandSuccess()
              window.location.href = '/apps/apilis/configure/marca'
              setNomMarca("");
              setDescrMarca("");
              getBrandAllApi(0, 5000, 0).then((ag: any) => {
                  setMarcaList(ag.data);
              });
          } else {
              //alert(x.text);
             
              return;
          }
      })
  }

   
    const handleChangeMarca = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomMarca(event.target.value);
    };
    let componente: any;


    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200} sx={{mb: 50}}>
                    <Grid item xs={300} sx={{ placeContent: "center" }}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ display: "flex",  width: "1150px" }} className="nav-tabla">
                        
                        <Grid container item></Grid>
                        <Grid container item></Grid>
                        <Grid container item></Grid>
                        <Grid container item></Grid>
                        <Grid container item></Grid>
                        <Grid container item></Grid>
                        
                        <Grid container item>
                            <Tooltip title="Guardar" followCursor>
                                <Button onClick={crearMarca} variant="contained" style={{ width: '18.5ch', height: '4.2ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>Guardar</Button>
                            </Tooltip>
                        </Grid>
                      </div>


                        <br></br>
                        <br></br>
                        <Grid xs={1000} mt={1} sx={{ placeContent: "center" }}>

                        <Grid item xs={10}>
                        <Link to={"/apps/apilis/configure/marca"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.4rem", cursor: "pointer"}} >APILIS / CONFIGURACION / MARCA / NUEVO</InputLabel >
                            </div>
                        </Link>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid container sx={{ placeContent: "center" }} xs={1000} mt={1} className='contenedor-tabla-apilis'>
                        <Box
                            sx={{
                            width: 400,
                            height: 400,
                            backgroundColor: 'primary.dark',
                            
                            }}
                        >
                            <br></br>
                            <br></br>
                            <Grid container sx={{ placeContent: "center" }}>
                            <TextField placeholder="Nombre de la Marca" InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    width: "300px"
                                },     
                            }} type="text" value={nommarca} onChange={handleChangeMarca}focused id="outlined-basic" variant="outlined" /> 
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container sx={{ placeContent: "center" }}>
                            <textarea
                            placeholder="Descripcion" 
                            value={descrMarca} 
                            onChange={e => setDescrMarca(e.target.value)}
                            name="postContent"
                            rows={15}
                            cols={37}
                            /> 
                            </Grid>



                        </Box>
                        </Grid>

                        </Grid>

    
                        <Grid>
                        
                        </Grid>
                        
                    


                        </div>
                       </div>
                    </Grid>
                </Grid>
            <br></br>
            <div>
            
            </div>

        </Contenido>
    </div>
    );
}


