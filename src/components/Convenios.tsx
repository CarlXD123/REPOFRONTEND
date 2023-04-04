import { Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, ListItem, Paper, TextField, Tooltip } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import TbConvenios from "./tablas/tbConvenios";
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';



class Convenios extends React.Component<{ navigate: NavigateFunction }, any>{

    constructor(props: any) {
        super(props);
        //this.theme = useTheme();
        this.state = {
            buscar: "",
            buscarClone: ""

        };
    };
    buscarConvenio = () => {
        this.setState({
            buscarClone: this.state.buscar
        });
    };
    buscarConvenioEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarClone: this.state.buscar
            });
        }
    };
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    };

    crearConvenio = () => {
        this.props.navigate('/apps/agreements/new');
    }
    render() {
        return (

            <div className='tabla-componente card-table'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item >
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <HandshakeRoundedIcon style={{ color: "white", fontSize: "38px" }}></HandshakeRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.5rem" }} >Convenios</InputLabel>
                            </div>
                        </Grid>
                        <Grid container item className="textfield-buscar">
                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                placeholder="Buscar por nombre"
                                value={this.state.buscar} 
                                onChange={this.handleChange('buscar')}
                                onKeyPress={this.buscarConvenioEnter}
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
                                            <SearchSharpIcon type="submit" onClick={this.buscarConvenio} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid container item>
                            <Tooltip title="Agregar Convenio" followCursor>
                                <Button onClick={this.crearConvenio} variant="contained" className="boton" >Agregar Convenio</Button>
                            </Tooltip>
                        </Grid>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <TbConvenios busqueda={this.state.buscarClone} />
                    </div>
                </Contenido>
            </div>
        )
    }

}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Convenios);