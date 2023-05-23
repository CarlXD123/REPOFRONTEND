import { Button, CardContent, Grid, InputLabel, MenuItem, Tab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Tabs } from '@mui/material';
import { getDistrictsForProvince, savePatientApi, getUserApi, getPagedEmployeesApi, getPagedPatientsApi, getPagedTypeDocsApi, getNationAllApi, saveNationApi, getProvincesForRegion, getRegionsApi, getTypeDocsApi, getPatientApi, editPatientApi } from "../../../api";
import { civilStatus, genders, nationality } from "../../../constant";
import { Link, useParams } from "react-router-dom";
import { Modal } from "@material-ui/core";
import moment from "moment";
import Swal from 'sweetalert2';

export default function TbEditarPaciente() {

    const { id, userid } = useParams();

    const getAgeFromBirthday = (birthday: any) => {
        if (birthday) {
            let totalMonths = +moment().diff(birthday, 'months');
            let years = totalMonths / 12;
            let months = totalMonths % 12;
            if (months !== 0) {
                return parseInt(years + "");
            }
            return years;
        }
        return null;
    }

    const [values, setValues] = React.useState<string>("1");
    //#region GET-SET textfield

    const [nationList, setNationList] = React.useState<any[]>([]);
    const [tipoDocList, setTipoDocList] = React.useState<any[]>([]);
    const [tipoDoc, setTipoDoc] = React.useState<any>('');
    const [numDoc, setNumDoc] = React.useState<any>('');
    const [numHistoria, setNumHistoria] = React.useState<any>('');
    const [nombres, setNombres] = React.useState<any>('');
    const [apePa, setApePa] = React.useState<any>('');
    const [apeMa, setApeMa] = React.useState<any>('');
    const [genero, setGenero] = React.useState<any>('');
    const [estadoCivil, setEstadoCivil] = React.useState<any>('');
    const [feNacimiento, setFeNacimiento] = React.useState<any>('');
    const [edad, setEdad] = React.useState<any>('');
    const [nacionalidad, setNacionalidad] = React.useState<any>('');
    const [nombreNation, setNombreNation] = React.useState<any>('');
    const [descripcionNation, setDescripcionNation] = React.useState<any>('');
    const [abrirNation, setAbrirNation] = React.useState<any>(false);

    const [regionList, setRegionList] = React.useState<any[]>([]);
    const [region, setRegion] = React.useState<any>('');
    const [provinciaList, setProvinciaList] = React.useState<any[]>([]);
    const [provincia, setProvincia] = React.useState<any>('');
    const [distritoList, setDistritoList] = React.useState<any[]>([]);
    const [distrito, setDistrito] = React.useState<any>('');
    const [direcLugar, setDirecLugar] = React.useState<any>('');

    const [rows, setRows] = React.useState<any>([]);
    const [rows2, setRows2] = React.useState<any>([]);
    const [rows3, setRows3] = React.useState<any>([]);

    const [correo, setCorreo] = React.useState<any>('');
    const [telMovil, setTelMovil] = React.useState<any>('');
    const [telFijo, setTelFijo] = React.useState<any>('');
    //#endregion

    //#region handles de Vistas

    //#region Primera Vista(Datos Personales)
    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        setValues(newValue);
    };
    const handleChangeTypeDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoDoc(event.target.value);
    };
    const handleChangeNumDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumDoc(event.target.value);
    };
    const handleChangeNumHistoria = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumHistoria(event.target.value);
    };

    const handleChangeNombres = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombres(event.target.value);
    };
    const handleChangeApePa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApePa(event.target.value);
    };
    const handleChangeApeMa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApeMa(event.target.value);
    };
    const handleChangeGenero = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenero(event.target.value);
    };
    const handleChangeEstadoCivil = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoCivil(event.target.value);
    };
    const handleChangeFeNacimiento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeNacimiento(event.target.value);
        setEdad(getAgeFromBirthday(event.target.value));
    };
    const handleChangeEdad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdad(event.target.value);
    };
    const handleChangenacionalidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNacionalidad(event.target.value);
    };
    const handleChangeNombreNation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreNation(event.target.value);
    };
    const handleChangeDescripcionNation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionNation(event.target.value)
    }
    //#endregion

    //#region Segunda Vista(Domicilio)
    const handleChangeRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(event.target.value);
        getProvincesForRegion(event.target.value).then((ag: any) => {
            setProvinciaList(ag.data)
        })
    };
    const handleChangeProvincia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvincia(event.target.value);
        getDistrictsForProvince(event.target.value).then((ag: any) => {
            setDistritoList(ag.data)
        })
    };
    const handleChangeDistrito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistrito(event.target.value);
    };
    const handleChangeDirecLugar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirecLugar(event.target.value);
    };
    //#endregion

    //#region Tercera Vista(Datos de contacto)
    const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };
    const handleChangeTelMovil = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelMovil(event.target.value);
    };
    const handleChangeTelFijo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelFijo(event.target.value);
    };
    const handleCloseNation = () => {
        setAbrirNation(false);
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
    //#endregion

    React.useEffect(() => {
        //#region llamadas al servicio
        getPagedTypeDocsApi ().then((ag: any) => {
            setTipoDocList(ag.data)
        });
        getRegionsApi().then((ag: any) => {
            setRegionList(ag.data);
        });
        getNationAllApi().then((ag: any) => {
            setNationList(ag.data)
        });
        getUserApi().then((ag: any) => {
            setRows3(ag.data)
        });
        getPatientApi(id).then((ag: any) => {
            setTipoDoc(ag.data.typeDoc.id)
            setNumDoc(ag.data.typeDoc.dni)
            setNombres(ag.data.person.name)
            setApePa(ag.data.person.lastNameP)
            setApeMa(ag.data.person.lastNameM)
            setTelMovil(ag.data.person.phoneNumber)
            setTelFijo(ag.data.person.tlfNumber)
            if(ag.data.person.gender!="" || ag.data.person.gender!=null){
                setGenero(ag.data.person.gender)
            }else{
                setGenero("")
            }
            if(ag.data.person.civilStatus!="" || ag.data.person.civilStatus!=null){
               setEstadoCivil(ag.data.person.civilStatus)
            }else{
                setEstadoCivil("")
            }            
            setFeNacimiento(ag.data.person.birthDateUS)
            setNumHistoria(ag.data.person.historyNumber)
            setEdad(getAgeFromBirthday(ag.data.person.birthDateUS))
            setNacionalidad(ag.data.nacion.value == null ? "" : ag.data.nacion.value)
            setRegion(ag.data.region.value == null || ag.data.region.value == "" ? "" : ag.data.region.value)
            if (ag.data.region.value != null || ag.data.region.value != "") {
                getProvincesForRegion(ag.data.region.value).then((x: any) => {
                    setProvinciaList(x.data)
                })
            } else {
                setProvincia("")
            }
            setProvincia(ag.data.province.value == null || ag.data.province.value == "" ? "" : ag.data.province.value)
            if (ag.data.province.value != null || ag.data.province.value != "") {
                getDistrictsForProvince(ag.data.province.value).then((x: any) => {
                    setDistritoList(x.data)
                })
            } else {
                setDistrito("")
            }
            setDistrito(ag.data.district.value == null || ag.data.district.value == "" ? "" : ag.data.district.value)
            setDirecLugar(ag.data.person.address)
            setCorreo(ag.data.user.username)
            setTelMovil(ag.data.person.phoneNumber)
            setTelFijo(ag.data.person.tlfNumber)
        })
        //#endregion
        getPagedPatientsApi(0, 1000).then((ap: any) => {
            let mapeado: any = [];
            ap.data.forEach((d: any) => {
              mapeado.push({
                tipoDocumento: d.typeDoc.name,
                dni: d.typeDoc.dni,
                nombreCompleto: d.person.name + " " + d.person.lastNameP + " " + d.person.lastNameM,
                numHistoriaCli: d.person.historyNumber,
                nombre: d.person.name,
                apellidoPa: d.person.lastNameP,
                apellidoMa: d.person.lastNameM,
                genero: d.person.genderStr,
                estCivil: d.person.civilStatusStr,
                fechaNacimiento: d.person.birthDate,
                nacionalidad: d.person.nationality,
    
                region: d.region.name,
                provincia: d.province.name,
                distrito: d.district.name,
                direcLugar: d.person.address,
    
    
                correo: d.user.username,
                telMovil: d.person.phoneNumber,
                telFijo: d.person.tlfNumber,
                numdoc: d.person.dni,
    
                id: d.person.id,
                userid: d.user.id
              })
            });
            setRows(mapeado)
          });

          getPagedEmployeesApi(0, 1000).then((ag: any) => {
            let mapeado: any = [];
            ag.data.forEach((d: any) => {
              mapeado.push({
                tipoDocumento: d.typeDoc.name,
                dni: d.typeDoc.dni,
                nombreCompleto: d.person.name + " " + d.person.lastNameP + " " + d.person.lastNameM,
                nombre: d.person.name,
                apellidoPa: d.person.lastNameP,
                apellidoMa: d.person.lastNameM,
                telMovil: d.person.phoneNumber,
                telFijo: d.person.tlfNumber,
                genero: d.person.genderStr,
                estCivil: d.person.civilStatusStr,
                fechaNacimiento: d.person.birthDate,
                fechaAdmision: d.person.admissionDate,
    
                region: d.region.name,
                provincia: d.province.name,
                distrito: d.district.name,
                direccion: d.person.typeDirectionStr,
                referencia: d.person.referencePoint,
                direcLugar: d.person.address,
    
                especialidad: d.speciality.name,
                cargo: d.typeEmployee.name,
                profesion: d.profession.name,
                colegiaturaUno: d.tuition.name,
                colegiaturaUnoDes: d.tuition.tuitionNumber,
                colegiaturaDos: d.tuition2.name,
                colegiaturaDosDes: d.tuition2.tuitionNumber,
                firma: d.person.digitalSignatureUrl,
    
                correo: d.user.username,
                roles: d.roles[0].name,
                sede: d.headquarter.name,
    
    
                id: d.person.id,
                userid: d.user.id
              })
            });
            setRows2(mapeado)
          });

    }, []);


    const handleOpenNation = () => {
        setAbrirNation(true);
        setNombreNation("");
        setDescripcionNation("");
    }

    var errorTipoDoc=()=>{
        Swal.fire({
            title: 'Datos personales-Seleccione el tipo de documento',
            icon: 'warning',
        })
    }

    var errorNumDoc=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese numero de doc',
            icon: 'warning',
        })
    }

    var errorNom=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese el nombre',
            icon: 'warning',
        })
    }

    var errorApePa=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese apellido paterno',
            icon: 'warning',
        })
    }

    var errorApeMa=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese apellido materno',
            icon: 'warning',
        })
    }

    var errorTelMovil=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese telefono movil',
            icon: 'warning',
        })
    }

    var errorGenero=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese el genero',
            icon: 'warning',
        })
    }

    var errorFechaNaci=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese fecha de nacimiento',
            icon: 'warning',
        })
    }

    var errorNacio=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese la nacionalidad',
            icon: 'warning',
        })
    }

    var errorReg=()=>{
        Swal.fire({
            title: 'Domicilio-Ingrese un departamento',
            icon: 'warning',
        })
    }

    var errorProv=()=>{
        Swal.fire({
            title: 'Domicilio-Ingrese la provincia',
            icon: 'warning',
        })
    }

    var errorNumHistory=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese el numero de historia clinica',
            icon: 'warning',
        })
    }

    var errorDist=()=>{
        Swal.fire({
            title: 'Domicilio-Ingrese un distrito',
            icon: 'warning',
        })
    }

    var errorDir=()=>{
        Swal.fire({
            title: 'Domicilio-Ingrese una direccion',
            icon: 'warning',
        })
    }

    var errorEstadoCivil=()=>{
        Swal.fire({
            title: 'Domicilio-Ingrese estado civil',
            icon: 'warning',
        })
    }

    var errorCorr=()=>{
        Swal.fire({
            title: 'Datos de contacto-Ingrese el correo',
            icon: 'warning',
        })
    }

    var guardarPac=()=>{
        Swal.fire({
            title: 'Paciente modificado',
            icon: 'success',
        })
    }
    var userRepe=()=>{
        Swal.fire({
            title: '!Correo ya existe!',
            icon: 'warning',
        })
    }

    var dniRepe=()=>{
        Swal.fire({
            title: '!DNI ya existe!',
            icon: 'warning',
        })
    }
    var errorPac=()=>{
        Swal.fire({
            title: 'El paciente no fue modificado',
            icon: 'success',
        })
    }

    var NationName=()=>{
        Swal.fire({
            title: 'Ingrese el nombre la nacionalidad',
            icon: 'warning',
        })
    }

    var NationDescription=()=>{
        Swal.fire({
            title: 'Ingrese la descripcion de la nacionalidad',
            icon: 'warning',
        })
    }

    var NationCreate=()=>{
        Swal.fire({
            title: 'Nacionalidad creada exitosamente',
            icon: 'success',
        })
    }

    var NationError=()=>{
        Swal.fire({
            title: 'La nacionalidad no pudo crearse',
            icon: 'warning',
        })
    }

    const tipoDocListFilt = tipoDocList.filter(
        (n: any) => ( n.description=="Paciente")
    ) 


    let dateNow2 = moment().format('YMD');
    let HourNow2 = moment().format('Hms');
    let dateNow = moment().format('MD');
    let HourNow = moment().format('Hms');
    const docAleatorio=()=>{
        if(tipoDoc == "4"){
            setNumDoc("SN"+dateNow+HourNow)
        }
    }


    const crearNation = () => {

        if (nombreNation == "") {
            //alert("Ingrese nombre");
            NationName()
            return;
        }
        saveNationApi({
            description: descripcionNation,
            name: nombreNation.toUpperCase()
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                NationCreate()
                handleCloseNation();
                setNombreNation("");
                setDescripcionNation("");
                getNationAllApi().then((ag: any) => {
                    setNationList(ag.data);
                });
            } else {
                //alert(x.text);
                NationError()
                return;
            }
        })
    }
    const concatena = nombres.charAt(0).toLowerCase()+dateNow2+HourNow2+"@correo.com"
    console.log(concatena)
    const crearPaciente = () => {

        let newMail: string = "";
        const validacorreo= rows.some((cred: any) => cred.correo === correo)
        const validadni= rows.some((cred: any) => cred.numdoc === numDoc)
        const validacorreoemployee= rows2.some((cred: any) => cred.correo === correo)
        const validadniemployee= rows2.some((cred: any) => cred.dni === numDoc)
        const validacorreouser= rows3.some((cred: any) => cred.email === correo)
        const validadniuser= rows3.some((cred: any) => cred.person.identificaction === numDoc)
        let error = false;
        //#region validaciones
        if (telMovil == "") {
            //mError += "Datos personales-Ingrese telefono movil\n";
            error = true;
            errorTelMovil()
        }
        if (direcLugar == "") {
            //mError += "Domicilio-Ingrese una direccion \n";
            error = true;
            errorDir()
        }
        if (distrito == "") {
            //mError += "Domicilio-Seleccione un distrito \n";
            error = true;
            errorDist()
        }
        if (provincia == "") {
            //mError += "Domicilio-Seleccione una provincia \n";
            error = true;
            errorProv()
        }
        if (region == "") {
            //mError += "Domicilio-Seleccione un departamento \n";
            error = true;
            errorReg()
        }
        if (nacionalidad == "") {
            //mError += "Datos personales-Ingrese Fecha admision\n";
            error = true;
            errorNacio()
        }
        if (feNacimiento == "") {
            //mError += "Datos personales-Ingrese Fecha Nacimiento\n";
            error = true;
            errorFechaNaci()
        }
        if (estadoCivil==""){
            //mError += "Domicilio-Ingrese estado civil \n";
            error = true;
            errorEstadoCivil()
        }
        if (genero == "") {
            //mError += "Datos personales-Ingrese genero\n";
            error = true;
            errorGenero()
        }
        if (apeMa == "") {
            //mError += "Datos personales-Ingrese apellido materno\n";
            error = true;
            errorApeMa()
        }
        if (apePa == "") {
            //mError += "Datos personales-Ingrese apellido paterno\n";
            error = true;
            errorApePa()
        }
        if (nombres == "") {
            //mError += "Datos personales-Ingrese nombre\n";
            error = true;
            errorNom()
        }
        if (numHistoria==""){
            //mError += "Domicilio-Ingrese estado civil \n";
            error = true;
            errorNumHistory()
        }
        if (numDoc == "") {
            //mError += "Datos personales-Ingrese numero de doc\n";
            error = true;
            errorNumDoc()
        }
        if (tipoDoc == "") {
            //mError += "Datos personales-Seleccione tipo de documento\n";
            error = true;
            errorTipoDoc()
        }

        if(validacorreo){
            userRepe()
        }

        if(validadni){
            dniRepe()
        }

        if(validacorreoemployee){
            userRepe()
        }

        if(validadniemployee){
            dniRepe()
        }

        if(validacorreouser){
            userRepe()
        }

        if(validadniuser){
            dniRepe()
        }

        if (correo == "" ) {
            newMail = concatena
        } else {
            newMail = correo
        }

        if (error) {
            //alert(mError);
            return;
        }
        //#endregion 
        console.log(newMail)
        console.log(correo)

        let data = {
            DistrictId: distrito,
            ProvinceId: provincia,
            RegionId: region,
            TypeDocId: tipoDoc,
            address: direcLugar,
            birthDate: feNacimiento,
            civilStatus: estadoCivil,
            dni: numDoc,
            gender: genero,
            edad:edad,
            roles: 3,
            historyNumber: numHistoria,
            lastNameM: apeMa.toUpperCase(),
            lastNameP: apePa.toUpperCase(),
            name: nombres.toUpperCase(),
            NationId: nacionalidad,
            phoneNumber: telMovil,
            tlfNumber: telFijo,
            username: newMail
        }
        editPatientApi(data, userid).then((x: any) => {
            if (x.status) {
                guardarPac()
                window.location.href = '/apps/patients'
            }else if(validacorreo){
                userRepe()
            }else if(validadni){
                dniRepe()
            }else if(validacorreoemployee){
                userRepe()
            }else if(validadniemployee){
                dniRepe()
            }else if(validacorreouser){
                userRepe()
            }else if(validadniuser){
                dniRepe()
            }
        });


    }

    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container item  >
                        <Link to={"/apps/patients"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Paciente</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item  md={8}>
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >{nombres + " " + apePa + " " + apeMa}</div>
                        </Grid>
                        <Grid item  md={4}>
                            <Button onClick={crearPaciente} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={0.3}>
                        <Grid item >
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >Detalle del paciente</InputLabel >
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <br></br>
                    <br></br>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                        <div>
                            <TabContext value={values}>
                                <Box>
                                    <Tabs value={values} scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange}>
                                        <Tab className="h-64 normal-case" label="Datos personales" value="1" />
                                        <Tab className="h-64 normal-case" label="Domicilio" value="2" />
                                        <Tab className="h-64 normal-case" label="Datos de contacto" value="3" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="1">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Tipo Documento" variant="outlined"
                                                    select fullWidth value={tipoDoc} onChange={handleChangeTypeDoc}
                                                    helperText="Por favor seleccione uno"
                                                >
                                                    {tipoDocListFilt.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField onClick={docAleatorio} fullWidth id="outlined-basic" label="Nro Documento" variant="outlined" value={numDoc} onChange={handleChangeNumDoc} />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Nro de historia clinica" variant="outlined" value={numHistoria} onChange={handleChangeNumHistoria} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Nombres" variant="outlined" value={nombres} onChange={handleChangeNombres} />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Apellido paterno" variant="outlined" value={apePa} onChange={handleChangeApePa} />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Apellido materno" variant="outlined" value={apeMa} onChange={handleChangeApeMa} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={6} >
                                                <TextField id="outlined-basic" label="Género" variant="outlined"
                                                    select fullWidth value={genero} onChange={handleChangeGenero}
                                                >
                                                    {genders.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField id="outlined-basic" label="Estado civil" variant="outlined"
                                                    select fullWidth value={estadoCivil} onChange={handleChangeEstadoCivil}
                                                >
                                                    {civilStatus.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={5}>
                                                <TextField type="date" fullWidth id="outlined-basic" label="Fecha de nacimiento" focused variant="outlined" value={feNacimiento} onChange={handleChangeFeNacimiento} />
                                            </Grid>
                                            <Grid container item md={2}>
                                                <TextField fullWidth id="outlined-basic" label="Edad" focused variant="outlined" value={edad} onChange={handleChangeEdad} />
                                            </Grid>
                                            <Grid container item md={5}>
                                                <TextField fullWidth id="outlined-basic" label="Nacionalidad" variant="outlined"
                                                    select value={nacionalidad} onChange={handleChangenacionalidad}
                                                >

                                                    <MenuItem value="">
                                                       <Button onClick={handleOpenNation} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>

                                                    {nationList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Escoge un departamento" variant="outlined"
                                                    select fullWidth value={region} onChange={handleChangeRegion}
                                                >
                                                    {regionList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Escoge una provincia" variant="outlined"
                                                    select fullWidth value={provincia} onChange={handleChangeProvincia}
                                                >
                                                    {provinciaList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Escoge un distrito" variant="outlined"
                                                    select fullWidth value={distrito} onChange={handleChangeDistrito}
                                                >
                                                    {distritoList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={12}>
                                                <TextField id="outlined-basic" label="Dirección" variant="outlined"
                                                    multiline fullWidth rows={4} value={direcLugar} onChange={handleChangeDirecLugar} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Correo" variant="outlined" value={correo} onChange={handleChangeCorreo} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Teléfono móvil" variant="outlined" value={telMovil} onChange={handleChangeTelMovil} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Teléfono fijo" variant="outlined" value={telFijo} onChange={handleChangeTelFijo} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                            </TabContext>
                        </div>
                    </CardContent>
                </div >



                <div>
                    <Modal
                        keepMounted
                        open={abrirNation}
                        onClose={handleCloseNation}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nueva Nacionalidad</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreNation} onChange={handleChangeNombreNation} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseNation} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearNation} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
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
