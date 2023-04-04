import { Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, MenuItem, Paper, TextField, Tooltip } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import PersonIcon from '@mui/icons-material/Person';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbCitas from "./tablas/tbCitas";

class Citas extends React.Component<{ navigate: NavigateFunction }, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            buscarTexto: "",
            buscarTextoClone: "",
            buscarSeleccionar: "name2",
            buscarSeleccionarClone: "",
        }
    }

    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    }
    buscarCitasEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarTextoClone: this.state.buscarTexto,
                buscarSeleccionarClone: this.state.buscarSeleccionar
            });
        }
    }

    buscarCitas = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto,
            buscarSeleccionarClone: this.state.buscarSeleccionar
        });
    }

    actualizar = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto
        });
    }

    crearCita = () => {
        this.props.navigate('/apps/appointments/new');
    }
    render() {
        return (
            <Paper sx={{ width: '100%'}}>
            <div className='tabla-componente card-table'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <PersonIcon style={{ color: "white", fontSize: "45px" }}></PersonIcon>
                                <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400" }} className="text-responsive-combo" >Citas de laboratorio</div >
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
                                        <MenuItem value={"name2"}>Nombre</MenuItem>
                                        <MenuItem value={"dni2"}>N° Documento</MenuItem>
                                        <MenuItem value={"referencia"}>Referencia</MenuItem>
                                        <MenuItem value={"code"}>Codigo</MenuItem>
                                        <MenuItem value={"date"}>Fecha</MenuItem>
                                    </TextField>
                                </div>
                                <div className="textfield-buscar-combo">
                                    <TextField fullWidth id="outlined-basic" variant="outlined"
                                        placeholder="Ingrese contenido de busqueda"
                                        value={this.state.buscarTexto}
                                        onChange={this.handleChange('buscarTexto')}
                                        onKeyPress={this.buscarCitasEnter}
                                        onClick={this.buscarCitas}
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
                                                    <SearchSharpIcon type="submit" onClick={this.buscarCitas} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>


                        </Grid>
                        <Grid container item>
                            <Tooltip title="Asignar cita" followCursor>
                                <Button onClick={this.crearCita} variant="contained" className="boton">Asignar cita</Button>
                            </Tooltip>
                        </Grid>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <TbCitas texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
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

export default withNavigation(Citas);
