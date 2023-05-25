import { Button, Grid, InputAdornment, InputLabel, MenuItem, TextField } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import TbReporte from "./reporte/filtrar/tbReporte";

class Reporte extends React.Component<{ navigate: NavigateFunction }, any>{
    render() {
        return (
            <div className='tabla-componente' style={{ maxHeight: "480px", overflowY: "scroll" }}>
            <Contenido>
                <Grid container sx={{ width: '100%', minWidth: "400px"}}>
                    <Grid container item xs={12} spacing={2} style={{ alignItems: "center" }}>
                        <Grid item xs={8}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.8rem" }} >Reportes</InputLabel >
                            </div>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <TbReporte />
                </div>
        
            </Contenido>
        </div>
        
        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Reporte);
