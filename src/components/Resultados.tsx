import { Button, CardContent, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, ListItem, MenuItem, Paper, Tab, Tabs, TextField, Tooltip } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbResultadosPorAtender from "./tablas/tbResultadosPorAtender";
import TbResultadosAtendidas from "./tablas/tbResultadosAtendidas";

class Resultados extends React.Component<{ navigate: NavigateFunction }, any>{

    constructor(props: any) {
        super(props);
        //this.theme = useTheme();
        this.state = {
            tabValue: 0,
            buscarTexto: "",
            buscarTextoClone: "",
            buscarSeleccionar: "codeResultPorAtend",
            buscarSeleccionarClone: "",
        };
    }
    handleChangeTab = (event: any, tabValue: any) => {
        this.setState({ tabValue });
    };
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    };
    buscarResutadosEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarTextoClone: this.state.buscarTexto,
                buscarSeleccionarClone: this.state.buscarSeleccionar
            });
        }
    };
    buscarResutados = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto,
            buscarSeleccionarClone: this.state.buscarSeleccionar
        });
    };

    actualizar = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto
        });
    }

    render() {
        return (
            <Paper sx={{ width: '100%', mb: 18 }}>
            <div className='tabla-componente card-table'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <HandshakeRoundedIcon style={{ color: "white", fontSize: "38px" }}></HandshakeRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.5rem" }} >Resultados</InputLabel>
                            </div>
                        </Grid>
                        <Grid container item>
                            <div style={{ display: "flex" }} className="nav-tabla-comboText">
                                <div className="textfield-combo">
                                    <TextField id="select-currency-native" select
                                        value={this.state.buscarSeleccionar}
                                        onChange={this.handleChange('buscarSeleccionar')}
                                        variant={"outlined"}
                                        InputProps={{
                                            style: {
                                                backgroundColor: "white",
                                                color: "black",
                                                cursor: "pointer",
                                                borderStyle: "revert",
                                                borderColor: "#039be5",
                                                borderWidth: "0.1px",
                                                maxWidth: "320px"
                                            }
                                        }}
                                    >
                                        <MenuItem value={"codeResultPorAtend"}>Codigo</MenuItem>
                                        <MenuItem value={"dniResultAtend"}>N° Documento</MenuItem>
                                        <MenuItem value={"nombre2"}>Paciente</MenuItem>
                                        <MenuItem value={"referente2"}>Referencia</MenuItem>
                                        <MenuItem value={"dateResultAtend"}>Rango Fecha</MenuItem>
                                    </TextField>
                                </div>
                                <div className="textfield-buscar-combo">
                                    <TextField fullWidth id="outlined-basic" variant="outlined"
                                        placeholder="Ingrese contendio de busqueda"
                                        value={this.state.buscarTexto}
                                        onChange={this.handleChange('buscarTexto')}
                                        onKeyPress={this.buscarResutadosEnter}
                                        onClick={this.buscarResutados}
                                        InputProps={{
                                            style: {
                                                backgroundColor: "white",
                                                color: "black",
                                                cursor: "pointer",
                                                borderStyle: "revert",
                                                borderColor: "#039be5",
                                                borderWidth: "0.1px",
                                                maxWidth: "520px"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <SearchSharpIcon type="submit" onClick={this.buscarResutados} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>




                        </Grid>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                    <br></br>
                    <br></br>
                    <br></br>
                        <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }} className="card-table-resultados">

                            <Tabs value={this.state.tabValue} onChange={this.handleChangeTab}
                                indicatorColor="primary" textColor="primary" centered variant="fullWidth"
                                classes={{ root: "w-full h-64" }} style={{ backgroundColor: "white" }}
                            >
                                <Tab className="h-64 normal-case" label="POR ATENDER" style={{ fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.2rem" }} />
                                <Tab className="h-64 normal-case" label="ATENDIDAS" style={{ fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.2rem" }} />

                            </Tabs>
                            <div style={{ display: this.state.tabValue == 0 ? "block" : "none" }}>
                                <TbResultadosPorAtender texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
                            </div>
                            <div style={{ display: this.state.tabValue == 1 ? "block" : "none" }}>
                                <TbResultadosAtendidas texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
                            </div>
                        </CardContent>
                    </div>
                </Contenido>
            </div>
        </Paper>
        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Resultados);
