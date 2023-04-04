import { Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, MenuItem, Paper, TextField } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbExamenes from "./tablas/tbExamenes";


class Examenes extends React.Component<{ navigate: NavigateFunction }, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            buscar: "",
            buscarClone: ""
        };
    };
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    };
    buscarExamen = () => {
        this.setState({
            buscarClone: this.state.buscar
        });
    };
    buscarExamenEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarClone: this.state.buscar
            });
        }
    };
    crearExamen = () => {
        this.props.navigate('/apps/examinations/new')
    }
    render() {
        return (
            <div className='tabla-componente card-table'>
                <Contenido>
                    <div style={{display:"flex"}} className="nav-tabla">
                        <Grid container item >
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <ListAltIcon style={{ color: "white", fontSize: "45px" }}></ListAltIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Exámenes</InputLabel >
                            </div>
                        </Grid>
                        <Grid container item  className="textfield-buscar">
                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                placeholder="Buscar por nombre"
                                value={this.state.buscar}
                                onChange={this.handleChange('buscar')}
                                onKeyPress={this.buscarExamenEnter}
                                onClick={this.buscarExamen}
                                InputProps={{
                                    style: {
                                        backgroundColor: "white",
                                        color: "black",
                                        cursor: "pointer",
                                        borderStyle: "revert",
                                        borderColor: "#039be5",
                                        borderWidth: "0.1px",
                                        minWidth: "150px",
                                        maxWidth: "520px"
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end" >
                                            <SearchSharpIcon type="submit" onClick={this.buscarExamen} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid container item  >
                            <Button onClick={this.crearExamen} variant="contained" className="boton">Agregar exámen</Button>
                        </Grid>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <TbExamenes busquedaex={this.state.buscarClone} />
                    </div>
                </Contenido>
            </div>
        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}
export default withNavigation(Examenes);