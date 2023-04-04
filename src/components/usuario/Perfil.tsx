import { Button, CardContent, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { editEmployeeApi } from "../../api";
import { getNavigation } from "../../store/actions/navegacion/navegacion.actions";
import { Contenido } from "../Home";
import Paper from '@mui/material/Paper';
import { InfoRounded } from "@mui/icons-material";
import Swal from 'sweetalert2';

export class TbMiPerfil extends React.Component<{ onLoadData: any}, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            id: "",
            nombre: "",
            apellidoP: "",
            apellidoM: "",
            celular: "",
            telefono: "",
            direccion: "",
            correo: ""
        }
    }
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    };
    
    componentDidMount() {
        const dato = localStorage.getItem('dataUser')
        console.log(dato)
        if (dato != null) {
            const info = JSON.parse(dato);
            this.setState({
                id: info.user.id,
                nombre: info.person.name,
                apellidoP: info.person.lastNameP,
                apellidoM: info.person.lastNameM,
                celular: info.person.phoneNumber,
                telefono: info.person.tlfNumber == null ? "" : info.person.tlfNumber,
                direccion: info.person.address,
                dni: info.person.dni,
                correo: info.user.email,
                iduser: info.user.id
            })
        }
    }

    guardarPerfil = () => {
        const datosUpdate=()=>{
            Swal.fire({
                title: 'Datos actualizados correctamente',
                icon: 'success',
              })
        }
        let data = {
            address: this.state.direccion,
            displayName: this.state.nombre + " " + this.state.apellidoP,
            lastNameM: this.state.apellidoM,
            lastNameP: this.state.apellidoP,
            name: this.state.nombre,
            phoneNumber: this.state.celular,
            tlfNumber: this.state.telefono,
            dni: this.state.dni,
            username: this.state.correo,
            iduser: this.state.iduser
        }
        editEmployeeApi(data, this.state.id).then((x: any) => {
            if (x.status) {
                //alert(x.message.text)
                datosUpdate()
                const dato = localStorage.getItem('dataUser')??"{}"
                let info = JSON.parse(dato);
                info.person.address= data.address
                info.person.name= data.name
                info.person.lastNameP= data.lastNameP
                info.person.lastNameM= data.lastNameM
                info.person.phoneNumber= data.phoneNumber
                info.person.tlfNumber= data.tlfNumber
                info.person.displayName= data.displayName
                info.user.username= data.username
                info.person.dni= data.dni
                info.user.email= data.username
                info.user.id= data.iduser

                localStorage.setItem('dataUser',JSON.stringify(info))
                this.props.onLoadData()
            } else {
                alert(x.message.text);
                return;
            }
        })
    }


    render() {
        return (
            <div className='tabla-componente card-table' >
             <Paper sx={{ mb: 60 }}>
                <Contenido>
                    <Grid item xs>
                        <Button onClick={this.guardarPerfil} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                    </Grid>
                    <br></br>
                    <div>
                        <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={this.state.nombre} onChange={this.handleChange("nombre")} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={0.5}>
                                    <Grid item md={6} >
                                        <TextField fullWidth id="outlined-basic" label="Apellido paterno" variant="outlined" value={this.state.apellidoP} onChange={this.handleChange("apellidoP")} />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField fullWidth id="outlined-basic" label="Apellido materno" variant="outlined" value={this.state.apellidoM} onChange={this.handleChange("apellidoM")} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={0.5}>
                                    <Grid item md={6}>
                                        <TextField fullWidth id="outlined-basic" label="Celular" variant="outlined" value={this.state.celular} onChange={this.handleChange("celular")} />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField fullWidth id="outlined-basic" label="Teléfono" variant="outlined" value={this.state.telefono} onChange={this.handleChange("telefono")} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={0.5}>
                                    <Grid item md={12}>
                                        <TextField id="outlined-basic" label="Dirección" variant="outlined"
                                            multiline fullWidth rows={4} value={this.state.direccion} onChange={this.handleChange("direccion")} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={0.5}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="outlined-basic" label="Correo" variant="outlined" value={this.state.correo} onChange={this.handleChange("correo")} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </div >
                </Contenido>
            </Paper>
            </div>
        )
    }
}


