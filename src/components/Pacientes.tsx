import { Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, MenuItem, Paper, TextField, Tooltip } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import MasksIcon from '@mui/icons-material/Masks';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbPacientes from "./tablas/tbPacientes";
class Pacientes extends React.Component<{ navigate: NavigateFunction }, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            buscarTexto: "",
            buscarTextoClone: "",
            buscarSeleccionar: "fullname",
            buscarSeleccionarClone: "",
        }
    }
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    }
    buscarPacienteEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarTextoClone: this.state.buscarTexto,
                buscarSeleccionarClone: this.state.buscarSeleccionar
            });
        }
    }
    buscarPaciente = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto,
            buscarSeleccionarClone: this.state.buscarSeleccionar
        });
    }
    crearPaciente = () => {
        this.props.navigate('/apps/patients/new');
    }
    render() {
        return (
            <Paper sx={{ width: '100%', mb: 18 }}>
            <div className='tabla-componente card-table'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <MasksIcon style={{ color: "white", fontSize: "50px" }}></MasksIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.5rem" }} >Pacientes</InputLabel>
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
                                        <MenuItem value={"fullname"}>Nombre</MenuItem>
                                        <MenuItem value={"dni"}>N° Documento</MenuItem>
                                    </TextField>
                                </div>
                                <div className="textfield-buscar-combo">
                                    <TextField fullWidth id="outlined-basic" variant="outlined"
                                        placeholder="Ingrese contenido de busqueda"
                                        value={this.state.buscarTexto}
                                        onChange={this.handleChange('buscarTexto')}
                                        onKeyPress={this.buscarPacienteEnter}
                                        onClick={this.buscarPaciente}
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
                                                    <SearchSharpIcon type="submit" onClick={this.buscarPaciente} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>

                        </Grid>
                        <Grid container item>
                            <Tooltip title="Nuevo Paciente" followCursor>
                                <Button onClick={this.crearPaciente} variant="contained" className="boton">Nuevo Paciente</Button>
                            </Tooltip>
                        </Grid>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <TbPacientes texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
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
export default withNavigation(Pacientes)