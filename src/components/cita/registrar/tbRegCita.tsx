import { Button, CardContent, Grid, InputAdornment, InputLabel, MenuItem, Modal, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useState } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { addAppointmentApi, addRefererApi, addDoctorApi, getPagedPatientsApi, getAgreementsAllApi, getAgreementsListPriceApi, getDistrictsForProvince, getDoctorApi, getExaminationsAllApi, getFilterExamApi, getHeadquartersAllApi, getPatienByDOCApi, getProvincesForRegion, getRefererApi, getRegionsApi, getServicesAllApi, getTypeDocsApi,getPatientByNameApi, getFilterPatientsApi, getFilterPatientAppointmentsApi } from "../../../api";
import { Link } from "react-router-dom";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbConvenios from "../../tablas/tbConvenios";
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import moment from "moment";
import { BorderBottom, BorderColor } from "@mui/icons-material";
import TbPacientes from "../../tablas/tbPacientes";
import {Hidden} from '@material-ui/core';
import Swal from 'sweetalert2';


export default function TbRegCita() {

    const [values, setValues] = React.useState<string>("1");
    //#region GET-SET textfield

    const [idClient, setIdClient] = React.useState<any>('');
    const [search, setSearch] = useState("");
    
    const [tipoDocList, setTipoDocList] = React.useState<any[]>([]);
    const [tipoDoc, setTipoDoc] = React.useState<any>('');
    const [numDoc, setNumDoc] = React.useState<any>('');
    const [nombres, setNombres] = React.useState<any>('');
    const [apePa, setApePa] = React.useState<any>('');
    const [apeMa, setApeMa] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');
    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [convenio, setConvenio] = React.useState<any>('');
    const [listaPrecioList, setListaPrecioList] = React.useState<any[]>([]);
    const [listaPrecio, setListaPrecio] = React.useState<any>('');
    const [referenciaList, setReferenciaList] = React.useState<any[]>([]);
    const [referencia, setReferencia] = React.useState<any>('');
    const [codigoReferencia, setCodigoReferencia] = React.useState<any>('');
    const [observacionesReferente, setObservacionesReferente] = React.useState<any>('');
    const [medicoList, setMedicoList] = React.useState<any[]>([]);
    const [medico, setMedico] = React.useState<any>('');

    const [precio, setPrecio] = React.useState<any>('');
    const [descuento, setDescuento] = React.useState<any>('');
    const [precioFinal, setPrecioFinal] = React.useState<any>('');

    const [fecha, setFecha] = React.useState<any>('');
    const [hora, setHora] = React.useState<any>('');
    //#endregion

    const [dato, setPaciente] = React.useState<any>('');
    const [abrirListaPrecios, setAbrirListaPrecios] = React.useState<any>(true);
    const [bloqueaboton, setBloquearBoton] = React.useState<any>(true);
    const [bloqueaboton2, setBloquearBoton2] = React.useState<any>(true);
    const [bloqueaboton3, setBloquearBoton3] = React.useState<any>(true);
    const [bloqueaboton4, setBloquearBoton4] = React.useState<any>(false);
    const [asignarExamenes, setAsignarExamenes] = React.useState<any>(false);
    const [examenes, setExamenes] = React.useState<any>('');
    const [servicioList, setServicioList] = React.useState<any[]>([]);
    const [servicio, setServicio] = React.useState<any>('');
    //#region handles de Vistas

    const [orderBuscar, setOrderBuscar] = React.useState<Order>('asc');
    const [orderByBuscar, setOrderByBuscar] = React.useState<string>("");
    const [selectedBuscar, setSelectedBuscar] = React.useState<readonly string[]>([]);
    const [pageBuscar, setPageBuscar] = React.useState(0);
    const [rowsPerPageBuscar, setRowsPerPageBuscar] = React.useState(5);
    const [rowsBuscar, setRowsBuscar] = React.useState<any>([]);
    const [rowsBuscar2, setRowsBuscar2] = React.useState<any>([]);


    const [orderAsignar, setOrderAsignar] = React.useState<Order>('asc');
    const [orderByAsignar, setOrderByAsignar] = React.useState<string>("");
    const [selectedAsignar, setSelectedAsignar] = React.useState<readonly string[]>([]);
    const [pageAsignar, setPageAsignar] = React.useState(0);
    const [rowsPerPageAsignar, setRowsPerPageAsignar] = React.useState(5);
    const [rowsAsignar, setRowsAsignar] = React.useState<any>([]);
    const [listaPrecioData, setListaPrecioData] = React.useState<any>();
    const [bloquearAgregarExamenes, setBloquearAgregarExamenes] = React.useState<any>(true);

    const [nombreMedico, setNombreMedico] = React.useState<any>('');
    const [abrirAgregarMedico, setAbrirAgregarMedico] = React.useState<any>(false);
    const [abrirBuscarPaciente, setAbrirBuscarPaciente] = React.useState<any>(false);
    const [nombreReferencia, setNombreReferencia] = React.useState<any>('');
    const [abrirAgregarReferencia, setAbrirAgregarReferencia] = React.useState<any>(false);
    const [isVisible, setIsVisible] = React.useState<any>(false);
    const [abrirGuardarCita, setAbrirGuardarCita] = React.useState<any>(false);
    const [abrirError, setAbrirError] = React.useState<any>(false);
    const [abrirErrorDescuento, setAbrirErrorDescuento] = React.useState<any>(false);
    const [abrirErrorFecha, setAbrirErrorFecha] = React.useState<any>(false);
    const [abrirErrorHora, setAbrirErrorHora] = React.useState<any>(false);
    //#region Primera Vista(Datos Personales)
    const handleCloseAbrirAgregarReferencia = () => {
        setAbrirAgregarReferencia(false);
    }
    const handleOpenAbrirAgregarReferencia = () => {
        setAbrirAgregarReferencia(true);
        setNombreReferencia("")
    }

    const handleCloseAbrirGuardarCita = () => {
        setAbrirGuardarCita(false);
    }

    const handleCloseAbrirErrorCita = () => {
        setAbrirError(false);
    }

    const handleCloseAbrirErrorDescuento = () => {
        setAbrirErrorDescuento(false);
    }

    const handleCloseAbrirErrorFecha = () => {
        setAbrirErrorFecha(false);
    }

    const handleCloseAbrirErrorHora = () => {
        setAbrirErrorHora(false);
    }
    
    const handleCloseAbrirAgregarMedico = () => {
        setAbrirAgregarMedico(false);
    }


    const handleCloseBuscarPaciente = () => {
        setAbrirBuscarPaciente(false);
    }


    const handleOpenBuscarPaciente = () => {
        if(tipoDoc =="3"){
           setAbrirBuscarPaciente(true);
           setBloquearBoton4(true);
           setPaciente("")
        } else if(tipoDoc =="1"){
          setBloquearBoton3(true)
        } else if(tipoDoc =="2"){
          setBloquearBoton3(true)
        }
    }



    const handleOpenAbrirAgregarMedico = () => {
        setAbrirAgregarMedico(true);
        setNombreMedico("")
    }
    const handleChangeNombreReferencia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreReferencia(event.target.value);
    };
    const handleChangeNombreMedico = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreMedico(event.target.value);
    };
    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        setValues(newValue);
    };
    const handleChangeTypeDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoDoc(event.target.value);
    };
    const handleChangeNumDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumDoc(event.target.value);
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
    const handleChangeSede = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSede(event.target.value);
    };
    const handleChangeConvenio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConvenio(event.target.value);
        setAbrirListaPrecios(false)
        getAgreementsListPriceApi(event.target.value).then((ag: any) => {
            setListaPrecioList(ag.data)
        });
    };

    


    const handleChangeListaPrecio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListaPrecio(event.target.value);
        setListaPrecioData(listaPrecioList.find(p => p.id == event.target.value));
        setBloquearAgregarExamenes(false)
        setBloquearBoton2(false)
    };
    const handleChangeReferencia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReferencia(event.target.value);
    };
    const handleChangeCodigoReferencia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodigoReferencia(event.target.value);
    };
    const handleChangeObservacionesReferente = (event: React.ChangeEvent<HTMLInputElement>) => {
        setObservacionesReferente(event.target.value);
    };
    const handleChangeMedico = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMedico(event.target.value);
    };
    //#endregion

    //#region Segunda Vista(Domicilio)
    const handleChangePrecio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrecio(event.target.value);
    };
    const handleChangeDescuento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescuento(event.target.value);
        if (event.target.value != "") {
            try {
                setPrecioFinal(precio - Number.parseFloat(event.target.value));
            } catch (error) {
                setPrecioFinal(precio)
            }
        } else {
            setPrecioFinal(precio);
        }
    };
    const handleChangePrecioFinal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrecioFinal(event.target.value);
    };
    //#endregion

    //#region Tercera Vista(Datos de contacto)
    const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(event.target.value);
    };
    const handleChangeHora = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHora(event.target.value);
    };
    const handleChangeServicio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServicio(event.target.value);
    };
    const handleChangeExamenes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamenes(event.target.value);
    };

    const handleChangeBuscarPaciente = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaciente(event.target.value);
    };
    //#endregion

    //#endregion

    React.useEffect(() => {
        //#region llamadas al servicio
        getTypeDocsApi().then((ag: any) => {
            setTipoDocList(ag.data)
        });
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });

        getPagedPatientsApi(0, 1000).then((ap: any) => {
            setRowsBuscar2(ap.data)
          });

        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
        getRefererApi().then((ag: any) => {
            setReferenciaList(ag.data);
        });

        getDoctorApi().then((ag: any) => {
            setMedicoList(ag.data);
        });
        getServicesAllApi().then((ag: any) => {
            setServicioList(ag.data);
        });
        setDescuento(0);
        //#endregion
    }, []);

    const registrar = () => {
        //validar return
        //llamda al servicio
        //
    }

    //#region Tabla Examenes Agregados
    interface Data {
        codigo: string;
        name: string;
        precio: string;
        options: string;
    }

    function createData(
        codigo: string,
        name: string,
        precio: string,
        options: string
    ): Data {
        return {
            codigo,
            name,
            precio,
            options
        };
    }
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    type Order = 'asc' | 'desc';

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    interface HeadCell {
        disablePadding: boolean;
        id: any;
        label: string;
        numeric: boolean;
        disableOrder: boolean;
    }
    const headCells: readonly HeadCell[] = [
        {
            id: 'codigo',
            numeric: false,
            disablePadding: false,
            label: 'Codigo',
            disableOrder: false
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
            disableOrder: false
        },
        {
            id: 'precio',
            numeric: false,
            disablePadding: false,
            label: 'Precio',
            disableOrder: false
        },
        {
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Opciones',
            disableOrder: true
        }
    ];

    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
    }


    function EnhancedTableHead(props: EnhancedTableProps) {
        const { order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler =
            (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead >
                <TableRow >
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                        >
                            {headCell.disableOrder ? headCell.label :
                                <TableSortLabel style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}

                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>("");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState<any>([]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleCloseAsignarExamenes = () => {
        setAsignarExamenes(false);
        
    }
 
    const OpenExamen=()=>{
        Swal.fire({
            title: 'Ingrese el paciente!!!',
            icon: 'warning',
          })
    }

    const DesactivarBarra=()=>{
        if(tipoDoc == "3"){
            setBloquearBoton4(true)
        } else if(tipoDoc == "1"){
            setBloquearBoton4(false)
        } else if(tipoDoc == "2"){
            setBloquearBoton4(false)
        }
    }
    
    const OpenButton=()=>{
        if(tipoDoc == "3"){
            AparecerBoton()
            setBloquearBoton3(false)
            setBloquearBoton4(true)
        } else if(tipoDoc == "1"){
            OcultarBoton()
            setBloquearBoton3(true)
            setBloquearBoton4(false)
        } else if(tipoDoc == "2"){
            OcultarBoton()
            setBloquearBoton3(true)
            setBloquearBoton4(false)
        }

    }

    const OpenExamenListaPrecio=()=>{
        Swal.fire({
            title: 'Eliga una lista de precio!!!',
            icon: 'warning',
          })
    }


    const handleOpenAgregarExamen = () => {
        if (nombres == "") {
            OpenExamen();
            setAsignarExamenes(false);
            return;
        }
        if (bloquearAgregarExamenes) {
            //alert("Eliga una lista de precio")
            OpenExamenListaPrecio();
            setAsignarExamenes(false);
            return;
        }
        setAsignarExamenes(true);
        setExamenes("")
        setServicio("")
        setRowsAsignar([])
        

    }
    
    const tipoDocListFilt = tipoDocList.filter(
        (n: any) => ( n.value< 4)
    ) 

    const OpenText=()=>{
        Swal.fire({
            title: 'Ingrese texto por favor',
            icon: 'warning',
          })
    }

    const OpenBus=()=>{
        Swal.fire({
            title: 'Ingrese el metodo de busqueda',
            icon: 'warning',
          })
    }
   
    const NoPacient=()=>{
        Swal.fire({
            title: 'Paciente no encontrado',
            icon: 'warning',
          })
    }

    const buscarPaciente = (dato: any) => {

        if (tipoDoc == "") {
            OpenBus()
            return;
        }

        if (dato == "") {
            OpenText()
            return;
        }

        let datos;
        if (tipoDoc == "1") {
            datos = "dni";
        } else if (tipoDoc == "2") {
            datos = "passport";
        } else if (tipoDoc == "3") {
            datos = "other"
        }


            getPatienByDOCApi(datos, dato).then(x => {
                if (x.status) {
                    setNombres(x.data.person.name)
                    setApePa(x.data.person.lastNameP)
                    setApeMa(x.data.person.lastNameM)
                    setIdClient(x.data.person.id)
                } else {
                    //alert(x.message.text)
                    NoPacient()
                    return;
                }
    
            });
        

       }

       

       var resultadosBusqueda = rowsBuscar2.filter((elemento: any)=>{
        if(elemento.person.name.toString().toLowerCase().includes(dato.toLowerCase())){

          return elemento
        }

        if(elemento.person.lastNameP.toString().toLowerCase().includes(dato.toLowerCase())){

          return elemento
        }

        if(elemento.person.lastNameM.toString().toLowerCase().includes(dato.toLowerCase())){

          return elemento
        }
      });

      const filt = () => {
       if(tipoDoc == "3" && dato!=""){
        setRowsBuscar(resultadosBusqueda)
      }
     }

       
    const buscarDocEnter = (event: any, dato: any) => {
        if (event.key === 'Enter') {
            buscarPaciente(dato)
        } 
    }
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //#endregion
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 850,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 10,
    };


    //#TABLA BUSCAR PACIENTE
    interface DataBuscar {
        code: string;
        nomb: string;
        apepa: string;
        apema: string;
        opc: string;
    }


    function createDataBuscar(
        code: string,
        nomb: string,
        apepa: string,
        apema: string,
        opc: string
    ): DataBuscar {
        return {
            code,
            nomb,
            apepa,
            apema,
            opc
        };
    } 
    function descendingComparatorBuscar<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    type OrderBuscar = 'asc' | 'desc';

    function getComparatorBuscar<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparatorBuscar(a, b, orderBy)
            : (a, b) => -descendingComparatorBuscar(a, b, orderBy);
    }
    function stableSortBuscar<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    interface HeadCellBuscar {
        disablePadding: boolean;
        id: any;
        label: string;
        numeric: boolean;
        disableOrder: boolean;
    }
    const headCellsBuscar: readonly HeadCellBuscar[] = [
        {
            id: 'code',
            numeric: false,
            disablePadding: false,
            label: 'Nro. de documento',
            disableOrder: false
        },
        {
            id: 'nomb',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
            disableOrder: false
        },
        {
            id: 'apepa',
            numeric: false,
            disablePadding: false,
            label: 'Apellido Paterno',
            disableOrder: false
        },

        {
            id: 'apema',
            numeric: false,
            disablePadding: false,
            label: 'Apellido Materno',
            disableOrder: false
        },

        {
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Opciones',
            disableOrder: true
        }
    ];

    interface EnhancedTablePropsBuscar {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataBuscar) => void;
        order: OrderBuscar;
        orderBy: string;
        rowCount: number;
    }
    function EnhancedTableHeadBuscar(props: EnhancedTablePropsBuscar) {
        const { order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler =
            (property: keyof DataBuscar) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead >
                <TableRow >
                    {headCellsBuscar.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                        >
                            {headCell.disableOrder ? headCell.label :
                                <TableSortLabel style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}

                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    //#region Tabla asignar examens
    interface DataAsignar {
        code: string;
        name: string;
        service: string;
        options: string;
    }
    function createDataAsignar(
        code: string,
        name: string,
        service: string,
        options: string
    ): DataAsignar {
        return {
            code,
            name,
            service,
            options
        };
    }
    function descendingComparatorAsignar<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    type OrderAsignar = 'asc' | 'desc';

    function getComparatorAsignar<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparatorAsignar(a, b, orderBy)
            : (a, b) => -descendingComparatorAsignar(a, b, orderBy);
    }
    function stableSortAsignar<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    interface HeadCellAsignar {
        disablePadding: boolean;
        id: any;
        label: string;
        numeric: boolean;
        disableOrder: boolean;
    }
    const headCellsAsignar: readonly HeadCellAsignar[] = [
        {
            id: 'code',
            numeric: false,
            disablePadding: false,
            label: 'Codigo',
            disableOrder: false
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
            disableOrder: false
        },
        {
            id: 'service',
            numeric: false,
            disablePadding: false,
            label: 'Servicio',
            disableOrder: false
        },
        {
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Opciones',
            disableOrder: true
        }
    ];
    interface EnhancedTablePropsAsignar {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataAsignar) => void;
        order: OrderAsignar;
        orderBy: string;
        rowCount: number;
    }
    function EnhancedTableHeadAsignar(props: EnhancedTablePropsAsignar) {
        const { order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler =
            (property: keyof DataAsignar) => (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

        return (
            <TableHead >
                <TableRow >
                    {headCellsAsignar.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                        >
                            {headCell.disableOrder ? headCell.label :
                                <TableSortLabel style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}

                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }



    const handleRequestSortBuscar = (
        event: React.MouseEvent<unknown>,
        property: keyof DataBuscar,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBuscar(isAsc ? 'desc' : 'asc');
        setOrderByBuscar(property);
    };
    const handleChangePageBuscar = (event: unknown, newPage: number) => {
        setPageBuscar(newPage);
    };
    const handleChangeRowsPerPageBuscar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPageBuscar(parseInt(event.target.value, 10));
        setPageBuscar(0);
    };
    const emptyRowsBuscar =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    



    const handleRequestSortAsignar = (
        event: React.MouseEvent<unknown>,
        property: keyof DataAsignar,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderAsignar(isAsc ? 'desc' : 'asc');
        setOrderByAsignar(property);
    };
    const handleChangePageAsignar = (event: unknown, newPage: number) => {
        setPageAsignar(newPage);
    };
    const handleChangeRowsPerPageAsignar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPageAsignar(parseInt(event.target.value, 10));
        setPageAsignar(0);
    };
    const emptyRowsAsignar =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    //#endregion 


    const MiniCam=()=>{
        Swal.fire({
            title: 'Seleccione minimo un campo',
            icon: 'warning',
          })
    }

    const buscarExamenes = (datoExamen: any, datoServicio: any) => {
        if (datoExamen != "" && datoServicio == "") {
            getFilterExamApi(datoExamen, "").then(ag => {
                setRowsAsignar(ag.data)
            })
        } else if (datoExamen == "" && datoServicio != "") {
            getFilterExamApi("", datoServicio).then(ag => {
                setRowsAsignar(ag.data)
            })
        } else if (datoExamen != "" && datoServicio != "") {
            getFilterExamApi(datoExamen, datoServicio).then(ag => {
                setRowsAsignar(ag.data)
            })
        } else {
            MiniCam()
        }
    }

    const buscarExamenEnter = (event: any, datoExamen: any, datoServicio: any) => {
        if (event.key === 'Enter') {
            buscarExamenes(datoExamen, datoServicio)
        }
    }

    const ExamErr=()=>{
        Swal.fire({
            title: 'El examen que eligio no cuenta con un precio',
            icon: 'warning',
            target: '#custom-target',
          })
    }

    const ExamAgregado=()=>{
        Swal.fire({
            title: 'El examen que eligio, ya esta agregado',
            icon: 'warning',
            target: '#custom-target',
          })
    }

    const ExamErrado=()=>{
        Swal.fire({
            title: 'Examen no registrado',
            icon: 'warning',
            target: '#custom-target',
          })
    }

    const ReferenteEr=()=>{
        Swal.fire({
            title: 'Referente no registrado',
            icon: 'warning',
            target: '#custom-target3',
          })
    }

    const agregarExamen = (id: any, code: any) => {
        const examen = listaPrecioData.examinations.find((x: any) => x.id == id);
        if (examen != undefined) {
            const filita = rows.find((x: any) => x.id == id);
            if (filita == undefined) {
                if (examen.price != 0) {
                    let fila = rows;
                    fila.push({
                        id: examen.id,
                        name: examen.name,
                        price: examen.price,
                        code: code
                        
                    });
                    setRows(fila);
                    ///////
                    calcularPrecio(fila)
                    setBloquearBoton(false)
                    //////
                    let aux = rowsAsignar;
                    setRowsAsignar(aux.filter((x: any) => x.id != examen.id))
                } else {
                   // alert("El examen que eligio no cuenta con un precio")
                   ExamErr()
                }
            } else{
                //alert("El examen que eligio, ya esta agregado")
                ExamAgregado()
            }
        } else {
            //alert("Examen no registrado")
            ExamErrado()
        }
    }
    const eliminarExamen = (id: any) => {
        let aux = rows;
        aux = aux.filter((x: any) => x.id != id)
        if(aux == 0){
            setBloquearBoton(true)
        }
        setRows(aux)
        calcularPrecio(aux)
    }
    const calcularPrecio = (fila: any) => {
        var acumPrice = 0;
        fila.forEach((x: any) => {
            acumPrice += x.price
        })
        setPrecio(acumPrice)
        setPrecioFinal(acumPrice - descuento);
    }


    const ErroGuardadoCita=()=>{
        Swal.fire({
            title: 'La cita no se guardo',
            icon: 'warning',
          })
    }

    const GuardaCita=()=>{
        Swal.fire({
            title: 'La cita se guardo correctamente',
            icon: 'success',
          })
    }


    const selectSede=()=>{
        Swal.fire({
            title: 'Seleccione una sede',
            icon: 'warning',
          })
    }

    const discountError=()=>{
        Swal.fire({
            title: 'Ingrese un descuento correcto',
            icon: 'warning',
          })
    }

    const hour=()=>{
        Swal.fire({
            title: 'Hora incorrecta',
            icon: 'warning',
          })
    }

    const date=()=>{
        Swal.fire({
            title: 'Fecha incorrecta',
            icon: 'warning',
          })
    }

    const Referen=()=>{
        Swal.fire({
            title: 'Seleccione una referencia',
            icon: 'warning',
          })
    }

    const Referencode=()=>{
        Swal.fire({
            title: 'Escriba un codigo de referencia',
            icon: 'warning',
          })
    }

    const ObservaReferente=()=>{
        Swal.fire({
            title: 'Ingrese las observaciones del referente',
            icon: 'warning',
          })
    }

    const MedicoAgrega=()=>{
        Swal.fire({
            title: 'Elija el medico',
            icon: 'warning',
          })
    }

    const guardarCita = () => {
        const hoy = moment().format("YYYY-MM-DD");
        if (sede == "") {
            //alert("Seleccione una sede");
            //setAbrirError(true);
            selectSede()
            return;
        }

        if (referencia == "") {
            //alert("Hora incorrecta");
            //setAbrirErrorHora(true);
            Referen()
            return;
        }

        if (codigoReferencia == "") {
            //alert("Hora incorrecta");
            //setAbrirErrorHora(true);
            Referencode()
            return;
        }
        if (medico == "") {
            //alert("Hora incorrecta");
            //setAbrirErrorHora(true);
            MedicoAgrega()
            return;
        }

        if (isNaN(precioFinal) || precioFinal <= 0) {
            //alert("Ingrese un descuento correcto");
            //setAbrirErrorDescuento(true);
            discountError()
            return;
        }

        if (fecha < hoy) {
            //alert("Fecha incorrecta");
            //setAbrirErrorFecha(true);
            date()
            return;
        }
        if (hora == "") {
            //alert("Hora incorrecta");
            //setAbrirErrorHora(true);
            hour()
            return;
        }

        let guardar: any = [];
        rows.forEach((x: any) => {
            guardar.push(x.id)
        })

        let data = {
            ClientId: idClient,
            DoctorId: medico,
            HeadquarterId: sede,
            RefererId: referencia,
            PriceListId: listaPrecio,
            dateAppointment: fecha,
            discount: descuento,
            examinations: guardar,
            doctorNotes: observacionesReferente,
            finalPrice: precioFinal,
            time: hora,
            totalPrice: precio,
            refererCode: codigoReferencia,
        }
        addAppointmentApi(data).then((x: any) => {
            if (x.status) {
                //alert(x.message.text)
                window.location.href = "/apps/appointments"
                //setAbrirGuardarCita(true);
                GuardaCita()
            } else {
                ErroGuardadoCita()
                //alert(x.message.text)
                
            }
        })

        
    }

    const NombMedico=()=>{
        Swal.fire({
            title: 'Ingrese nombre del medico',
            icon: 'warning',
            target: '#custom-target2',
          })
    }

    const AddMedico=()=>{
        Swal.fire({
            title: 'Medico agregado correctamente',
            icon: 'success',
          })
    }

    const NombError=()=>{
        Swal.fire({
            title: 'No se agrego el medico',
            icon: 'warning',
            target: '#custom-target2',
          })
    }
   

    const crearNuevoMedico = () => {
        if (nombreMedico == "") {
            //alert("Ingrese nombre del medico")
            NombMedico()
            return
        }
        let data = {
            doctorName: nombreMedico
        }
        addDoctorApi(data).then((x: any) => {
            if (x.status) {
                //alert(x.message.text)
                AddMedico()
                getDoctorApi().then((ag: any) => {
                    setMedicoList(ag.data);
                });
                setAbrirAgregarMedico(false)
            } else {
                //alert(x.message.text)
                NombError()
                return;
            }
        })
    }

    const NombNewRefer=()=>{
        Swal.fire({
            title: 'Ingrese nombre del referente',
            icon: 'warning',
            target: '#custom-target3',
          })
    }

    const NombNewReferError=()=>{
        Swal.fire({
            title: 'No se agrego el referente',
            icon: 'warning',
          })
    }

    const NewReferente=()=>{
        Swal.fire({
            title: 'Nuevo referente agregado',
            icon: 'success',
          })
    }

    

    const AparecerBoton = () => {
        setIsVisible(true);
    };

    const OcultarBoton = () => {
        setIsVisible(false);
    };

    const crearNuevoReferente = () => {
        if (nombreReferencia == "") {
            //alert("Ingrese nombre del referente")
            NombNewRefer()
            return
        }
        let data = {
            refererName: nombreReferencia
        }
        addRefererApi(data).then((x: any) => {
            if (x.status) {
                //alert(x.message.text)
                getRefererApi().then((ag: any) => {
                    setReferenciaList(ag.data);
                });
                setAbrirAgregarReferencia(false)
                NewReferente()
            } else {
                //alert(x.message.text)
                NombNewReferError()
                return;
            }
        })
    }
    return (
        
        <div className='tabla-componente card-table'>
          
            <Contenido>
              
                <Grid container style={{ alignItems: "center"}}>
                    <Grid container item>
                        <Link to={"/apps/appointments"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Cita</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item md={8}>
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Asignar Cita</div >
                        </Grid>
                        <Grid item md={4}>
                            <Button onClick={guardarCita} disabled={bloqueaboton} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={0.3}>
                        <Grid item >
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >Detalle de la cita</InputLabel >
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                    <Paper sx={{ width: '100%', mb: 20 }}>
                        <div>
                            <TabContext value={values}>
                                <Box >
                                    <TabList scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange}>
                                        <Tab className="h-64 normal-case" label="Datos de la Cita" value="1" />
                                        <Tab className="h-64 normal-case" label="Examenes" value="2" />
                                        <Tab className="h-64 normal-case" label="Fecha y Hora" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" onClick={DesactivarBarra} label="Metodo de busqueda" variant="outlined"
                                                      select fullWidth value={tipoDoc} onChange={handleChangeTypeDoc}
                                                >
                                                    {tipoDocListFilt.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value} onClick={DesactivarBarra}>{row.name}</MenuItem>
                                                            
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>

                                    
                                            <MenuItem style={{visibility: isVisible ? 'visible' : 'hidden'}} onClick={OpenButton}>
                                                        <Button onClick={handleOpenBuscarPaciente} disabled={bloqueaboton3} variant="contained" style={{ width: '35.5ch', height: '6.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.20rem" }}>Buscar Paciente por nombre</Button>
                                            </MenuItem>
                                            


                                            <Grid container item md={8}>
                                                <TextField error={numDoc === ""} onClick={OpenButton} disabled={bloqueaboton4} fullWidth id="outlined-basic" label="Buscar paciente *" variant="outlined"
                                                    value={numDoc} onChange={handleChangeNumDoc} onKeyPress={(event) => buscarDocEnter(event, numDoc)}
                                                    InputProps={{
                                                        style: {
                                                            cursor: "pointer"
                                                        },
                                                        endAdornment: (

                                                            <InputAdornment position="end" >
                                                                <MenuItem disabled={bloqueaboton4}>
                                                                <SearchSharpIcon onClick={() => buscarPaciente(numDoc)} />
                                                                </MenuItem>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={4} >
                                                <TextField error={nombres === ""} fullWidth id="outlined-basic" label="Nombres*" variant="outlined" value={nombres} onChange={handleChangeNombres}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField error={apePa === ""} fullWidth id="outlined-basic" label="Apellido paterno*" variant="outlined" value={apePa} onChange={handleChangeApePa}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField error={apeMa === ""} fullWidth id="outlined-basic" label="Apellido materno*" variant="outlined" value={apeMa} onChange={handleChangeApeMa}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={2.5} >
                                                <TextField error={sede === ""} id="outlined-basic" label="Sede*" variant="outlined"
                                                    select fullWidth value={sede} onChange={handleChangeSede}
                                                    helperText= "Por favor seleccione una sede"
                                                >
                                                    {sedeList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.name} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={2.5}>
                                                <TextField error={convenio === ""} id="outlined-basic" label="Convenio*" variant="outlined"
                                                    select fullWidth value={convenio} onChange={handleChangeConvenio}
                                                    helperText="Por favor seleccione un convenio"
                                                >
                                                    {convenioList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={2.5}>
                                                <TextField error={listaPrecio === ""} id="outlined-basic" label="Lista de precios*" variant="outlined"
                                                    select fullWidth value={listaPrecio} onChange={handleChangeListaPrecio}
                                                    disabled={abrirListaPrecios}
                                                    helperText="Por favor seleccione uno"
                                                >
                                                    {listaPrecioList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.name} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={2.5}>
                                                <TextField id="outlined-basic" label="Referencia" variant="outlined"
                                                    select fullWidth value={referencia} onChange={handleChangeReferencia}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenAbrirAgregarReferencia} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {referenciaList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.refererName} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={2}>
                                                <TextField fullWidth id="outlined-basic" label="Codigo referencia" variant="outlined" value={codigoReferencia} onChange={handleChangeCodigoReferencia} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Observaciones del referente" variant="outlined" value={observacionesReferente} onChange={handleChangeObservacionesReferente} />
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField id="outlined-basic" label="Medico que indica" variant="outlined"
                                                    select fullWidth value={medico} onChange={handleChangeMedico}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenAbrirAgregarMedico} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {medicoList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.doctorName} </MenuItem>
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
                                            <Grid container item md={6} >
                                                <Button onClick={handleOpenAgregarExamen} disabled={bloqueaboton2} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Agregar Examenes</Button>
                                            </Grid>
                                            <Grid container item md={6} spacing={2} >
                                                <Grid container item md={4} >
                                                    <TextField id="outlined-basic" label="Precio total *" variant="outlined"
                                                        fullWidth value={"S/."+precio} onChange={handleChangePrecio}
                                                        inputProps={
                                                            { readOnly: true, }
                                                        } />
                                                </Grid>
                                                <Grid container item md={4} >
                                                    <TextField id="outlined-basic" label="Descuento en soles *" variant="outlined"
                                                        fullWidth value={descuento} type="number" onChange={handleChangeDescuento} />
                                                </Grid>
                                                <Grid container item md={4} >
                                                    <TextField id="outlined-basic" label="Precio final *" variant="outlined"
                                                        fullWidth value={"S/."+precioFinal} onChange={handleChangePrecioFinal}
                                                        inputProps={
                                                            { readOnly: true, }
                                                        } />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={12}>
                                                <div style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.8rem" }} >Exámenes agregados</div>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={12}>

                                                <Box sx={{ width: '100%' }}>
                                                    <Paper sx={{ width: '100%', mb: 2 }} className="card-table">
                                                        <TableContainer>
                                                            <Table
                                                                sx={{ minWidth: 750 }}
                                                                aria-labelledby="tableTitle"
                                                                size={'medium'}
                                                            >
                                                                <EnhancedTableHead
                                                                    numSelected={selected.length}
                                                                    order={order}
                                                                    orderBy={orderBy}
                                                                    onRequestSort={handleRequestSort}
                                                                    rowCount={rows.length}
                                                                />
                                                                <TableBody>
                                                                    {stableSort(rows, getComparator(order, orderBy))
                                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                        .map((row: any, index: any) => {
                                                                            const labelId = `enhanced-table-checkbox-${index}`;

                                                                            return (
                                                                                <TableRow
                                                                                    hover
                                                                                    tabIndex={-1}
                                                                                    key={row.id}
                                                                                >
                                                                                    <TableCell
                                                                                        component="th"
                                                                                        id={labelId}
                                                                                        scope="row"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                    >
                                                                                        {row.code}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="left"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                    >
                                                                                        {row.name}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="left"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                    >
                                                                                        {row.price}
                                                                                    </TableCell>
                                                                                    <TableCell align="left">
                                                                                        <div style={{ display: "flex" }}>
                                                                                            <div onClick={() => eliminarExamen(row.id)} style={{ paddingRight: "5px" }}><Button variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> ELIMINAR</Button></div>
                                                                                        </div>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            );
                                                                        })}
                                                                    {(emptyRows > 0 && (
                                                                        <TableRow
                                                                            style={{
                                                                                height: (53) * emptyRows,
                                                                            }}
                                                                        >
                                                                            <TableCell colSpan={6} />
                                                                        </TableRow>
                                                                    ))}

                                                                    {
                                                                      rows.length == 0 ? <TableRow>
                                                                        
                                                                       <TableCell colSpan={8}  >
                                                                          No agrego ningun examen
                                                                       </TableCell>
                                                                    </TableRow> : ""
                                                                    }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        <TablePagination
                                                            rowsPerPageOptions={[5, 15, 20]}
                                                            component="div"
                                                            count={rows.length}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                            labelRowsPerPage={"Filas por Pagina: "}
                                                            labelDisplayedRows={
                                                                ({ from, to, count }) => {
                                                                    return '' + from + '-' + to + ' de ' + count
                                                                }
                                                            }
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                        />
                                                    </Paper>
                                                </Box>

                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={6} >
                                                <TextField type="date" focused fullWidth id="outlined-basic" label="Fecha *" variant="outlined" value={fecha} onChange={handleChangFecha} />
                                            </Grid>
                                            <Grid container item md={6} >
                                                <TextField type="time" focused fullWidth id="outlined-basic" label="Hora *" variant="outlined" value={hora} onChange={handleChangeHora} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                            </TabContext>
                        </div>
                     </Paper>
                    </CardContent>
                </div >
                <div>
                    <Modal id="custom-target"
                        keepMounted
                        open={asignarExamenes}
                        onClose={handleCloseAsignarExamenes}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Asignar examenes</InputLabel >
                            <Grid container item mt={2.5} spacing={2}>
                                <Grid item xs={6} >
                                    <TextField fullWidth id="outlined-basic" label="Buscar examenes *" variant="outlined"
                                        value={examenes} onChange={handleChangeExamenes} onKeyPress={(event) => buscarExamenEnter(event, examenes, servicio)}
                                        InputProps={{
                                            style: {
                                                cursor: "pointer"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <SearchSharpIcon onClick={() => buscarExamenes(examenes, servicio)} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField fullWidth id="outlined-basic" label="Servicio"
                                        variant="outlined" value={servicio} onChange={handleChangeServicio}
                                        select
                                    >
                                        {servicioList.map((row: any, index: any) => {
                                            return (
                                                <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container item mt={2.5}>
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <Paper sx={{ width: '100%', mb: 2, borderRadius: "12px" }}>
                                            <TableContainer>
                                                <Table
                                                    sx={{ minWidth: 750 }}
                                                    aria-labelledby="tableTitle"
                                                    size={'medium'}
                                                >
                                                    <EnhancedTableHeadAsignar
                                                        numSelected={selectedAsignar.length}
                                                        order={orderAsignar}
                                                        orderBy={orderByAsignar}
                                                        onRequestSort={handleRequestSortAsignar}
                                                        rowCount={rowsAsignar.length}
                                                    />
                                                    <TableBody>
                                                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                                                        {stableSortAsignar(rowsAsignar, getComparatorAsignar(orderAsignar, orderByAsignar))
                                                            .slice(pageAsignar * rowsPerPageAsignar, pageAsignar * rowsPerPageAsignar + rowsPerPageAsignar)
                                                            .map((row: any, index: any) => {
                                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        tabIndex={-1}
                                                                        key={index}
                                                                    >
                                                                        <TableCell
                                                                            component="th"
                                                                            id={labelId}
                                                                            scope="row"
                                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                        >
                                                                            {index}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="left"
                                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                        >
                                                                            {row.name}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="left"
                                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                        >
                                                                            {row.service.name}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="left"
                                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                        >
                                                                            {row.description}
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <div style={{ display: "flex" }}>
                                                                                <div style={{ paddingRight: "5px" }}>
                                                                                    <Button onClick={() => agregarExamen(row.id, row.code)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> Agregar</Button>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        {(emptyRowsAsignar > 0 && (
                                                            <TableRow
                                                                style={{
                                                                    height: (53) * emptyRowsAsignar,
                                                                }}
                                                            >
                                                                <TableCell colSpan={6} />
                                                            </TableRow>
                                                        ))}

                                                        {
                                                            rows.length == 0 ? <TableRow >
                                                             <TableCell colSpan={8} >
                                                                    No agrego examenes
                                                             </TableCell>
                                                             </TableRow> : ""
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 15, 20]}
                                                component="div"
                                                count={rowsAsignar.length}
                                                rowsPerPage={rowsPerPageAsignar}
                                                page={pageAsignar}
                                                labelRowsPerPage={"Filas por Pagina: "}
                                                labelDisplayedRows={
                                                    ({ from, to, count }) => {
                                                        return '' + from + '-' + to + ' de ' + count
                                                    }
                                                }
                                                onPageChange={handleChangePageAsignar}
                                                onRowsPerPageChange={handleChangeRowsPerPageAsignar}
                                            />
                                        </Paper>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAsignarExamenes} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal id="custom-target2"
                        keepMounted
                        open={abrirAgregarMedico}
                        onClose={handleCloseAbrirAgregarMedico}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Crear nuevo medico</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre del Médico" variant="outlined" value={nombreMedico} onChange={handleChangeNombreMedico} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={8} ></Grid>
                                <Grid container item xs={4} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseAbrirAgregarMedico} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearNuevoMedico} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal id="custom-target3"
                        keepMounted
                        open={abrirAgregarReferencia}
                        onClose={handleCloseAbrirAgregarReferencia}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Agregar nueva referencia</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre del Referente" variant="outlined" value={nombreReferencia} onChange={handleChangeNombreReferencia} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={8} ></Grid>
                                <Grid container item xs={4} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseAbrirAgregarReferencia} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearNuevoReferente} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirBuscarPaciente}
                        onClose={handleCloseBuscarPaciente}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style} className="card-table-general">
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Buscar Paciente</InputLabel >
                            <Grid container item mt={2.5} spacing={2}>
                                <Grid item xs={6} >
                                    <TextField fullWidth id="outlined-basic" label="Buscar pacientes *" variant="outlined"
                                        value={dato} onChange={handleChangeBuscarPaciente} onKeyPress={(event) => buscarDocEnter(event, dato)}
                                        InputProps={{
                                            style: {
                                                cursor: "pointer"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <SearchSharpIcon onClick={filt} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                
                            </Grid>

                            <Grid container spacing={2} mt={0.5}>
                                    <Grid container item md={12}>
                                       <div style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.8rem" }} >Pacientes encontrados</div>
                                    </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={0.5}>
                                             <Grid container item mt={2.5}>
                                               <Grid item xs={12}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Paper sx={{ width: '100%', mb: 10, borderRadius: "12px" }} className="card-table-general">
                                                        <TableContainer>
                                                            <Table
                                                                sx={{ minWidth: 750 }}
                                                                aria-labelledby="tableTitle"
                                                                size={'medium'}
                                                            >
                                                                <EnhancedTableHeadBuscar
                                                                    numSelected={selectedBuscar.length}
                                                                    order={orderBuscar}
                                                                    orderBy={orderByBuscar}
                                                                    onRequestSort={handleRequestSortBuscar}
                                                                    rowCount={rowsBuscar.length}
                                                                />
                                                                <TableBody>
                                                                    {stableSortBuscar(rowsBuscar, getComparatorBuscar(orderBuscar, orderByBuscar))
                                                                        .slice(pageBuscar * rowsPerPageBuscar, pageBuscar * rowsPerPageBuscar + rowsPerPageBuscar)
                                                                        .map((row: any, index: any) => {
                                                                            const labelId = `enhanced-table-checkbox-${index}`;

                                                                            return (
                                                                                <TableRow
                                                                                    hover
                                                                                    tabIndex={-1}
                                                                                    key={row.id}
                                                                                >
                                                                                    <TableCell
                                                                                        component="th"
                                                                                        id={labelId}
                                                                                        scope="row"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                        key="dni"
                                                                                    >
                                                                                       {row.person.dni}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="left"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                    >
                                                                                        {row.person.name}
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="left"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                    >
                                                                                        {row.person.lastNameP}
                                                                                        
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="left"
                                                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                    >
                                                                                        {row.person.lastNameM}
                                                                                        
                                                                                    </TableCell>
                                                                                    <TableCell align="left">
                                                                                        <div style={{ display: "flex" }}>
                                                                                            <div onClick={() => buscarPaciente(row.person.name)} style={{ paddingRight: "5px" }}><Button variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> AGREGAR</Button></div>
                                                                                        </div>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            );
                                                                        })}
                                                                    {(emptyRowsBuscar > 0 && (
                                                                        <TableRow
                                                                            style={{
                                                                                height: (53) * emptyRowsBuscar,
                                                                            }}
                                                                        >
                                                                            <TableCell colSpan={6} />
                                                                        </TableRow>
                                                                    ))}

                                                                    {
                                                                      rowsBuscar.length == 0 ? <TableRow>
                                                                        
                                                                       <TableCell colSpan={8}  >
                                                                          No hay coincidencia de pacientes
                                                                       </TableCell>
                                                                    </TableRow> : ""
                                                                    }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        <TablePagination
                                                            rowsPerPageOptions={[5, 15, 20]}
                                                            component="div"
                                                            count={rowsBuscar.length}
                                                            rowsPerPage={rowsPerPageBuscar}
                                                            page={pageBuscar}
                                                            labelRowsPerPage={"Filas por Pagina: "}
                                                            labelDisplayedRows={
                                                                ({ from, to, count }) => {
                                                                    return '' + from + '-' + to + ' de ' + count
                                                                }
                                                            }
                                                            onPageChange={handleChangePageBuscar}
                                                            onRowsPerPageChange={handleChangeRowsPerPageBuscar}
                                                        />
                                                    </Paper>
                                                </Box>

                                            </Grid>
                                            </Grid>
                                        </Grid>

                           
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseBuscarPaciente} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
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