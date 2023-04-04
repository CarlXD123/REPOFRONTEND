import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CardContent, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { changeApiPassword } from "../../api";
import { Contenido } from "../Home";

export class CambiarContraseña extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            id: "",
            showPassword: false,
            newShowPassword: false,
            confirmNewSowPassword: false,
            password: "",
            newpassword: "",
            confirmpassword: ""
        };
    }
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    handleClickShowNewPassword = () => {
        this.setState({
            newShowPassword: !this.state.newShowPassword
        });
    }
    handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    handleClickShowConfirmNewPassword = () => {
        this.setState({
            confirmNewSowPassword: !this.state.confirmNewSowPassword
        });
    }
    handleMouseDownConfirmNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    componentDidMount() {
        const dato = localStorage.getItem('dataUser')
        if (dato != null) {
            const info = JSON.parse(dato);
            this.setState({
                id: info.user.id
            })
        }
    }
    cambiarContrasena = () => {
        let data = {
            currentPassword: this.state.password,
            newPassword: this.state.newpassword,
            newPasswordConfirm: this.state.confirmpassword
        }
        changeApiPassword(this.state.id, data).then((x: any) => {
            if(x.status){
                alert(x.message.text);
                this.setState({
                    password: "",
                    newpassword: "",
                    confirmpassword: ""
                });
            }else{
                alert(x.message.text);
            }
        })
    }
    render() {
        return (

            <div className='tabla-componente'>
                <Contenido>
                    <Grid item xs>
                        <Button onClick={this.cambiarContrasena} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                    </Grid>
                    <br></br>
                    <div>
                        <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="outlined-basic" label="Contraseña actual" variant="outlined"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handleChange('password')}
                                            InputProps={{
                                                style: {
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    borderStyle: "revert",
                                                    borderColor: "#039be5",
                                                    borderWidth: "0.1px"
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end" >
                                                        <IconButton
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={0.5}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="outlined-basic" label="Nueva contraseña" variant="outlined"
                                            type={this.state.newShowPassword ? 'text' : 'password'}
                                            value={this.state.newpassword}
                                            onChange={this.handleChange('newpassword')}
                                            InputProps={{
                                                style: {
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    borderStyle: "revert",
                                                    borderColor: "#039be5",
                                                    borderWidth: "0.1px"
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end" >
                                                        <IconButton
                                                            onClick={this.handleClickShowNewPassword}
                                                            onMouseDown={this.handleMouseDownNewPassword}
                                                        >
                                                            {this.state.newShowPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={0.5}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth id="outlined-basic" label="Confirmar contraseña" variant="outlined"
                                            type={this.state.confirmNewSowPassword ? 'text' : 'password'}
                                            value={this.state.confirmpassword}
                                            onChange={this.handleChange('confirmpassword')}
                                            InputProps={{
                                                style: {
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    borderStyle: "revert",
                                                    borderColor: "#039be5",
                                                    borderWidth: "0.1px"
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end" >
                                                        <IconButton
                                                            onClick={this.handleClickShowConfirmNewPassword}
                                                            onMouseDown={this.handleMouseDownConfirmNewPassword}
                                                        >
                                                            {this.state.confirmNewSowPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </div >
                </Contenido>
            </div>
        )
    }
}


