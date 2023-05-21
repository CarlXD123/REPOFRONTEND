import { Button, CardContent, Grid, InputAdornment, InputLabel, MenuItem, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Tabs } from '@mui/material';
import { getAgreementsAllApi, saveUnitApi, getAgreementsListPriceApi, saveMethodApi, getDistrictsForProvince, getDoctorApi, getHeadquartersAllApi, getMethodsAllApi, getProvincesForRegion, getRefererApi, getRegionsApi, getServicesAllApi, getTypeDocsApi, getUnitsAllApi, saveExaminationApi, saveServiceApi} from "../../../api";
import { Link } from "react-router-dom";
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Modal } from "@material-ui/core";
import Swal from 'sweetalert2';

export default function TbRegExamen() {
    const [values, setValues] = React.useState<string>("1");
    //#region GET-SET textfield

    const [serviciosList, setServiciosList] = React.useState<any[]>([]);
    const [servicios, setServicios] = React.useState<any>('');
    const [nombres, setNombres] = React.useState<any>('');
    const [indicacion, setIndicacion] = React.useState<any>('');
    const [nomGrupo, setNomGrupo] = React.useState<any>('');

    const [valorReferencial, setValorReferencial] = React.useState<any>('');

    const [tipoMuestra, setTipoMuestra] = React.useState<any>('');
    const [volumen, setVolumen] = React.useState<any>('');
    const [insumos, setInsumos] = React.useState<any>('');
    const [bloqueaboton, setBloquearBoton] = React.useState<any>(true);
    const [temperaturaConservacion, setTemperaturaConservacion] = React.useState<any>('');
    const [condicionesAyuno, setCondicionesAyuno] = React.useState<any>('');
    const [frecuenciaCorridas, setFrecuenciaCorridas] = React.useState<any>('');
    const [horaProceso, setHoraProceso] = React.useState<any>('');
    const [tiempoReporte, setTiempoReporte] = React.useState<any>('');


    const [nomGrupoValorExm, setNomGrupoValorExm] = React.useState<any>('');
    const [metodologiaList, setMetodologiaList] = React.useState<any[]>([]);
    const [metodologia, setMetodologia] = React.useState<any>('');
    const [unidadList, settUnidadList] = React.useState<any[]>([]);
    const [unidad, setUnidad] = React.useState<any>('');
    const [valorExamen, setValorExamen] = React.useState<any>('');
    const [valoresReferenciales, setValoresReferenciales] = React.useState<any>('');

    const [abrirGrupo, setAbrirGrupo] = React.useState<any>(false);
    const [abrirGuardarExamen, setAbrirGuardarExamen] = React.useState<any>(false);
    const [abrirGuardarExamenError, setAbrirGuardarExamenError] = React.useState<any>(false);
    const [editNombreGrupo, setEditNombreGrupo] = React.useState<any>('');

    const [abrirValores, setAbrirValores] = React.useState<any>(false);
    const [editNombreValores, setEditNombreValores] = React.useState<any>('');
    const [editUnit, setEditUnit] = React.useState<any>('');
    const [editmethod, setEditMethod] = React.useState<any>('');

    const [abrirReferencias, setAbrirReferencias] = React.useState<any>(false);
    const [editNombreReferencias, setEditNombreReferencias] = React.useState<any>('');

    const [indexNombreGrupo, setIndexNombreGrupo] = React.useState<any>('');
    const [indexNombreValores, setIndexNombreValores] = React.useState<any>('');
    const [indexNombreReferencial, setIndexNombreReferencial] = React.useState<any>('');
    const [nombreService, setNombreService] = React.useState<any>('');
    const [descripcionService, setDescripcionService] = React.useState<any>('');
    const [abrirService, setAbrirService] = React.useState<any>(false);
    const [nombreMethod, setNombreMethod] = React.useState<any>('');
    const [descripcionMethod, setDescripcionMethod] = React.useState<any>('');
    const [abrirMethod, setAbrirMethod] = React.useState<any>(false);
    const [nombreUnit, setNombreUnit] = React.useState<any>('');
    const [descripcionUnit, setDescripcionUnit] = React.useState<any>('');
    const [abrirUnit, setAbrirUnit] = React.useState<any>(false);

    const [i, setI] = React.useState<any>(1);
    const [iV, setIv] = React.useState<any>(1);
    const [iR, setIr] = React.useState<any>(1);
    //#endregion

    //#region handles de Vistas
    const handleChangeEditNombreReferencias = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditNombreReferencias(event.target.value);
    };

    const handleChangeNombreService = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreService(event.target.value);
    };

    const handleChangeDescripcionService = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionService(event.target.value)
    }

    const handleChangeNombreMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreMethod(event.target.value);
    };

    const handleChangeDescripcionMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionMethod(event.target.value)
    }

    const handleChangeNombreUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreUnit(event.target.value);
    };

    const handleChangeDescripcionUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionUnit(event.target.value)
    }

    const handleCloseReferencias = () => {
        setAbrirReferencias(false);
    }

    const handleCloseService = () => {
        setAbrirService(false);
    }

    const handleCloseMethod = () => {
        setAbrirMethod(false);
    }

    const handleCloseUnit = () => {
        setAbrirUnit(false);
    }

    const handleOpenReferencias = (index:any, name:any) => {
        setEditNombreReferencias(name)
        setIndexNombreReferencial(index)
        setAbrirReferencias(true);
    }
    const editarReferencia = () => {
        let aux = rowsReferencial;
        aux.forEach((x: any) => {
            if (x.idValoresReferenciales == indexNombreReferencial) {
                x.nombreReferencia = editNombreReferencias
            }
            setRowsReferencial(aux)
        })
        setAbrirReferencias(false)
    }
    const eliminarFilaReferencial = (index: any) => {
        setRowsReferencial(rowsReferencial.filter((x: any) => x.idValoresReferenciales != index))
    }
    const handleChangeEditNombreValores = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditNombreValores(event.target.value);
    };

    const handleChangeEditUniti = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditUnit(event.target.value);
    };

    const handleChangeEditMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditMethod(event.target.value);
    };

    const handleCloseValores = () => {
        setAbrirValores(false);
    }
    const handleOpenValores = (index: any, name: any, name2: any, name3: any) => {
        setEditNombreValores(name)
        setEditUnit(name2)
        setEditMethod(name3)
        setIndexNombreValores(index)
        setAbrirValores(true);
    }


    var editNombValSucces=()=>{
        Swal.fire({
            title: 'Valor del examen modificado exitosamente',
            icon: 'success',
            target: '#tarjeta',
        })
    } 

    var editUnitSucces=()=>{
        Swal.fire({
            title: 'Campos modificados exitosamente',
            icon: 'success',
            target: '#tarjeta',
        })
    } 

    var editMetodologia=()=>{
        Swal.fire({
            title: 'Ingresa la metodologia del examen',
            icon: 'success',
            target: '#tarjeta',
        })
    } 

    var editUnidad=()=>{
        Swal.fire({
            title: 'Ingresa la unidad',
            icon: 'success',
            target: '#tarjeta',
        })
    } 

    var editNombValor=()=>{
        Swal.fire({
            title: 'Ingrese el nombre del valor del examen',
            icon: 'success',
            target: '#tarjeta',
        })
    } 


    const editarValores = () => {
        let aux = rowsValores;
        let auxReferencial = rowsReferencial;

        if(editNombreValores!=""){
            aux.forEach((x: any) => {
                if (x.idValoresExamen == indexNombreValores) {
                    x.valorExam = editNombreValores
                }
                setRowsValores(aux)
            })
            auxReferencial.forEach((x: any) => {
                if (x.idExamenValor == indexNombreValores) {
                    x.valorExamen = editNombreValores
                }
                setRowsReferencial(auxReferencial)
            })
        }
        editNombValSucces()
    }

    const editarcampos = () => {
        let aux = rowsValores;
        let auxReferencial = rowsReferencial;
        if(editmethod == ""){
           editMetodologia()
        }

        if(editUnit == ""){
           editUnidad()
        }

        if(editNombreValores ==""){
           editNombValor()
        }


        if(editmethod!=""){
            aux.forEach((x: any) => {
                if (x.idValoresExamen == indexNombreValores) {
                    x.idMetodologia = editmethod
                    x.MethodId = editmethod
                    x.nombreMetodologia = metodologiaList.filter((x: any) => x.id == editmethod)[0].name
                }
                setRowsValores(aux)
            })
        }
    

        if(editUnit!=""){
            aux.forEach((x: any) => {
                if (x.idValoresExamen == indexNombreValores) {
                    x.UnitId = editUnit
                    x.idUnidad = editUnit
                    x.nombreUnidad = unidadList.filter((x: any) => x.id == editUnit)[0].name
                }
                setRowsValores(aux)
            })
        }


        if(editNombreValores!=""){
            aux.forEach((x: any) => {
                if (x.idValoresExamen == indexNombreValores) {
                    x.valorExam = editNombreValores
                }
                setRowsValores(aux)
            })
            auxReferencial.forEach((x: any) => {
                if (x.idExamenValor == indexNombreValores) {
                    x.valorExamen = editNombreValores
                }
                setRowsReferencial(auxReferencial)
            })
        }

        editUnitSucces()

    }


   console.log(editUnit)
    const eliminarFilaValores = (index: any) => {
        setRowsValores(rowsValores.filter((x: any) => x.idValoresExamen != index))
        setRowsReferencial(rowsReferencial.filter((x: any) => x.idExamenValor != index))  

        if (rowsValores.length == 1) { 
            setBloquearBoton(true)
        }
    }
    const handleChangeEditNombreGrupo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditNombreGrupo(event.target.value);
    };
    const handleCloseGrupo = () => {
        setAbrirGrupo(false);
    }
    const handleOpenGrupo = (index: any, name: any) => {
        setEditNombreGrupo(name)
        setIndexNombreGrupo(index)
        setAbrirGrupo(true);
    }
    const editarGrupo = () => {
        let aux = rows;
        let auxValores = rowsValores;
        let auxRreferenciales = rowsReferencial;
        aux.forEach((x: any) => {
            if (x.idGrupo == indexNombreGrupo) {
                x.name = editNombreGrupo
            }
            setRows(aux)
        })
        auxValores.forEach((x: any) => {
            if (x.idName == indexNombreGrupo) {
                x.nombreName = editNombreGrupo
            }
            setRowsValores(auxValores)
        })
        auxRreferenciales.forEach((x: any) => {
            if (x.idGrupo == indexNombreGrupo) {
                x.grupoExamen = editNombreGrupo
            }
            setRowsReferencial(auxRreferenciales)
        })
        setAbrirGrupo(false)
    }
    const elminarFilaGrupo = (index: any) => {
        setRows(rows.filter((x: any) => x.idGrupo != index))
        setRowsValores(rowsValores.filter((x: any) => x.idName != index))
        setRowsReferencial(rowsReferencial.filter((x: any) => x.idGrupo != index))
    }
    //#region Primera Vista(Datos basicos)
    const handleChangeValoresDescripcion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValoresReferenciales(event.target.value);
    };
    const handleChangeNomGrupoValorExm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomGrupoValorExm(event.target.value);
    };
    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        setValues(newValue);
    };
    const handleChangeServicios = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServicios(event.target.value);
    };
    const handleChangeNombres = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombres(event.target.value);
    };
    const handleChangeIndicaciones = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndicacion(event.target.value);
    };
    const handleChangeNombreGrupo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomGrupo(event.target.value);
    };
    //#endregion

    //#region Segunda Vista(Valores del examen)
    const handleChangeMetodologia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMetodologia(event.target.value);
    };
    const handleChangeUnidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnidad(event.target.value);
    };
    const handleChangeValorExamen = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValorExamen(event.target.value);
    };
    //#endregion

    //#region Tercera Vista(Valores referenciales)
    const handleChangeValorReferencial = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValorReferencial(event.target.value);
    };
    //#endregion

    //#region Cuarta Vista(Datos tecnicos)
    const handleChangeTipoMuestra = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoMuestra(event.target.value);
    };
    const handleChangeVolumen = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolumen(event.target.value);
    };
    const handleChangeInsumos = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsumos(event.target.value);
    };
    const handleChangeTemperaturaConservacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemperaturaConservacion(event.target.value);
    };
    const handleChangeCondicionesAyuno = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCondicionesAyuno(event.target.value);
    };
    const handleChangeFrecuenciaCorridas = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFrecuenciaCorridas(event.target.value);
    };
    const handleChangeHoraProceso = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHoraProceso(event.target.value);
    };
    const handleChangeTiempoReporte = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTiempoReporte(event.target.value);
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
        getServicesAllApi().then((ag: any) => {
            setServiciosList(ag.data);
        });
        getMethodsAllApi().then((ag: any) => {
            setMetodologiaList(ag.data)
        })
        getUnitsAllApi().then((ag: any) => {
            if (ag.data.name != "") {
                settUnidadList(ag.data)
            }
        })
        //#endregion
    }, []);

    //#region Tabla Examenes Agregados
    interface Data {
        codigo: string;
        name: string;
        options: string;
    }

    function createData(
        codigo: string,
        name: string,
        options: string
    ): Data {
        return {
            codigo,
            name,
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
            label: 'Item',
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
            id: "editar",
            numeric: false,
            disablePadding: false,
            label: 'Editar',
            disableOrder: true
        },
        {
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Eliminar',
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
    const [rows, setRows] = React.useState<any[]>([]);

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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //#endregion

    var nombGrupo=()=>{
        Swal.fire({
            title: 'Ingrese el nombre del grupo',
            icon: 'warning',
        })
    }

    const crearGrupo = () => {
        if (nomGrupo == "") {
            nombGrupo()
            return;
        }
        let aux = rows;
        setI(i + 1)
        aux.push({
            idGrupo: i,
            name: nomGrupo
        })
        setRows(aux)
        setNomGrupo("")
    }
    //#region Valores del examen
    interface DataValores {
        codigo: string;
        name: string;
        unidad: string;
        metodologia: string;
        grupoExamenes: string;
        options: string;
    }
    function createDataValores(
        codigo: string,
        name: string,
        unidad: string,
        metodologia: string,
        grupoExamenes: string,
        options: string
    ): DataValores {
        return {
            codigo,
            name,
            unidad,
            metodologia,
            grupoExamenes,
            options
        };
    }
    function descendingComparatorValores<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    type OrderValores = 'asc' | 'desc';
    function getComparatorValores<Key extends keyof any>(
        order: OrderValores,
        orderBy: Key,
    ): (
            a: { [key in Key]: number | string },
            b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparatorValores(a, b, orderBy)
            : (a, b) => -descendingComparatorValores(a, b, orderBy);
    }
    function stableSortValores<T>(array: readonly T[], comparatorValores: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparatorValores(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    interface HeadCellValores {
        disablePadding: boolean;
        id: any;
        label: string;
        numeric: boolean;
        disableOrder: boolean;
    }
    const headCellsValores: readonly HeadCellValores[] = [
        {
            id: 'codigo',
            numeric: false,
            disablePadding: false,
            label: 'Item',
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
            id: 'unidad',
            numeric: false,
            disablePadding: false,
            label: 'Unidad',
            disableOrder: false
        },
        {
            id: 'metodologia',
            numeric: false,
            disablePadding: false,
            label: 'Metodologia',
            disableOrder: false
        },
        {
            id: 'grupoExamenes',
            numeric: false,
            disablePadding: false,
            label: 'Grupo de examenes',
            disableOrder: false
        },
        {
            id: "editar",
            numeric: false,
            disablePadding: false,
            label: 'Editar',
            disableOrder: true
        },
        {
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Eliminar',
            disableOrder: true
        }
    ];
    interface EnhancedTablePropsValores {
        numSelected: number;
        onRequestSortValores: (event: React.MouseEvent<unknown>, property: keyof DataValores) => void;
        order: OrderValores;
        orderBy: string;
        rowCount: number;
    }
    function EnhancedTableHeadValores(props: EnhancedTablePropsValores) {
        const { order, orderBy, numSelected, rowCount, onRequestSortValores } =
            props;
        const createSortHandlerValores =
            (property: keyof DataValores) => (event: React.MouseEvent<unknown>) => {
                onRequestSortValores(event, property);
            };

        return (
            <TableHead >
                <TableRow >
                    {headCellsValores.map((headCell) => (
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
                                    onClick={createSortHandlerValores(headCell.id)}
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
    const [orderValores, setOrderValores] = React.useState<Order>('asc');
    const [orderByValores, setOrderByValores] = React.useState<string>("");
    const [selectedValores, setSelectedValores] = React.useState<readonly string[]>([]);
    const [pageValores, setPageValores] = React.useState(0);
    const [rowsPerPageValores, setRowsPerPageValores] = React.useState(5);
    const [rowsValores, setRowsValores] = React.useState<any[]>([]);
    console.log(rowsValores)
    const handleRequestSortValores = (
        event: React.MouseEvent<unknown>,
        property: keyof DataValores,
    ) => {
        const isAsc = orderByValores === property && orderValores === 'asc';
        setOrderValores(isAsc ? 'desc' : 'asc');
        setOrderByValores(property);
    };
    const handleChangePageValores = (event: unknown, newPage: number) => {
        setPageValores(newPage);
    };
    const handleChangeRowsPerPageValores = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPageValores(parseInt(event.target.value, 10));
        setPageValores(0);
    };
    const emptyRowsValores =
        pageValores > 0 ? Math.max(0, (1 + pageValores) * rowsPerPageValores - rowsValores.length) : 0;

    //#endregion

    var selectGrup=()=>{
        Swal.fire({
            title: 'Ingrese el grupo',
            icon: 'warning',
        })
    }

    const crearValorExamen = () => {

        if (rows.length == 0) {
            selectGrup()
        }

        
        let aux = rowsValores;
        setIv(iV + 1)
        aux.push({
            idValoresExamen: iV,
            idName: nomGrupoValorExm,
            nombreName: rows.filter((x: any) => x.idGrupo == nomGrupoValorExm)[0].name,
            valorExam: valorExamen,
            name: valorExamen,
            idUnidad: unidad,
            UnitId: unidad,
            nombreUnidad: unidadList.filter((x: any) => x.id == unidad)[0].name,
            idMetodologia: metodologia,
            MethodId: metodologia,
            nombreMetodologia: metodologiaList.filter((x: any) => x.id == metodologia)[0].name,
            
        })
        setBloquearBoton(false)
        setRowsValores(aux)
        setNomGrupoValorExm("")
        setValorExamen("")
        setUnidad("")
        setMetodologia("")
    }
    //#region Valores referenciales
    interface DataReferencial {
        codigo: string;
        name: string;
        examValor: string;
        grupoExamenes: string;
        options: string;
    }
    function createDataReferencial(
        codigo: string,
        name: string,
        examValor: string,
        grupoExamenes: string,
        options: string
    ): DataReferencial {
        return {
            codigo,
            name,
            examValor,
            grupoExamenes,
            options
        };
    }
    function descendingComparatorReferencial<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    type OrderReferencial = 'asc' | 'desc';
    function getComparatorReferencial<Key extends keyof any>(
        order: OrderReferencial,
        orderBy: Key,
    ): (
            a: { [key in Key]: number | string },
            b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparatorReferencial(a, b, orderBy)
            : (a, b) => -descendingComparatorReferencial(a, b, orderBy);
    }
    function stableSortReferencial<T>(array: readonly T[], comparatorReferencial: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparatorReferencial(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    interface HeadCellReferencial {
        disablePadding: boolean;
        id: any;
        label: string;
        numeric: boolean;
        disableOrder: boolean;
    }
    const headCellsReferencial: readonly HeadCellReferencial[] = [
        {
            id: 'codigo',
            numeric: false,
            disablePadding: false,
            label: 'Item',
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
            id: 'examValor',
            numeric: false,
            disablePadding: false,
            label: 'Examen Valor',
            disableOrder: false
        },
        {
            id: 'grupoExamenes',
            numeric: false,
            disablePadding: false,
            label: 'Grupo de examenes',
            disableOrder: false
        },
        {
            id: "editar",
            numeric: false,
            disablePadding: false,
            label: 'Editar',
            disableOrder: true
        },
        {
            id: null,
            numeric: false,
            disablePadding: false,
            label: 'Eliminar',
            disableOrder: true
        }
    ];
    interface EnhancedTablePropsReferencial {
        numSelected: number;
        onRequestSortReferencial: (event: React.MouseEvent<unknown>, property: keyof DataReferencial) => void;
        order: OrderReferencial;
        orderBy: string;
        rowCount: number;
    }
    function EnhancedTableHeadReferencial(props: EnhancedTablePropsReferencial) {
        const { order, orderBy, numSelected, rowCount, onRequestSortReferencial } =
            props;
        const createSortHandlerReferencial =
            (property: keyof DataReferencial) => (event: React.MouseEvent<unknown>) => {
                onRequestSortReferencial(event, property);
            };

        return (
            <TableHead >
                <TableRow >
                    {headCellsReferencial.map((headCell) => (
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
                                    onClick={createSortHandlerReferencial(headCell.id)}
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
    const [orderReferencial, setOrderReferencial] = React.useState<Order>('asc');
    const [orderByReferencial, setOrderByReferencial] = React.useState<string>("");
    const [selectedReferencial, setSelectedReferencial] = React.useState<readonly string[]>([]);
    const [pageReferencial, setPageReferencial] = React.useState(0);
    const [rowsPerPageReferencial, setRowsPerPageReferencial] = React.useState(5);
    const [rowsReferencial, setRowsReferencial] = React.useState<any[]>([]);

    const handleRequestSortReferencial = (
        event: React.MouseEvent<unknown>,
        property: keyof DataReferencial,
    ) => {
        const isAsc = orderByReferencial === property && orderReferencial === 'asc';
        setOrderReferencial(isAsc ? 'desc' : 'asc');
        setOrderByReferencial(property);
    };
    const handleChangePageReferencial = (event: unknown, newPage: number) => {
        setPageReferencial(newPage);
    };
    const handleChangeRowsPerPageReferencial = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPageReferencial(parseInt(event.target.value, 10));
        setPageReferencial(0);
    };
    const emptyRowsReferencial =
        pageReferencial > 0 ? Math.max(0, (1 + pageReferencial) * rowsPerPageReferencial - rowsReferencial.length) : 0;





    var groups=()=>{
        Swal.fire({
            title: 'Ingrese grupos',
            icon: 'warning',
        })
    }

    var valExam=()=>{
        Swal.fire({
            title: 'Ingrese Valores del examen',
            icon: 'warning',
        })
    }

    //#endregion
    const crearValoresReferenciales = () => {
        if (rows.length == 0) {
            groups()
            return;
        }
        if (rowsValores.length == 0) {
            valExam()      
            return;
        }
        let aux = rowsReferencial;
        setIr(iR + 1)
        aux.push({
            idGrupo: rowsValores.find((x: any) => x.idValoresExamen == valoresReferenciales).idName,
            idValoresReferenciales: iR,
            idExamenValor: valoresReferenciales,
            nombreReferencia: valorReferencial,
            name: valorReferencial,
            valorExamen: rowsValores.filter((x: any) => x.idValoresExamen == valoresReferenciales)[0].valorExam,
            grupoExamen: rowsValores.filter((x: any) => x.idValoresExamen == valoresReferenciales)[0].nombreName
        })
        setRowsReferencial(aux)
        setValorReferencial("")
        setValorReferencial("")
    }


    const handleOpenService = () => {
        setAbrirService(true);
        setNombreService("");
        setDescripcionService("");
    }


    const handleOpenMethod = () => {
        setAbrirMethod(true);
        setNombreMethod("");
        setDescripcionMethod("");
    }

    const handleOpenUnit = () => {
        setAbrirUnit(true);
        setNombreUnit("");
        setDescripcionUnit("");
    }

    
    var CreateService=()=>{
        Swal.fire({
            title: 'Servicio - Creado exitosamente!!!',
            icon: 'success',
          })
    }

    var CreateServiceError=()=>{
        Swal.fire({
            title: 'Servicio - No fue creado!!!',
            icon: 'warning',
          })
    }

    var CreateMethod=()=>{
        Swal.fire({
            title: 'Metodologia - Creada exitosamente!!!',
            icon: 'success',
          })
    }

    var CreateMethodError=()=>{
        Swal.fire({
            title: 'Metodologia - No fue creado!!!',
            icon: 'warning',
          })
    }

    var CreateUnit=()=>{
        Swal.fire({
            title: 'Unidad - Creada exitosamente!!!',
            icon: 'success',
          })
    }

    var CreateUnitError=()=>{
        Swal.fire({
            title: 'Unidad - No fue creada!!!',
            icon: 'warning',
          })
    }

    var CrearExamen=()=>{
        Swal.fire({
            title: 'Examen - Creado exitosamente!!!',
            icon: 'success',
          })
    }

    var CrearExamenError=()=>{
        Swal.fire({
            title: 'Error - complete los campos faltantes',
            icon:'warning',
          })
    }

    var errorMethod=()=>{
        Swal.fire({
            title: 'Ingrese nombre de la metodologia',
            icon: 'warning',
            target: '#custom-target3',
        })
    }

    var errorMethodDes=()=>{
        Swal.fire({
            title: 'Ingrese descripcion de la metodologia',
            icon: 'warning',
            target: '#custom-target3',
        })
    }

    const crearMethod = () => {
        if (nombreMethod == "") {
            //alert("Ingrese nombre");
            errorMethod()
            return;
        }
        saveMethodApi({
            description: descripcionMethod,
            name: nombreMethod
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                CreateMethod()
                handleCloseMethod();
                setNombreMethod("");
                setDescripcionMethod("");
                getMethodsAllApi().then((ag: any) => {
                    setMetodologiaList(ag.data);
                });
            } else {
                //alert(x.text);
                CreateMethodError()
                return;
            }
        })
    }

    var errorUnit=()=>{
        Swal.fire({
            title: 'Ingrese nombre de la unidad',
            icon: 'warning',
            target: '#custom-target2',
        })
    }

    const crearUnit = () => {
        if (nombreUnit == "") {
            //alert("Ingrese nombre");
            errorUnit()
            return;
        }
        saveUnitApi({
            name: nombreUnit
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                CreateUnit()
                handleCloseUnit();
                setNombreUnit("");
                setDescripcionUnit("");
                getUnitsAllApi().then((ag: any) => {
                    settUnidadList(ag.data);
                });
            } else {
                //alert(x.text);
                CreateUnitError()
                return;
            }
        })
    }

    var errorService=()=>{
        Swal.fire({
            title: 'Ingrese nombre del servicio',
            icon: 'warning',
            target: '#custom-target',
        })
    }

    var errorServiceDes=()=>{
        Swal.fire({
            title: 'Ingrese la descripcion del servicio',
            icon: 'warning',
            target: '#custom-target',
        })
    }

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

    const crearServicio = () => {
        if (nombreService == "") {
            //alert("Ingrese nombre");
            errorService()
            return;
        }
        
        saveServiceApi({
            description: descripcionService,
            name: nombreService
        }).then((x: any) => {
            if (x.status) {
                //alert(x.message.text);
                CreateService()
                handleCloseService();
                setNombreService("");
                setDescripcionService("");
                getServicesAllApi().then((ag: any) => {
                    setServiciosList(ag.data);
                });
            } else {
                //alert(x.text);
                CreateServiceError()
                return;
            }
        })
    }

    var errorNameExam=()=>{
        Swal.fire({
            title: 'Ingrese nombre del examen',
            icon: 'warning',
        })
    }

    var errorServicios=()=>{
        Swal.fire({
            title: 'Ingrese un servicio',
            icon: 'warning',
        })
    }

    const registarExamen = () => {
        let examenGrupo = rows
        let examenValor = rowsValores
        let examenReferencial = rowsReferencial
        let data = [];
        for (let exG of examenGrupo) {
            exG.examinationValues = examenValor.filter((x: any) => x.idName == exG.idGrupo)
            exG.countEV = exG.examinationValues.length
            for (let ev = 0; ev < exG.examinationValues.length; ev++) {
                exG.examinationValues[ev].examinationReferenceValues = examenReferencial.filter((y: any) => y.idExamenValor == exG.examinationValues[ev].idValoresExamen);
                exG.examinationValues[ev].countVR = exG.examinationValues[ev].examinationReferenceValues.length
            }
            data.push(exG)
        }
      

        let registro = {
            ServiceId: servicios,
            countEG: rows.length,
            examinationGroups: data,
            fastingConditions: condicionesAyuno,
            indications: indicacion,
            name: nombres.toUpperCase(),
            processTime: horaProceso,
            reportTime: tiempoReporte,
            runFrequency: frecuenciaCorridas,
            storageTemperature: temperaturaConservacion,
            supplies: insumos,
            typeSample: tipoMuestra,
            volume: volumen
        }
        saveExaminationApi(registro).then((x: any) => {
            if (x.status) {
                CrearExamen()
                sleep(1000)
                window.location.href = '/apps/examinations'
            } else if(nombres ==""){
                errorNameExam()
            } else if(servicios ==""){
                errorServicios()
            }
        })
    }
    return (
        <div className='tabla-componente card-table'>
            <Contenido >
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container  >
                        <Link to={"/apps/examinations"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Exámenes</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Nuevo exámen</InputLabel >
                        </Grid>
                        <Grid item xs>
                            <Button onClick={registarExamen} disabled={bloqueaboton} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                    <Grid container style={{ alignItems: "center" }} mt={0.3}>
                        <Grid item >
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >Detalle del exámen</InputLabel >
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                        <div>
                            <TabContext value={values}>
                                <Box>
                                    <Tabs value={values} indicatorColor="primary" textColor="primary" onChange={handleChange} centered>
                                        <Tab className="h-64 normal-case" label="Datos básicos" value="1" />
                                        <Tab className="h-64 normal-case" label="valores del examen" value="2" />
                                        <Tab className="h-64 normal-case" label="Valores Referenciales" value="3" />
                                        <Tab className="h-64 normal-case" label="Datos Técnicos" value="4" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="1"
                                    style={{ overflowY: "scroll", maxHeight: "500px" }} >
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField fullWidth id="outlined-basic" label="Nombre *" variant="outlined"
                                                    value={nombres} onChange={handleChangeNombres} />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <TextField id="outlined-basic" label="Servicio *" variant="outlined"
                                                    select fullWidth value={servicios} onChange={handleChangeServicios}
                                                >
                                                
                                                <MenuItem value="">
                                                        <Button onClick={handleOpenService} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                </MenuItem>


                                                    {serviciosList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid item md={12}>
                                                <TextField id="outlined-basic" label="Indicaciones" variant="outlined"
                                                    multiline fullWidth rows={4} value={indicacion} onChange={handleChangeIndicaciones} />
                                            </Grid>
                                        </Grid>
                                        <Grid container mt={1}>
                                            <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Paper sx={{ width: '100%', borderRadius: "12px", overflow: 'hidden' }}>
                                                        <Grid container item xs={12}>
                                                            <Grid container spacing={2} mt={1}>
                                                                <Grid item xs={0.5}>
                                                                </Grid>
                                                                <Grid item xs={8}>
                                                                    <TextField fullWidth id="outlined-basic" label="Nombre del grupo *" variant="outlined" value={nomGrupo} onChange={handleChangeNombreGrupo} />
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Button onClick={crearGrupo} fullWidth variant="contained" style={{ height: '5.1ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Agregar</Button>
                                                                </Grid>
                                                                <Grid item xs={0.5}>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2} mt={0.5}>
                                                                <Grid container item xs={12}>
                                                                    <TableContainer  >
                                                                        <Table stickyHeader
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
                                                                                                key={index}
                                                                                            >
                                                                                                <TableCell
                                                                                                    component="th"
                                                                                                    id={labelId}
                                                                                                    scope="row"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {index + 1}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.name}
                                                                                                </TableCell>
                                                                                                <TableCell align="left">
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <div style={{ paddingRight: "5px" }}>
                                                                                                            <Button onClick={() => handleOpenGrupo(row.idGrupo, row.name)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> EDITAR</Button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                                <TableCell align="left">
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <div style={{ paddingLeft: "5px" }}>
                                                                                                            <Button onClick={() => elminarFilaGrupo(row.idGrupo)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>ELIMINA</Button>
                                                                                                        </div>
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
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Box>
                                            </CardContent>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="2" style={{ overflowY: "scroll", maxHeight: "500px" }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container mt={1} spacing={2}>
                                            <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Paper sx={{ width: '100%', borderRadius: "12px" }}>
                                                        <Grid container item xs={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={2} >
                                                                    <TextField id="outlined-basic" label="Seleccione un grupo" variant="outlined"
                                                                        select fullWidth value={nomGrupoValorExm} onChange={handleChangeNomGrupoValorExm}
                                                                    >
                                                                        {rows.map((row: any, index: any) => {
                                                                            return (
                                                                                <MenuItem key={index} value={row.idGrupo}>{row.name}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item xs={3.5} >
                                                                    <TextField id="outlined-basic" label="Valor de examen" variant="outlined"
                                                                        fullWidth value={valorExamen} onChange={handleChangeValorExamen} />
                                                                </Grid>
                                                                <Grid item xs={1.5} >
                                                                    <TextField id="outlined-basic" label="Unidad" variant="outlined"
                                                                        select fullWidth value={unidad} onChange={handleChangeUnidad}
                                                                    >

                                                                        <MenuItem value="">
                                                                          <Button onClick={handleOpenUnit} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                                        </MenuItem>

                                                                        {unidadList.map((row: any, index: any) => {
                                                                            return (
                                                                                <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item xs={3} >
                                                                    <TextField id="outlined-basic" label="Metodologia" variant="outlined"
                                                                        select fullWidth value={metodologia} onChange={handleChangeMetodologia}
                                                                    >

                                                                        <MenuItem value="">
                                                                          <Button onClick={handleOpenMethod} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                                        </MenuItem>
                                                                        {metodologiaList.map((row: any, index: any) => {
                                                                            return (
                                                                                <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item xs={2} >
                                                                    <Button onClick={crearValorExamen} fullWidth variant="contained" style={{ height: '5.1ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Agregar</Button>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2} mt={0.5}>
                                                                <Grid container item xs={12}>
                                                                    <TableContainer>
                                                                        <Table
                                                                            sx={{ minWidth: 750 }}
                                                                            aria-labelledby="tableTitle"
                                                                            size={'medium'}
                                                                        >
                                                                            <EnhancedTableHeadValores
                                                                                numSelected={selectedValores.length}
                                                                                order={orderValores}
                                                                                orderBy={orderByValores}
                                                                                onRequestSortValores={handleRequestSortValores}
                                                                                rowCount={rowsValores.length}
                                                                            />
                                                                            <TableBody>
                                                                                {stableSortValores(rowsValores, getComparatorValores(orderValores, orderByValores))
                                                                                    .slice(pageValores * rowsPerPageValores, pageValores * rowsPerPageValores + rowsPerPageValores)
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
                                                                                                    {row.idValoresExamen}
                                                                                                </TableCell>

                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.valorExam}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.nombreUnidad}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.nombreMetodologia}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.nombreName}
                                                                                                </TableCell>
                                                                                                <TableCell align="left">
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <div style={{ paddingRight: "5px" }}>
                                                                                                            <Button onClick={() => handleOpenValores(row.idValoresExamen, row.valorExam, row.idUnidad, row.idMetodologia)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> EDITAR</Button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                                <TableCell align="left">
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <div style={{ paddingLeft: "5px" }}>
                                                                                                            <Button onClick={() => eliminarFilaValores(row.idValoresExamen)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>ELIMINA</Button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        );
                                                                                    })}
                                                                                {emptyRowsValores > 0 && (
                                                                                    <TableRow
                                                                                        style={{
                                                                                            height: (53) * emptyRowsValores,
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
                                                                        count={rowsValores.length}
                                                                        rowsPerPage={rowsPerPageValores}
                                                                        page={pageValores}
                                                                        labelRowsPerPage={"Filas por Pagina: "}
                                                                        labelDisplayedRows={
                                                                            ({ from, to, count }) => {
                                                                                return '' + from + '-' + to + ' de ' + count
                                                                            }
                                                                        }
                                                                        onPageChange={handleChangePageValores}
                                                                        onRowsPerPageChange={handleChangeRowsPerPageValores}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Box>
                                            </CardContent>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="3" style={{ overflowY: "scroll", maxHeight: "500px" }} >
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container item>
                                            <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Paper sx={{ width: '100%', borderRadius: "12px" }}>
                                                        <Grid container item xs={12}>
                                                            <Grid container spacing={2} mt={1}>
                                                                <Grid item xs={4} >
                                                                    <TextField id="outlined-basic" label="Valor de Examen *" variant="outlined"
                                                                        select fullWidth value={valoresReferenciales} onChange={handleChangeValoresDescripcion}
                                                                    >
                                                                        {rowsValores.map((row: any, index: any) => {
                                                                            return (
                                                                                <MenuItem key={index} value={row.idValoresExamen}>{row.valorExam + " - " + row.nombreName}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item xs={5} >
                                                                    <TextField id="outlined-basic" label="Valor de referencia *" variant="outlined"
                                                                        fullWidth value={valorReferencial} onChange={handleChangeValorReferencial} />
                                                                </Grid>
                                                                <Grid item xs={3} >
                                                                    <Button onClick={crearValoresReferenciales} fullWidth variant="contained" style={{ height: '5.1ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Agregar</Button>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2} mt={0.5}>
                                                                <Grid container item xs={12}>
                                                                    <TableContainer>
                                                                        <Table
                                                                            sx={{ minWidth: 750 }}
                                                                            aria-labelledby="tableTitle"
                                                                            size={'medium'}
                                                                        >
                                                                            <EnhancedTableHeadReferencial
                                                                                numSelected={selectedReferencial.length}
                                                                                order={orderReferencial}
                                                                                orderBy={orderByReferencial}
                                                                                onRequestSortReferencial={handleRequestSortReferencial}
                                                                                rowCount={rowsReferencial.length}
                                                                            />
                                                                            <TableBody>
                                                                                {stableSortReferencial(rowsReferencial, getComparatorReferencial(orderReferencial, orderByReferencial))
                                                                                    .slice(pageReferencial * rowsPerPageReferencial, pageReferencial * rowsPerPageReferencial + rowsPerPageReferencial)
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
                                                                                                    {index + 1}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    component="th"
                                                                                                    id={labelId}
                                                                                                    scope="row"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.nombreReferencia}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.valorExamen}
                                                                                                </TableCell>
                                                                                                <TableCell
                                                                                                    align="left"
                                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                                >
                                                                                                    {row.grupoExamen}
                                                                                                </TableCell>
                                                                                                <TableCell align="left">
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <div style={{ paddingRight: "5px" }}>
                                                                                                            <Button onClick={()  => handleOpenReferencias(row.idValoresReferenciales,row.nombreReferencia)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}> EDITAR</Button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                                <TableCell align="left">
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <div style={{ paddingLeft: "5px" }}>
                                                                                                            <Button onClick={() => eliminarFilaReferencial(row.idValoresReferenciales)} variant="contained" style={{ color: "white", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>ELIMINA</Button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        );
                                                                                    })}
                                                                                {emptyRowsReferencial > 0 && (
                                                                                    <TableRow
                                                                                        style={{
                                                                                            height: (53) * emptyRowsReferencial,
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
                                                                        count={rowsReferencial.length}
                                                                        rowsPerPage={rowsPerPageReferencial}
                                                                        page={pageReferencial}
                                                                        labelRowsPerPage={"Filas por Pagina: "}
                                                                        labelDisplayedRows={
                                                                            ({ from, to, count }) => {
                                                                                return '' + from + '-' + to + ' de ' + count
                                                                            }
                                                                        }
                                                                        onPageChange={handleChangePageReferencial}
                                                                        onRowsPerPageChange={handleChangeRowsPerPageReferencial}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Box>
                                            </CardContent>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="4">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container spacing={2} >
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Tipo(s) de muestra" variant="outlined" value={tipoMuestra} onChange={handleChangeTipoMuestra} />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Volumen" variant="outlined" value={volumen} onChange={handleChangeVolumen} />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5} >
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Insumos" variant="outlined" value={insumos} onChange={handleChangeInsumos} />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Temperatura de conservación" variant="outlined" value={temperaturaConservacion} onChange={handleChangeTemperaturaConservacion} />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Condiciones de ayuno" variant="outlined" value={condicionesAyuno} onChange={handleChangeCondicionesAyuno} />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Frecuencias de corridas" variant="outlined" value={frecuenciaCorridas} onChange={handleChangeFrecuenciaCorridas} />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5} >
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Hora de proceso" variant="outlined" value={horaProceso} onChange={handleChangeHoraProceso} />
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <TextField fullWidth id="outlined-basic" label="Tiempo de reporte" variant="outlined" value={tiempoReporte} onChange={handleChangeTiempoReporte} />
                                                </Grid>
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
                        open={abrirGrupo}
                        onClose={handleCloseGrupo}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Editar valor del Nombre de Grupo</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={editNombreGrupo} onChange={handleChangeEditNombreGrupo} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={6} ></Grid>
                                <Grid container item xs={6} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseGrupo} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={editarGrupo} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Editar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal id="tarjeta"
                        keepMounted
                        open={abrirValores}
                        onClose={handleCloseValores}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Editar campos del examen</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={editNombreValores} onChange={handleChangeEditNombreValores} />
                            </Grid>
                            <br></br>
                            <Grid container item xs mt={2.5}>
                              <TextField id="outlined-basic" label="Unidad" variant="outlined"
                                select fullWidth value={editUnit} onChange={handleChangeEditUniti}
                              >
                                {unidadList.map((row: any, index: any) => {
                                    return (
                                      <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                    )
                                })}
                              </TextField>
                            </Grid>
                            <br></br>
                            <Grid container item xs mt={2.5}>
                                <TextField id="outlined-basic" label="Metodologia" variant="outlined"
                                  select fullWidth value={editmethod} onChange={handleChangeEditMethod}
                                >
                                  {metodologiaList.map((row: any, index: any) => {
                                  return (
                                    <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                  )
                                  })}
                                </TextField>
                            </Grid>
                            <Grid container item xs mt={2.5}>
                              <Grid item xs={6} ></Grid>
                              <Grid container item xs={6} spacing={2}>
                                 <Grid item xs={6} >
                                     <Button onClick={handleCloseValores} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                 </Grid>
                                 <Grid item xs={6} >
                                     <Button onClick={editarcampos} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Editar</Button>
                                 </Grid>
                              </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal
                        keepMounted
                        open={abrirReferencias}
                        onClose={handleCloseReferencias}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Editar valores de referencia</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={editNombreReferencias} onChange={handleChangeEditNombreReferencias} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={6} ></Grid>
                                <Grid container item xs={6} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseReferencias} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={editarReferencia} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Editar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal id="custom-target"
                        keepMounted
                        open={abrirService}
                        onClose={handleCloseService}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nuevo Servicio</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreService} onChange={handleChangeNombreService} />
                            </Grid>
                            <Grid container item xs mt={1.5}>
                                <TextField fullWidth id="outlined-basic" label="Descripción" variant="outlined" value={descripcionService} onChange={handleChangeDescripcionService} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseService} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearServicio} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal id="custom-target3"
                        keepMounted
                        open={abrirMethod}
                        onClose={handleCloseMethod}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nueva Metodologia</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreMethod} onChange={handleChangeNombreMethod} />
                            </Grid>
                            <Grid container item xs mt={1.5}>
                                <TextField fullWidth id="outlined-basic" label="Descripción" variant="outlined" value={descripcionMethod} onChange={handleChangeDescripcionMethod} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseMethod} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearMethod} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal id="custom-target2"
                        keepMounted
                        open={abrirUnit}
                        onClose={handleCloseUnit}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nueva Unidad</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreUnit} onChange={handleChangeNombreUnit} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseUnit} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearUnit} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
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


