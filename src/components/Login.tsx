import React from 'react';
import fondo from './img/fondo.jpg';
import logo from '../assets/images/backgrounds/logo-redlab.png';
import { Box, Button, createStyles, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../store/actions/seguridad/seguridad.actions';
import Swal from 'sweetalert2'
import { NavigateFunction, useNavigate } from 'react-router-dom';


class Login extends React.Component<{ navigate: NavigateFunction, onLoadData: any }, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showPassword: false,
            password: "",
            email: ""
        };
        localStorage.clear();
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    }
    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    login = () => {
        Swal.showLoading()
        login(this.state.email, this.state.password).then(r => {
            if (r.status) {
                Swal.hideLoading()
                //corecto
                this.props.onLoadData()
                this.props.navigate('/apps/home');
                //paginado- cambiar a home
            } else {
                //incorrecto- mostrar alerta
                Swal.fire("Error", r.message.text, "error");
                Swal.hideLoading()
            }
        });


    }

    loginEnter = (event: any) => {
        if (event.key === 'Enter') {
            Swal.showLoading()
            console.log(this.state.email, this.state.password);
            login(this.state.email, this.state.password).then(r => {
                if (r.status) {
                    Swal.hideLoading()
                    //corecto
                    this.props.onLoadData()
                    this.props.navigate('/apps/home');
                    //paginado- cambiar a home
                } else {
                    //incorrecto- mostrar alerta
                    Swal.fire("Error", r.message.text, "error");
                    Swal.hideLoading()
                }
            });
        }
    };


    render() {

        return (
            <div className='login-papa'>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }} style={{ backgroundColor: '#1C66D8',
                    minHeight: '100vh', WebkitBackgroundSize: 'cover',
                    MozBackgroundSize: 'cover', OBackgroundSize: 'cover', backgroundSize: 'cover'
                }}>
                    <Grid item xs={4} style={{
                        backgroundColor: '#1C66D8'
                    }} className='login'>
                        <div >
                            <div>
                                <h1 style={{ fontFamily: "Quicksand", fontWeight: "500", fontSize: '1.2rem', paddingLeft: "10%", color: "white" }}>RedLab Perú <b style={{color:"red"}}>|</b> 2022</h1>
                            </div>
                            <div style={{ paddingTop: "16%" }}>
                                <div >
                                    <h1 style={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '3rem', textAlign: 'center', padding: " 0px 30px ", color: "white" }}>Accede a tus resultado</h1>
                                </div>
                                <div>
                                    <InputLabel style={{ fontSize: "1.2rem", color: "white", paddingLeft: "11%" }}>Correo:</InputLabel>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <FormControl sx={{ m: 1, width: '50ch', paddingRight: '8px', height: "25px" }} >
                                        <Input
                                            id="standard-adornment-email"
                                            type={'text'}
                                            value={this.state.email}
                                            onKeyPress={this.loginEnter}
                                            onChange={this.handleChange('email')}
                                            inputProps={{
                                                style: {
                                                    backgroundColor: "white",
                                                    borderRadius: "2px",
                                                    alignItems: "center",
                                                    paddingLeft: "2%",
                                                    height: "2rem"
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <div style={{ paddingTop: "4%" }}>
                                    <InputLabel style={{ fontSize: "1.2rem", color: "white", paddingLeft: "11%" }}>Contraseña: </InputLabel>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <FormControl sx={{ m: 1, width: '50ch', paddingRight: '8px' }} variant="standard" >
                                        <Input
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onKeyPress={this.loginEnter}
                                            onChange={this.handleChange('password')}
                                            inputProps={{
                                                style: {
                                                    backgroundColor: "white",
                                                    borderRadius: "2px",
                                                    alignItems: "center",
                                                    paddingLeft: "2%",
                                                    height: "2rem"
                                                }
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end" >
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <div style={{ padding: "24px 0px" }}>

                                        <Button variant="contained" onClick={this.login} size="medium"
                                            className='iniciar-sesion' style={{
                                                fontFamily: "Quicksand", fontWeight: 600, fontSize: "1.1rem"
                                            }}>
                                            Iniciar Sesión
                                        </Button>
                                        <InputLabel style={{ fontSize: "0.95rem", paddingTop: "20px", color: "white", fontFamily: 'Quicksand', fontWeight: "450" }} >¿Olvido su contraseña?</InputLabel>
                                        <InputLabel style={{ fontSize: "0.95rem", padding: "2px 0px", color: "white", fontFamily: 'Quicksand', fontWeight: "450" }} >Más información</InputLabel>
                                    </div>
                                </div>
                                <div style={{ paddingTop: "15%",textAlign: 'left',maxWidth:"420px", paddingLeft: "12%" }}>
                                        <h1 style={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '0.8rem', color: "white" }}>Teléfono: (01) 4233855</h1>
                                        <h1 style={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '0.8rem', color: "white" }}>Dirección: Avenida paseo de los Andes, 830 Pueblo Libre</h1>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className='login-background con'>
                            <div style={{ textAlign: 'left', paddingTop: '13rem', paddingLeft: "3rem" }}>
                                <img src={logo} alt="cat" style={{ marginLeft: "-50px" }} />
                                <div style={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '4rem', color: 'black', paddingTop: "20px" }}>¡Bienvenido!</div>
                                <div style={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '1.5rem', color: 'white' }} >Contribuimos a la salud de las personas con información clara y confiable.</div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div >
        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Login);
