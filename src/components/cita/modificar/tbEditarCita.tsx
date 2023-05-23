import { Button, CardContent, Grid, InputAdornment, InputLabel, MenuItem, Modal, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Tabs } from '@mui/material';
import { addRefererApi, addDoctorApi, editAppointmentApi, getAgreementsAllApi, getAgreementsListPriceApi, getAppointmentApi, getAppointmentsResultsApi, getDistrictsForProvince, getDoctorApi, getExaminationsAllApi, getExamValuesApi, getFilterExamApi, getHeadquartersAllApi, getPatienByDOCApi, getProvincesForRegion, getRefererApi, getRegionsApi, getServicesAllApi, getTypeDocsApi } from "../../../api";
import { Link, useParams } from "react-router-dom";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import moment from "moment";
import Swal from 'sweetalert2';

export default function TbEditarCita() {

    const { id } = useParams()

    const [values, setValues] = React.useState<string>("1");
    //#region GET-SET textfield

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

    const [abrirListaPrecios, setAbrirListaPrecios] = React.useState<any>(true);
    const [asignarExamenes, setAsignarExamenes] = React.useState<any>(false);
    const [examenes, setExamenes] = React.useState<any>('');
    const [servicioList, setServicioList] = React.useState<any[]>([]);
    const [servicio, setServicio] = React.useState<any>('');
    //#region handles de Vistas

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
    const [fechaCreacion, setFechaCreacion] = React.useState<any>('');
    const [nombreReferencia, setNombreReferencia] = React.useState<any>('');
    const [abrirAgregarReferencia, setAbrirAgregarReferencia] = React.useState<any>(false);

    //#region Primera Vista(Datos Personales)
    const handleCloseAbrirAgregarReferencia = () => {
        setAbrirAgregarReferencia(false);
    }
    const handleOpenAbrirAgregarReferencia = () => {
        setAbrirAgregarReferencia(true);
        setNombreReferencia("")
    }
    const handleChangeNombreReferencia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreReferencia(event.target.value);
    };
    const handleCloseAbrirAgregarMedico = () => {
        setAbrirAgregarMedico(false);
    }
    const handleOpenAbrirAgregarMedico = () => {
        setAbrirAgregarMedico(true);
        setNombreMedico("")
    }
    const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFechaCreacion(event.target.value);
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
        /////////MOSTAR DATOS DE CITA//////////////////////////////////////////////////////
        getAppointmentApi(id).then((x: any) => {
            setTipoDoc("")
            setListaPrecio("")
            buscarPaciente(x.data.client.dni)
            setSede(x.data.headquarter.id == null ? "" : x.data.headquarter.id)
            setConvenio(x.data.AgreementId == null ? "" : x.data.AgreementId)
            setAbrirListaPrecios(false)
            setListaPrecio(x.data.priceList.id)
            setBloquearAgregarExamenes(false)
            getAgreementsListPriceApi(x.data.AgreementId).then((ag: any) => {
                setListaPrecioList(ag.data)
                setListaPrecioData(ag.data.find((p: any) => p.id == x.data.priceList.id));
                getExamValuesApi(id).then((y: any) => {
                    for (let a = 0; a < y.data.length; a++) {
                        console.log(y.data[a].ExaminationId)
                        //console.log(y.data.services[a].examinations[0].code)
                        setAgregarExamen(ag.data.find((p: any) => p.id == x.data.priceList.id), y.data[a].ExaminationId, x.data.discount)
                    }
                });
            });
            setReferencia(x.data.Referer.id == null ? "" : x.data.Referer.id)
            setCodigoReferencia(x.data.refererCode)
            setObservacionesReferente(x.data.doctorNotes)
            setMedico(x.data.DoctorId)

            setDescuento(x.data.discount)
            setFecha(x.data.dateAppointment)
            setHora(x.data.time)
            setFechaCreacion(moment(x.data.createdAt).format('YYYY-MM-DD'))
        });
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

    const OpenExamenListaPrecio=()=>{
        Swal.fire({
            title: 'Eliga una lista de precio',
            icon: 'warning',
          })
    }

    const errDNIPaciente=()=>{
        Swal.fire({
            title: 'Ingrese el dni del paciente',
            icon: 'warning',
          })
    }

    const handleOpenAgregarExamen = () => {
        if (nombres == "") {
            errDNIPaciente()
            setAsignarExamenes(false);
            return;
        }
        if (bloquearAgregarExamenes) {
            OpenExamenListaPrecio()
            setAsignarExamenes(false);
            return;
        }
        setAsignarExamenes(true);
        setExamenes("")
        setServicio("")
        setRowsAsignar([])

    }
    const buscarPaciente = (dato: any) => {
        let datos;
        if (tipoDoc == "1") {
            datos = "dni";
        } else if (tipoDoc == "2") {
            datos = "passport"
        } else {
            datos = "dni"
        }
        getPatienByDOCApi(datos, dato).then((x: any) => {
            if (x.status) {
                setNombres(x.data.person.name)
                setApePa(x.data.person.lastNameP)
                setApeMa(x.data.person.lastNameM)
            } else {
                alert(x.message.text)
                return;
            }
        });

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
        p: 4,
    };
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


    const errSelectMinimCamp=()=>{
        Swal.fire({
            title: 'Seleccione un minimo campo',
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
            errSelectMinimCamp()
        }
    }
    const buscarExamenEnter = (event: any, datoExamen: any, datoServicio: any) => {
        if (event.key === 'Enter') {
            buscarExamenes(datoExamen, datoServicio)
        }
    }
    const setAgregarExamen = (lista: any, id: any, descuento: any) => {
        const examen = lista.examinations.find((x: any) => x.id == id);
        if (examen != undefined) {
            const filita = rows.find((x: any) => x.id == id);
            if (filita == undefined) {
                if (examen.price != 0) {
                    let fila = rows;
                    fila.push({
                        id: examen.id,
                        name: examen.name,
                        price: examen.price,
                        code: "E0" + examen.id
                    });
                    setRows(fila);
                    ///////
                    setCalcularPrecio(fila, descuento)
                    //////
                    let aux = rowsAsignar;
                    setRowsAsignar(aux.filter((x: any) => x.id != examen.id))
                }
            }
        }
    }

    const examNoPrice=()=>{
        Swal.fire({
            title: 'El examen que eligio no cuenta con un precio',
            icon: 'warning',
          })
    }

    const examYaAgregado=()=>{
        Swal.fire({
            title: 'El examen que eligio, ya esta agregado',
            icon: 'warning',
          })
    }

    const examNoAgregado=()=>{
        Swal.fire({
            title: 'Examen no registrado',
            icon: 'warning',
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
                    //////
                    let aux = rowsAsignar;
                    setRowsAsignar(aux.filter((x: any) => x.id != examen.id))
                } else {
                    examNoPrice()
                }
            } else {
               examYaAgregado()
            }
        } else {
           examNoAgregado()
        }
    }
    const setCalcularPrecio = (fila: any, descuento: any) => {
        let acumPrice = 0;
        fila.forEach((x: any) => {
            acumPrice += x.price
        })
        setPrecio(acumPrice)
        setPrecioFinal(acumPrice - descuento);
    }
    const eliminarExamen = (id: any) => {
        let aux = rows;
        aux = aux.filter((x: any) => x.id != id)
        setRows(aux)
        calcularPrecio(aux)
    }
    const calcularPrecio = (fila: any) => {
        let acumPrice = 0;
        fila.forEach((x: any) => {
            acumPrice += x.price
        })
        setPrecio(acumPrice)
        setPrecioFinal(acumPrice - descuento);
    }

    const errSede=()=>{
        Swal.fire({
            title: 'Seleccione una sede',
            icon: 'warning',
          })
    }

    const errDescuent=()=>{
        Swal.fire({
            title: 'Ingrese un descuento correcto',
            icon: 'warning',
          })
    }

    const errDate=()=>{
        Swal.fire({
            title: 'Fecha incorrecta',
            icon: 'warning',
          })
    }
    
    const errHour=()=>{
        Swal.fire({
            title: 'Hora incorrecta',
            icon: 'warning',
          })
    }

    const editCita=()=>{
        Swal.fire({
            title: 'Cita editada con exito',
            icon: 'success',
          })
    }


    const errEditCita=()=>{
        Swal.fire({
            title: 'La cita no fue editada',
            icon: 'success',
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
            errSede()
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
            errDescuent()
            return;
        }
        if (fecha < hoy) {
            errDate()
            return;
        }
        if (hora == "") {
            errHour()
            return;
        }

        let guardar: any = [];
        rows.forEach((x: any) => {
            guardar.push(x.id)
        })

        let data = {
            DoctorId: medico,
            HeadquarterId: sede,
            PriceListId: listaPrecio,
            RefererId: referencia,
            dateAppointment: fecha,
            discount: descuento,
            doctorNotes: observacionesReferente,
            examinations: guardar,
            finalPrice: precioFinal,
            refererCode: codigoReferencia,
            time: hora,
            totalPrice: precio
        }
        editAppointmentApi(data, id).then(x => {
            if (x.status) {
                editCita()
                window.location.href = "/apps/appointments"
            } else {
                errEditCita()
                return;
            }
        })
    }

    const errNombMedico=()=>{
        Swal.fire({
            title: 'Ingrese nombre del medico',
            icon: 'warning',
            target: '#custom-target2',
          })
    }

    const medicoNoCreate=()=>{
        Swal.fire({
            title: 'El medico no fue agregado',
            icon: 'warning',
            target: '#custom-target2',
          })
    }

    const medicoCreate=()=>{
        Swal.fire({
            title: 'El medico fue agregado',
            icon: 'success',
          })
    }

    const crearNuevoMedico = () => {
        if (nombreMedico == "") {
            errNombMedico()
            return
        }
        let data = {
            doctorName: nombreMedico
        }
        addDoctorApi(data).then((x: any) => {
            if (x.status) {
                medicoCreate()
                getDoctorApi().then((ag: any) => {
                    setMedicoList(ag.data);
                });
                setAbrirAgregarMedico(false)
            } else {
                medicoNoCreate()
                return;
            }
        })
    }

    const errNombReferer=()=>{
        Swal.fire({
            title: 'Ingrese nombre del referente',
            icon: 'warning',
            target: '#custom-target3',
          })
    }

    const ReferenteAgreg=()=>{
        Swal.fire({
            title: 'Referente agregado',
            icon: 'success',
          })
    }

    const ReferenteNoAgreg=()=>{
        Swal.fire({
            title: 'El referente no fue agregado',
            icon: 'warning',
          })
    }


    const crearNuevoReferente = () => {
        if (nombreReferencia == "") {
            errNombReferer()
            return
        }
        let data = {
            refererName: nombreReferencia
        }
        addRefererApi(data).then((x: any) => {
            if (x.status) {
                ReferenteAgreg()
                getRefererApi().then((ag: any) => {
                    setReferenciaList(ag.data);
                });
                setAbrirAgregarReferencia(false)
            } else {
                ReferenteNoAgreg()
                return;
            }
        })
    }
    return (
        <div className='tabla-componente card-table'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container item  >
                        <Link to={"/apps/appointments"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Cita</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item md={8}>
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Editar Cita</div>
                        </Grid>
                        <Grid item md={4}>
                            <Button onClick={guardarCita} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
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
                    <br></br>
                    <br></br>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                      <Paper sx={{ width: '100%', mb: 20 }}>
                        <div>
                            <TabContext value={values}>
                                <Box >
                                    <Tabs value={values} scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange}>
                                        <Tab className="h-64 normal-case" label="Datos de la Cita" value="1" />
                                        <Tab className="h-64 normal-case" label="Examenes" value="2" />
                                        <Tab className="h-64 normal-case" label="Fecha y Hora" value="3" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="1">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Tipo Documento" variant="outlined"
                                                    select fullWidth value={tipoDoc} onChange={handleChangeTypeDoc}

                                                    inputProps={
                                                        { readOnly: true, }
                                                    }
                                                >
                                                    {tipoDocList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={8}>
                                                <TextField fullWidth id="outlined-basic" label="Buscar paciente *" variant="outlined"
                                                    value={numDoc} onChange={handleChangeNumDoc} onKeyPress={(event) => buscarDocEnter(event, numDoc)}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    }
                                                    InputProps={{
                                                        style: {
                                                            cursor: "pointer"
                                                        },
                                                        endAdornment: (
                                                            <InputAdornment position="end" >
                                                                <SearchSharpIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Nombres" variant="outlined" value={nombres} onChange={handleChangeNombres}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Apellido paterno" variant="outlined" value={apePa} onChange={handleChangeApePa}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Apellido materno" variant="outlined" value={apeMa} onChange={handleChangeApeMa}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={2.5} >
                                                <TextField id="outlined-basic" label="Sede" variant="outlined"
                                                    select fullWidth value={sede} onChange={handleChangeSede}
                                                >
                                                    {sedeList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.name} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={2.5}>
                                                <TextField id="outlined-basic" label="Convenio" variant="outlined"
                                                    select fullWidth value={convenio} onChange={handleChangeConvenio}
                                                >
                                                    {convenioList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={2.5}>
                                                <TextField id="outlined-basic" label="Lista de precios" variant="outlined"
                                                    select fullWidth value={listaPrecio} onChange={handleChangeListaPrecio}
                                                    disabled={abrirListaPrecios}
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
                                                <Button onClick={handleOpenAgregarExamen} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Agregar Examenes</Button>
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
                                                    <TextField id="outlined-basic" label="Descuento *" variant="outlined"
                                                        fullWidth value={descuento} type='number' onChange={handleChangeDescuento} />
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
                                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.8rem" }} >Exámenes agregados</InputLabel>
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
                                                                    {emptyRows > 0 && (
                                                                        <TableRow
                                                                            style={{
                                                                                height: (53) * emptyRows,
                                                                            }}
                                                                        >
                                                                            <TableCell colSpan={6} />
                                                                        </TableRow>
                                                                    )}
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
                                            <Grid container item md={4} >
                                                <TextField type="date" focused fullWidth id="outlined-basic" label="Fecha *" variant="outlined" value={fecha} onChange={handleChangFecha} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField type="time" focused fullWidth id="outlined-basic" label="Hora *" variant="outlined" value={hora} onChange={handleChangeHora} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField type="date" focused fullWidth id="outlined-basic" label="Fecha de creación" variant="outlined" value={fechaCreacion} onChange={handleChangeFechaCreacion}
                                                    inputProps={
                                                        { readOnly: true, }
                                                    } />
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
                    <Modal
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
                                                                        key={row.code}
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
                                                        {emptyRowsAsignar > 0 && (
                                                            <TableRow
                                                                style={{
                                                                    height: (53) * emptyRowsAsignar,
                                                                }}
                                                            >
                                                                <TableCell colSpan={6} />
                                                            </TableRow>
                                                        )}
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
            </Contenido >
        </div >
    )

}


