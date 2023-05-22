import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getHeadquartersAllApi, reportExamMonthly } from "../../../api";
import { Link } from 'react-router-dom';
import { months } from "../../../constant";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import { Contenido } from "../../Home";
import TbReporte from "./tbReporte";
import TbCitasDate from "./tbCitasDate";

export default function TbReporteDate() {
    const [rows, setRows] = React.useState<any[]>([]);

    const [dia, setDia] = React.useState<any>('');
    const [mes, setMes] = React.useState<any>('');
    const [anio, setAnio] = React.useState<any>('');

    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [convenio, setConvenio] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');



    React.useEffect(() => {
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });
        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
    }, [])
    const handleChangeDia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDia(event.target.value);
    };
    const handleChangeMes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMes(event.target.value);
    };
    const handleChangeAnio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnio(event.target.value);
    };
    const handleChangeConvenio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConvenio(event.target.value);
    };
    const handleChangeSede = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSede(event.target.value);
    };


    let componente: any;
    return (
        <div className='tabla-componente card-table-general'>
        <Contenido>
            <Grid container>
                <Grid container item xs={12} spacing={2} style={{ alignItems: "center" }}>
                    <Grid item xs={8}>
                        <Link to={"/apps/report/exam"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem", cursor: "pointer" }} >Reportes / Citas por fecha</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <br></br>
            <div>
                <TbCitasDate />
            </div>

        </Contenido>
    </div>
    );
}


