import { Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, MenuItem, Paper, TextField, Tooltip } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import PersonIcon from '@mui/icons-material/Person';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbPersonal from "./tablas/tbPersonal";


class Personal extends React.Component<{ navigate: NavigateFunction }, any>{

    constructor(props: any) {
        super(props);
        //this.theme = useTheme();
        this.state = {
            buscarTexto: "",
            buscarTextoClone: "",
            buscarSeleccionar: "fullname",
            buscarSeleccionarClone: "",

        };
    }
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    }
    crearPersonal = () => {
        this.props.navigate('/apps/employees/new');
    }
    buscarPersonalEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarTextoClone: this.state.buscarTexto,
                buscarSeleccionarClone: this.state.buscarSeleccionar
            });
        }
    }
    buscarPersonal = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto,
            buscarSeleccionarClone: this.state.buscarSeleccionar
        });
    }

    render() {
        return (
            <div className='tabla-componente card-table'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <PersonIcon style={{ color: "white", fontSize: "45px" }}></PersonIcon>
                                <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400" }} className="text-responsive-combo" >Personal de laboratorio</div >
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
                                        placeholder="Ingrese contendio de busqueda"
                                        value={this.state.buscarTexto}
                                        onChange={this.handleChange('buscarTexto')}
                                        onKeyPress={this.buscarPersonalEnter}
                                        onClick={this.buscarPersonal}
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
                                                    <SearchSharpIcon type="submit" onClick={this.buscarPersonal} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid container item>
                            <Tooltip title="Agregar Personal" followCursor>
                                <Button onClick={this.crearPersonal} variant="contained" className="boton">Nuevo Personal</Button>
                            </Tooltip>
                        </Grid>

                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <TbPersonal  texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
                    </div>

                </Contenido>
            </div>
        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}
export default withNavigation(Personal);