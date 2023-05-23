import { Button, CardContent, Grid, InputLabel, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getTypeAgreementsAllApi, saveAgreementApi, getHeadquartersAllApi } from "../../../api";
import { Link } from "react-router-dom";
import { Modal } from "@material-ui/core";
import Swal from 'sweetalert2';

export default function TbRegConvenios() {

    //#region GET-SET textfield
    const [tipoList, setTipoList] = React.useState<any[]>([]);
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [tipo, setTipo] = React.useState<any>('');
    const [sede, setSede] = React.useState<any>('');
    const [nombre, setNombre] = React.useState<any>('');
    const [telefono, setTelefono] = React.useState<any>('');
    const [direccion, setDireccion] = React.useState<any>('');
    const [ruc, setRuc] = React.useState<any>('');
    const [correo, setCorreo] = React.useState<any>('');
    const [descripcion, setDescripcion] = React.useState<any>('');
    const [guardarConvenio, setAbrirGuardarConvenio] = React.useState<any>(false);
    const [errorTipo, setAbrirTipo] = React.useState<any>(false);
    const [errorNombreConvenio, setAbrirNombreConvenio] = React.useState<any>(false);
    const [guardarConvenioError, setAbrirGuardarConvenioError] = React.useState<any>(false);
    //#endregion

    //#region handles de Vistas
    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipo(event.target.value);

    };
    const handleChangeSede = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSede(event.target.value);
    };
    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };
    const handleChangeTelefono = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelefono(event.target.value);
    };
    const handleChangeDireccion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDireccion(event.target.value);
    };
    const handleChangeRuc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRuc(event.target.value);
    };
    const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };
    const handleChangeDescripcion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
    };

    const handleCloseAbrirGuardarConvenio = () => {
        setAbrirGuardarConvenio(false);
    }

    const handleCloseAbrirTipoFalta = () => {
        setAbrirTipo(false);
    }

    const handleCloseAbrirErrorNombreConvenio = () => {
        setAbrirNombreConvenio(false);
    }


    const handleCloseAbrirGuardarConvenioError = () => {
        setAbrirGuardarConvenio(false);
    }

    var convenioCreate=()=>{
        Swal.fire({
            title: 'El convenio fue creado exitosamente',
            icon: 'success',
        })
    }

    var convenioDenied=()=>{
        Swal.fire({
            title: 'El convenio no fue creado',
            icon: 'warning',
        })
    }

    var convenioTipo=()=>{
        Swal.fire({
            title: 'Seleccione el tipo de convenio',
            icon: 'warning',
        })
    }

    var convenioTipoName=()=>{
        Swal.fire({
            title: 'Seleccione el nombre del convenio',
            icon: 'warning',
        })
    }
    //#endregion
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {
        //#region llamadas al servicio
        getTypeAgreementsAllApi().then((ag: any) => {
            setTipoList(ag.data)
        });

        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data)
        });
        //#endregion
    }, []);

    const guardar = () => {
        let mError = "";
        let error = false;
        if (tipo == "" || tipo == undefined) {
            //setAbrirTipo(true);
            convenioTipo()
            error = true;
        }
        if (nombre == "") {
            //setAbrirNombreConvenio(true);
            convenioTipoName()
            error = true;
        }
        if (error) {
            //alert(mError);
            return;
        }
        saveAgreementApi({
            "name": nombre,
            "tlfNumber": telefono,
            "address": direccion,
            "ruc": ruc == "" ? null : ruc,
            "email": correo,
            "description": descripcion,
            "TypeAgreementId": tipo,
            "HeadquartersId": sede,
        }).then((ag: any) => {
            if (ag.status) {
                //alert(ag.message.text)
                //setAbrirGuardarConvenio(true);
                convenioCreate()
                window.location.href = '/apps/agreements'
            } else {
                //alert(ag.message.text)
                //setAbrirGuardarConvenioError(true);
                convenioDenied()
            }
        })
    }

    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container item >
                        <Link to={"/apps/agreements"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Convenios</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs md={8}>
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400" }} className="text-responsive-edit">Registrar Convenios</div >
                        </Grid>
                        <Grid item xs md={4} mt={1.5}>
                            <Button onClick={guardar} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <br></br>
                    <br></br>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid container item md={2} >
                                    <TextField id="outlined-basic" label="Tipo *" variant="outlined"
                                        select fullWidth value={tipo} onChange={handleChangeType}
                                        helperText="Por favor seleccione uno"
                                    >
                                        {tipoList.map((row: any, index: any) => {
                                            return (
                                                <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                            )
                                        })}

                                    </TextField>
                                </Grid>
                            
                                <Grid container item md={10}>
                                    <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombre} onChange={handleChangeNombre} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={0.5}>
                                <Grid container item md={6} >
                                    <TextField fullWidth id="outlined-basic" label="Teléfono" variant="outlined" value={telefono} onChange={handleChangeTelefono} />
                                </Grid>
                                <Grid  container item md={6}>
                                    <TextField fullWidth id="outlined-basic" label="Dirección" variant="outlined" value={direccion} onChange={handleChangeDireccion} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={0.5}>
                                <Grid container item md={6}>
                                    <TextField fullWidth id="outlined-basic" label="RUC" variant="outlined" value={ruc} onChange={handleChangeRuc} />
                                </Grid>
                                <Grid container item md={6}>
                                    <TextField fullWidth id="outlined-basic" label="Correo" variant="outlined" value={correo} onChange={handleChangeCorreo} />
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid container item md={12} mt={1.5}>
                                    <TextField id="outlined-basic"
                                        label="Descripción"
                                        variant="outlined"
                                        multiline fullWidth rows={4}
                                        value={descripcion}
                                        onChange={handleChangeDescripcion} />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </div >

                <div>
                    <Modal
                        keepMounted
                        open={guardarConvenio}
                        onClose={handleCloseAbrirGuardarConvenio }
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro Convenio Exitoso!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirGuardarConvenio} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={guardarConvenioError}
                        onClose={handleCloseAbrirGuardarConvenioError }
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro Erroneo!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirGuardarConvenioError} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={errorTipo}
                        onClose={handleCloseAbrirTipoFalta}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Seleccione el Tipo de Convenio!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirTipoFalta} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={errorNombreConvenio}
                        onClose={handleCloseAbrirErrorNombreConvenio}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Escriba el nombre del Convenio!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirErrorNombreConvenio} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
            </Contenido>
        </div>
    )
}


