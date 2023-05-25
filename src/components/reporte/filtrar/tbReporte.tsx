import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import { getAgreementsAllApi, getHeadquartersAllApi, reportExamMonthly } from "../../../api";
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TbReporte() {
    
    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [sedeList, setSedeList] = React.useState<any[]>([]);



    React.useEffect(() => {
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });
        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
    }, [])
   
    let componente: any;
    return (
        <Grid container className='tabla-componente card-table-examfinish contenedor-tabla-apilis contenedor-tabla-apilis2' >
            <Box sx={{ width: '100%' , overflowY: "scroll", maxHeight: "800px"}}>
                <br></br>
                <br></br>
                <Paper sx={{ width: '100%', borderRadius: "12px", overflowY: "scroll", minHeight: "480px" }} className="card-table-general contenedor-tabla-apilis2" >
                    <Grid container spacing={1} mt={2.5}>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid container item xs={10} sm={5} mt={2.5} spacing={1} className="contenedor-tabla-apilis2 contenedor-tabla-apilis">
                          <h3>REPORTE CITAS POR FECHA</h3>
                            <Grid item xs={6} className="contenedor-tabla-apilis2 contenedor-tabla-apilis">
                              <Link to={'/apps/report/exam/reportDate'}>
                                <Tooltip title="Citas por fecha" followCursor>
                                    <Button fullWidth variant="contained" style={{ width: '20.5ch', height: '6.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }} startIcon={<CalendarMonthIcon />}>
                                        Citas por fecha
                                    </Button>
                                </Tooltip>
                               </Link>
                            </Grid>
                        </Grid>

                        <Grid container item xs={20} sm={5} mt={2.5} spacing={1} className="contenedor-tabla-apilis2 contenedor-tabla-apilis">
                          <h3>REPORTE DE EXAMENES REALIZADOS </h3>
                            <Grid item xs={6} className="contenedor-tabla-apilis2 contenedor-tabla-apilis">
                              <Link to={'/apps/report/exam/reportExamFin'}>
                                <Tooltip title="Examenes realizados" followCursor>
                                    <Button fullWidth variant="contained" style={{ width: '28.5ch', height: '6.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }} startIcon={<CalendarMonthIcon />}>
                                        Examenes realizados
                                    </Button>
                                </Tooltip>
                               </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                    </Grid>
                    <br></br>
                    
                </Paper >
            </Box >
        </Grid>
    );
}


