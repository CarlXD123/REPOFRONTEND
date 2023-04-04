import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, saveModelApi, savePathApi, getRefererApi,  getAmbAllApi, getBrandApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link, useParams } from 'react-router-dom';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import TablePagination from '@mui/material/TablePagination';
import MediationIcon from '@mui/icons-material/Mediation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

export default function NuevoModelo() {
    const { id } = useParams();
    const [fecha, setFecha] = React.useState<any>("");
    const [fechaCreacion, setFechaCreacion] = React.useState<any>('');
    const [nommodelo, setNomModelo] = React.useState<any>("");
    const [user, setUser] = React.useState<any>("");
    const [passw, setPassw] = React.useState<any>("");
    const [env, setEnv] = React.useState<any>("");
    const [nombre, setNombre] = React.useState<any>([]);
    const [ambList, setAmbList] = React.useState<any[]>([]);

    const [filtros, setFiltros] = React.useState<any>('');
    const [filtros2, setFiltros2] = React.useState<any>('');
    const [textfiltro, setTextFiltro] = React.useState<any>('');
    const [textfiltro2, setTextFiltro2] = React.useState<any>('');
    const [nuevatabla, setNuevaTabla] = React.useState<any>(false);
    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [referenciaList, setReferenciaList] = React.useState<any[]>([]);
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);

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

    React.useEffect(() => {
        getBrandApi(id).then((x: any) => {
            setNombre(x.data.nameBrand)
        })

        getAmbAllApi().then((ag: any) => {
            setAmbList(ag.data)
        });

    }, [])
    
    console.log(nombre)
    const [api, setApi] = React.useState<any>("http://localhost:5000/api/brand");
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const crearModel = () => {
        if (nommodelo== "") {
            //NomBrand()
            return;
        }
  
       
        saveModelApi({
            nameModel: nommodelo.toUpperCase(),
            Color: "#"+randomColor,
            user: user,
            passw: passw,
            env: env,
            Api: api,
            idBrand: id
  
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                //BrandSuccess()
                window.location.href = '/apps/apilis/configure/marca/'+ id +'/modelos'
                //setNomMarca("");
                //setDescrMarca("");
                
            } else {
                //alert(x.text);
               
                return;
            }
        })


    }
    
   
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


    const handleChangeModelo= (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomModelo(event.target.value);
    };
    const handleChangeUser= (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    };
    const handleChangePassw= (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassw(event.target.value);
    };
    const handleChangeEnv= (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnv(event.target.value);
    };
    const handleChangeApi= (event: React.ChangeEvent<HTMLInputElement>) => {
        setApi(event.target.value);
    };
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
                                <Button onClick={crearModel} variant="contained" style={{ width: '18.5ch', height: '4.2ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>Guardar</Button>
                            </Tooltip>
                        </Grid>
                      </div>


                        <br></br>
                        <br></br>
                        <Grid xs={1000} mt={1} sx={{ placeContent: "center" }}>

                        <Grid item xs={10}>
                        <Link to={"/apps/apilis/configure/marca/"+ id + "/modelos"}>  
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.4rem", cursor: "pointer"}} >APILIS / CONFIGURACION / MODELO / NUEVO</InputLabel >
                            </div>
                        </Link>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid container sx={{ placeContent: "center" }} xs={1000} mt={1} className='contenedor-tabla-apilis'>
                        <Box
                            sx={{
                            width: 400,
                            height: 410,
                            backgroundColor: 'primary.dark',
                            
                            }}
                        >
                            <br></br>
                            <br></br>
                            <Grid container sx={{ placeContent: "center" }}>
                            <TextField placeholder="Nombre del Modelo" InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    width: "300px"
                                },     
                            }} type="text" value={nommodelo} onChange={handleChangeModelo}focused id="outlined-basic" variant="outlined" /> 
                            </Grid>
                            <br></br>
                            <Grid container sx={{ placeContent: "center" }}>
                            <TextField placeholder="API" InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    width: "300px"
                                },     
                            }} type="text" value={api} onChange={handleChangeApi}focused id="outlined-basic" variant="outlined" /> 
                            </Grid>
                            <br></br>
                            <Grid container sx={{ placeContent: "center" }}>
                            <TextField placeholder="Usuario" InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    width: "300px"
                                },     
                            }} type="text" value={user} onChange={handleChangeUser}focused id="outlined-basic" variant="outlined" /> 
                            </Grid>
                            <br></br>
                            <Grid container sx={{ placeContent: "center" }}>
                            <TextField placeholder="Contraseña" InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    width: "300px"
                                },     
                            }} type="text" value={passw} onChange={handleChangePassw}focused id="outlined-basic" variant="outlined" /> 
                            </Grid>
                            <br></br>
                             <Grid container sx={{ placeContent: "center" }}>
                            <TextField select label="Tipo Ambiente" InputProps={{
                                style: {
                                    backgroundColor: "white", 
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    width: "300px"
                                },     
                            }}  value={env} onChange={handleChangeEnv} id="outlined-basic" variant="outlined" > 

                               {ambList.map((row: any, index: any) => {
                                    return (
                                     <MenuItem key={index} value={row.label}>{row.label}</MenuItem>
                                    )
                                })}
                            </TextField>
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


