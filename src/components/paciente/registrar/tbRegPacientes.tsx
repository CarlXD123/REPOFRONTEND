import { Button, CardContent, Grid, Hidden, InputLabel, MenuItem, Tab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Tabs } from '@mui/material';
import { getDistrictsForProvince,savePatientApi, getUserApi, getPagedTypeDocsApi , saveNationApi, getNationAllApi, getProvincesForRegion, getPagedEmployeesApi, getPagedPatientsApi, getRegionsApi, getTypeDocsApi } from "../../../api";
import { civilStatus, genders, nationality } from "../../../constant";
import { Link } from "react-router-dom";
import { Modal } from "@material-ui/core";
import moment from "moment";
import Swal from 'sweetalert2';

export default function TbRegPaciente() {
    const getAgeFromBirthday = (birthday:any) => {
        if(birthday){
          let totalMonths = +moment().diff(birthday, 'months');
          let years =totalMonths/ 12;
          let months = totalMonths % 12;
            if(months !== 0){
               return parseInt(years+"");
             }
        return  years;
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
    const [abrirGuardarPaciente, setAbrirGuardarPaciente] = React.useState<any>(false);
    const [abrirGuardarErrorTipoDoc, setAbrirGuardarErrorTipoDoc] = React.useState<any>(false);
    const [abrirGuardarErrorNumDoc, setAbrirGuardarErrorNumDoc] = React.useState<any>(false);
    const [abrirGuardarErrorNom, setAbrirGuardarErrorNom] = React.useState<any>(false);
    const [abrirGuardarErrorApePa, setAbrirGuardarErrorApePa] = React.useState<any>(false);
    const [abrirGuardarErrorApeMa, setAbrirGuardarErrorApeMa] = React.useState<any>(false);
    const [abrirGuardarErrorGenero, setAbrirGuardarErrorGenero] = React.useState<any>(false);
    const [abrirGuardarErrorTelMovil, setAbrirGuardarErrorTelMovil] = React.useState<any>(false);
    const [abrirGuardarErrorFeNacimiento, setAbrirGuardarErrorFeNacimiento] = React.useState<any>(false);
    const [abrirGuardarErrorNacionalidad, setAbrirGuardarErrorNacionalidad] = React.useState<any>(false);
    const [abrirGuardarErrorRegion, setAbrirGuardarErrorRegion] = React.useState<any>(false);
    const [abrirGuardarErrorDistrito, setAbrirGuardarErrorDistrito] = React.useState<any>(false);
    const [abrirGuardarErrorDirecLugar, setAbrirGuardarErrorDirecLugar] = React.useState<any>(false);
    const [abrirGuardarErrorProvincia, setAbrirGuardarErrorProvincia] = React.useState<any>(false);
    const [abrirGuardarErrorECivil, setAbrirGuardarErrorECivil] = React.useState<any>(false);
    const [abrirGuardarErrorCorreo, setAbrirGuardarErrorCorreo] = React.useState<any>(false);
    const [abrirGuardarPacienteError, setAbrirGuardarPacienteError] = React.useState<any>(false);
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

    const handleCloseRegistrarPacientes = () => {
        setAbrirGuardarPaciente(false);
    }

    const handleCloseRegistrarPacientesError = () => {
        setAbrirGuardarPacienteError(false);
    }

    const handleCloseErrorTipoDoc = () => {
        setAbrirGuardarErrorTipoDoc(false);
    }

    const handleCloseErrorNumDoc= () => {
        setAbrirGuardarErrorNumDoc(false);
    }

    const handleCloseErrorNom = () => {
        setAbrirGuardarErrorNom(false);
    }

    const handleCloseErrorApePa = () => {
        setAbrirGuardarErrorApePa(false);
    }

    const handleCloseErrorApeMa = () => {
        setAbrirGuardarErrorApeMa(false);
    }

    const handleCloseErrorTelMovil = () => {
        setAbrirGuardarErrorTelMovil(false);
    }

    const handleCloseErrorFeNacimiento = () => {
        setAbrirGuardarErrorFeNacimiento(false);
    }

    const handleCloseErrorNacionalidad = () => {
        setAbrirGuardarErrorNacionalidad(false);
    }

    const handleCloseErrorRegion = () => {
        setAbrirGuardarErrorRegion(false);
    }

    const handleCloseErrorDistrito = () => {
        setAbrirGuardarErrorDistrito(false);
    }

    const handleCloseErrorProvincia = () => {
        setAbrirGuardarErrorProvincia(false);
    }

    const handleCloseErrorDirecLugar = () => {
        setAbrirGuardarErrorDirecLugar(false);
    }

    const handleCloseErrorECivil = () => {
        setAbrirGuardarErrorECivil(false);
    }

    const handleCloseErrorCorreo = () => {
        setAbrirGuardarErrorCorreo(false);
    }

    const handleCloseErrorGenero = () => {
        setAbrirGuardarErrorGenero(false);
    }

    const handleCloseNation = () => {
        setAbrirNation(false);
    }

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
    //#endregion

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
        getPagedTypeDocsApi ().then((ag: any) => {
            setTipoDocList(ag.data)
        });
        getNationAllApi().then((ag: any) => {
            setNationList(ag.data)
        });
        getUserApi().then((ag: any) => {
           setRows3(ag.data)
        });
        getRegionsApi().then((ag: any) => {
            setRegionList(ag.data);
        });
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
        //#endregion
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
            title: 'Datos de contacto-Ingrese telefono movil',
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
    var errorNumHistory=()=>{
        Swal.fire({
            title: 'Datos personales-Ingrese el numero de historia clinica',
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
            title: 'Datos personales-Ingrese estado civil',
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
            title: 'Paciente agregado',
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

    var NationCreate=()=>{
        Swal.fire({
            title: 'La nacionalidad fue creada exitosamente',
            icon: 'success',
        })
    }

    var NationError=()=>{
        Swal.fire({
            title: 'La nacionalidad no fue creada',
            icon: 'warning',
        })
    }

    var NationName=()=>{
        Swal.fire({
            title: 'Ingrese el nombre de la nacionalidad',
            icon: 'warning',
            target: '#custom-target',
        })
    }

    var HistoryNumber2=()=>{
        Swal.fire({
            title: '!Numero de historia clinica repetido!',
            icon: 'warning',
        })
    }

    const tipoDocListFilt = tipoDocList.filter(
        (n: any) => ( n.description=="Paciente")
    ) 
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
    
    let dateNow2 = moment().format('YMD');
    let HourNow2 = moment().format('Hms');
    let dateNow = moment().format('MD');
    let HourNow = moment().format('Hms');
    const docAleatorio=()=>{
        if(tipoDoc == "4"){
            setNumDoc("SN"+dateNow+HourNow)
        }
    }

    //const correoAleatorio=()=>{
        //if(tipoDoc == "5"){
            //setCorreo(nombres.charAt(0).toLowerCase()+dateNow2+HourNow2+"@correo.com")
        //}
   // }
    nationList.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
    const concatena = nombres.charAt(0).toLowerCase()+dateNow2+HourNow2+"@correo.com"
    const crearPaciente = () => {

        let newMail: string = "";
        const validacorreo= rows.some((cred: any) => cred.correo === correo)
        const validadni= rows.some((cred: any) => cred.numdoc === numDoc)
        const validahistorynumber= rows.some((cred: any) => cred.numHistoriaCli === numHistoria)
        const validacorreoemployee= rows2.some((cred: any) => cred.correo === correo)
        const validadniemployee= rows2.some((cred: any) => cred.dni === numDoc)
        const validacorreouser= rows3.some((cred: any) => cred.email === correo)
        const validadniuser= rows3.some((cred: any) => cred.person.identificaction === numDoc)
        //let mError = "LLenar Campos: \n";
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
        
        if(validahistorynumber){
            HistoryNumber2()
        }

        if (correo == "" ) {
            newMail = concatena
        } else {
            newMail = correo
        }

        if(newMail == ""){
            error= true
            errorCorr()
        }
        if (error) {
            //alert(mError);
            return;
        }

        console.log(validahistorynumber)

        console.log(validacorreouser)
        console.log(validadniuser)
        console.log(rows)
        console.log(correo)
        console.log(numDoc)
        //#endregion 
        let data= {
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
        savePatientApi(data).then((x: any) => {
            if(x.status){
                //alert(x.message.text);
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
            }else if(validahistorynumber){
                HistoryNumber2()
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
                        <Grid item md={8}>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Nuevo paciente</InputLabel >
                        </Grid>
                        <Grid  item md={4}>
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
                                    <Tabs value={values} scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange} >
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
                                                <TextField fullWidth onClick={docAleatorio} id="outlined-basic" label="Nro Documento" variant="outlined" value={numDoc} onChange={handleChangeNumDoc} />
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
                                                <TextField  fullWidth id="outlined-basic" label="Nacionalidad" variant="outlined" 
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
                                                <TextField fullWidth id="outlined-basic"  label="Correo" variant="outlined" value={correo} onChange={handleChangeCorreo} />
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
                        open={abrirGuardarPaciente}
                        onClose={handleCloseRegistrarPacientes }
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Paciente Registrado!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseRegistrarPacientes} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPacienteError}
                        onClose={handleCloseRegistrarPacientesError }
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Ups algo fallo, Revisa los campos faltantes!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseRegistrarPacientesError} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorTipoDoc}
                        onClose={handleCloseErrorTipoDoc}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija el tipo de documento</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorTipoDoc} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorNumDoc}
                        onClose={handleCloseErrorNumDoc}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escriba numero de documento</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorNumDoc} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorNom}
                        onClose={handleCloseErrorNom}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escriba un nombre</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorNom} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorApePa}
                        onClose={handleCloseErrorApePa}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Ingrese Apellido Paterno</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorApePa} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorApeMa}
                        onClose={handleCloseErrorApeMa}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Ingrese Apellido Materno</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorApeMa} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorTelMovil}
                        onClose={handleCloseErrorTelMovil}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Ingrese Telefono Movil</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorTelMovil} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorFeNacimiento}
                        onClose={handleCloseErrorFeNacimiento}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escoja fecha de nacimiento</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorFeNacimiento} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorNacionalidad}
                        onClose={handleCloseErrorNacionalidad}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija una nacionalidad</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorNacionalidad} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorRegion}
                        onClose={handleCloseErrorRegion}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija una Region</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorRegion} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorDistrito}
                        onClose={handleCloseErrorDistrito}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija un distrito</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorDistrito} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorDirecLugar}
                        onClose={handleCloseErrorDirecLugar}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escriba una direccion</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorDirecLugar} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorProvincia}
                        onClose={handleCloseErrorProvincia}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija una provincia</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorProvincia} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorECivil}
                        onClose={handleCloseErrorECivil}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija un estado civil</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorECivil} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorCorreo}
                        onClose={handleCloseErrorCorreo}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Coloque un correo</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorCorreo} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorGenero}
                        onClose={handleCloseErrorGenero}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Coloque un correo</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorGenero} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal id="custom-target"
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
