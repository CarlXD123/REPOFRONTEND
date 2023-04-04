import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getBrandAllApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link } from 'react-router-dom';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';

export default function Configure() {
    const [marcaList, setMarcaList] = React.useState<any[]>([]);


    React.useEffect(() => {
        getBrandAllApi(0, 5000, 0).then((ag: any) => {
          setMarcaList(ag.data)
        });
    }, [])

   
    let componente: any;
    console.log(marcaList.length)

    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200} sx={{mb: 50}}>
                    <Grid item xs={300}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ display: "flex", width: "1150px" }} className="nav-tabla">
                        <Grid item xs={6}>
                        <Link to={"/apps/apilis"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem", cursor: "pointer"}} >APILIS / CONFIGURACION</InputLabel >
                            </div>
                        </Link>
                        </Grid>
                      </div>

                        <br></br>
                        <br></br>

                        <Grid container item className='contenedor-tabla-apilis'>
                        <Grid xs={8} mt={1}>
                        <Grid container item xs={1} mt={1}></Grid>
                        <Grid container item xs={30} mt={1} className='contenedor-tabla-apilis'>

                        <Grid container item xs={5} mt={1}>                          
                           
                        </Grid>

                      
                        <Grid container item xs={4.5} mt={1} className="contenedor-tabla-configure">                          
                           <Grid container item xs={15} className="contenedor-tabla-configure">  
                           <Link to={'/apps/apilis/configure/marca'}>                        
                           <Box
                            className="card-container"
                            sx={{
                            width: 300,
                            height: 150,
                            backgroundColor: 'primary.dark',
                            boxShadow: '0px 0px 15px -5px',
                            transition: '0.3s',
                            animation:'ease-in',
                            }}
                          >
                          <Grid container item xs={15} sx={{ placeContent: "center" }} style = {{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>
                            <br></br>
                            MAQUINAS
                            <br></br>
                            <br></br>
                            {marcaList.length+" marcas"}
                          </Grid>
                          </Box>
                          </Link>
                           </Grid>
                        </Grid>

                       
                        </Grid>


                        </Grid>

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


