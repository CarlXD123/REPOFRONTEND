import './App.css';
import { BrowserRouter, Routes, Route, NavigateFunction, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Avatar, Box, CssBaseline, CSSObject, Divider, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Theme, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MailIcon from '@mui/icons-material/Mail';
import { getNavigation } from './store/actions/navegacion/navegacion.actions';
import logo from './assets/images/backgrounds/logo-redlab.png';
//iconos
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MediationIcon from '@mui/icons-material/Mediation';
import MasksIcon from '@mui/icons-material/Masks';
import PersonIcon from '@mui/icons-material/Person';
///
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Login from './components/Login';
import Home from './components/Home';
import Convenios from './components/Convenios';
import Personal from './components/Personal';
import Pacientes from './components/Pacientes';
import Citas from './components/Citas';
import Resultados from './components/Resultados';
import Examenes from './components/Examenes';
import Reporte from './components/Reporte';
import { InfoRounded } from '@mui/icons-material';
import { TbMiPerfil } from './components/usuario/Perfil';
import AdministarSedes from './components/usuario/AdministrarSede';
import { CambiarContraseña } from './components/usuario/CambiarContraseña';
import TbRegPersonal from './components/personal/registrar/tbRegPersonal';
import TbRegPaciente from './components/paciente/registrar/tbRegPacientes';
import TbRegConvenios from './components/convenio/registrar/tbRegConvenios';
import TbRegExamen from './components/examenes/registrar/tbRegExamen';
import TbEditConvenios from './components/convenio/modificar/tbEditConvenios';
import TbListaDePrecioConvenios from './components/convenio/listasDePrecios/TbListaDePrecioConvenios';
import TbListaDePrecioEditarConvenios from './components/convenio/listasDePrecios/Editar/TbListaDePrecioEditarConvenios';
import TbListaDePrecioCrearConvenios from './components/convenio/listasDePrecios/Crear/TbListaDePrecioCrearConvenios';
import TbModificarPersonal from './components/personal/modificar/TbModificarPersonal';
import TbEditarPaciente from './components/paciente/modificar/tbEditarPaciente';
import TbRegCita from './components/cita/registrar/tbRegCita';
import TbEditarCita from './components/cita/modificar/tbEditarCita';
import TbEditarExamen from './components/examenes/modificar/tbEditarExamen';
import CerrarSesion from './components/CerrarSesion';
import TbRegistrarResultado from './components/resultado/porAtender/registrarResultado';
import TbEditarResultado from './components/resultado/atendidas/editarResultado';
import TbReporteDate from './components/reporte/filtrar/tbReporteDate';
import PatientExamination from './components/PatientExamination';
import TbReportExamFinish from './components/reporte/filtrar/tbReportExamFinish';
import TbApilis from './components/apilis/tbApilis';
import Configure from './components/apilis/configure';
import Marca from './components/apilis/marca';
import NuevaMarca from './components/apilis/nuevaMarca';
import Modelos from './components/apilis/modelos';
import NuevoModelo from './components/apilis/nuevoModelo';
import ModelSetting from './components/apilis/modelSetting';
import ModelSettingNew from './components/apilis/modelSettingnew';
import ModelSettingEdit from './components/apilis/modelSettingedit';
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 300;//Ancho de nav
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Fondo = styled('div')(({ }) => ({
  left: 0,
  right: 0,
  height: "200px",
  position: "absolute",
  pointerEvents: "none",
  backgroundSize: "cover",
  backgroundColor: "#1C66D8"
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme), 
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    //this.theme = useTheme();
    this.state = {
      openMenu: false,
      menu: [],
      isLogged: true,
      nombreCompleto: "",
      correo: "",
      anchorElUser: null,
      role: 0,
      urlAvatar: ""

    };

  }

  handleDrawerOpen = () => {
    this.setState({
      openMenu: true
    });
  }

  handleDrawerClose = () => {
    this.setState({
      openMenu: false
    });
  }
  handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorElUser: event.currentTarget
    });
  }
  handleCloseUserMenu = () => {
    this.setState({
      anchorElUser: null
    });
  }

  cargardata = () => {
    //carga on
    const dato = localStorage.getItem('dataUser')
    if (dato != null) {
      const info = JSON.parse(dato);
      getNavigation(info.user.id).then(p => {
        console.log(p[0].children);
        this.setState({
          menu: p
        });

        //carga off
      });
      this.setState({
        isLogged: true,
        nombreCompleto: info.person.displayName,
        correo: info.user.email,
        role: info.roles[0].id,
        urlAvatar: info.user.urlAvatar
      });


    } else {
      this.setState({
        isLogged: false
      });

    }
  }

  componentDidMount() {
    this.cargardata();
  }




  render() {
    return (
      <BrowserRouter>
        <Box sx={{ display: 'flex', backgroundColor: "#E6F0F7"}} >
          <CssBaseline/>
          {
            this.state.isLogged ?
              <AppBar position="fixed" open={this.state.openMenu} style={{ backgroundColor: "yellow"}}  >
                <Toolbar style={{ backgroundColor: "#0A2C44" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5, backgroundColor: "#0A2C44",
                      ...(this.state.openMenu && { display: 'none' }),
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <div onClick={this.handleOpenUserMenu} style={{ width: "100%", textAlign: "end", backgroundColor: "#0A2C44" }}>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt={this.state.nombreCompleto} src={this.state.urlAvatar} />
                      <InputLabel sx={{
                        fontFamily: "Quicksand", fontWeight: "600",
                        padding: "8px 6px", textAlign: "center", cursor: "pointer", fontSize: "1.2rem", color: "white"
                      }}>{this.state.nombreCompleto}</InputLabel>
                    </IconButton>
                  </div>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={this.state.anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(this.state.anchorElUser)}
                    onClose={this.handleCloseUserMenu}
                  >
                    <Link to={"/pages/profile"}>
                      <MenuItem onClick={this.handleCloseUserMenu}>
                        <ListItemIcon>
                          <AccountCircleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText className="pl-0" primary="Mi Perfil" />
                      </MenuItem>
                    </Link>
                    {this.state.role && this.state.role === 1 ?
                      <Link to={"/apps/headquarters"}>
                        <MenuItem onClick={this.handleCloseUserMenu}>
                          <ListItemIcon>
                            <AccountCircleRoundedIcon />
                          </ListItemIcon>
                          <ListItemText className="pl-0" primary="Administrar Sedes" />
                        </MenuItem>
                      </Link> : ""
                    }
                    <Link to={"/pages/changePassword"}>
                      <MenuItem onClick={this.handleCloseUserMenu}>
                        <ListItemIcon>
                          <AccountCircleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText className="pl-0" primary="Cambiar Contraseña" />
                      </MenuItem>
                    </Link>
                    <Link to={"/cerrandoSesion"}>
                      <MenuItem onClick={this.handleCloseUserMenu}>
                        <ListItemIcon>
                          <AccountCircleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText className="pl-0" primary="Cerrar Sesion" />
                      </MenuItem>
                    </Link>

                  </Menu>
                </Toolbar>
              </AppBar >
              : ""
          }
          {

            this.state.isLogged ?
              <Drawer variant="permanent" open={this.state.openMenu}>
                <DrawerHeader style={{ backgroundColor: "#0E4AC2" }}>
                  <div>
                    <h1 style={{ fontFamily: "Quicksand", fontWeight: "500", fontSize: '1.2rem', color: "white" }}>RedLab Perú <b style={{ color: "red" }}>|</b> 2022</h1>
                  </div>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon style={{ backgroundColor: "white", borderRadius: "30px" }} />
                  </IconButton>
                </DrawerHeader>
                <InputLabel sx={{
                  fontFamily: "Quicksand", fontWeight: "600", backgroundColor: "#0E4AC2",
                  display: this.state.openMenu ? 'block' : 'none', opacity: this.state.openMenu ? 1 : 0, padding: "8px 20px", textAlign: "center",
                  fontSize: "1.2rem", color: "white"
                }}>{this.state.nombreCompleto}</InputLabel>
                <InputLabel sx={{
                  fontFamily: "Quicksand", fontWeight: "500", backgroundColor: "#0E4AC2",
                  display: this.state.openMenu ? 'block' : 'none', opacity: this.state.openMenu ? 1 : 0, padding: "0px 20px", paddingBottom: "20px",
                  textAlign: "center", fontSize: "0.9rem", color: "white"
                }}>{this.state.correo}</InputLabel>
                <div style={{
                  alignSelf: "center",
                  fontSize: "0rem",
                  marginBottom: "-4rem",
                  backgroundColor: "rgb(10, 44, 68)",
                  zIndex: 999,
                  borderRadius: "50%",
                  color: "white", display: this.state.openMenu ? 'block' : 'none',
                }}>
                  <AccountCircleRoundedIcon sx={{ fontSize: "1.7rem", display: this.state.openMenu ? 'block' : 'none' }} />
                </div>
                <Divider sx={{ backgroundColor: "rgb(10, 44, 68)", borderBottomWidth: "50px", display: this.state.openMenu ? 'block' : 'none', }} />

                <List sx={{ backgroundColor: "#0E4AC2" }}>
                  <ListItem disablePadding sx={{ display: this.state.openMenu ? 'block' : 'none', padding: "8px 20px", backgroundColor: "#0E4AC2",color:"white" }}>
                    <ListItemText primary={this.state.menu[0]?.title.toUpperCase()} sx={{ opacity: this.state.openMenu ? 1 : 0 }} />
                  </ListItem>
                  {this.state.menu[0]?.children.map((text: any, index: number) => (
                    <ListItem key={text.id} disablePadding sx={{ display: 'block', backgroundColor: "#2E66D8",borderColor:"black"}}>
                      <Link to={text.url} style={{color:"white"}}>
                        <ListItemButton className='cambio-text'
                          sx={{
                            minHeight: 20,
                            justifyContent: this.state.openMenu ? 'initial' : 'center',
                            px: 2.5,
                            backgroundColor: "#0E4AC2"
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: this.state.openMenu ? 3 : 'auto',
                              justifyContent: 'center',
                              color: "white"
                            }}
                          >
                            {text.icon === "home" ? <Tooltip title="Sede" followCursor><HomeRoundedIcon /></Tooltip> :
                              text.icon === "folder_specia" ? <Tooltip title="Convenios" followCursor><HandshakeRoundedIcon /></Tooltip> :
                                text.icon === "supervisor_account" ? <Tooltip title="Personal" followCursor><PersonIcon /></Tooltip> :
                                  text.icon === "group" ? <Tooltip title="Paciente" followCursor><MasksIcon /></Tooltip> :
                                    text.icon === "calendar_today" ? <Tooltip title="Cita/Reporte" followCursor><CalendarMonthIcon /></Tooltip> :
                                    text.icon === "apilis" ? <Tooltip title="APILIS" followCursor><MediationIcon /></Tooltip> :
                                      text.icon === "poll" ? <Tooltip title="Resultados/Exámenes" followCursor><ListAltIcon /></Tooltip> : <MailIcon />}
                          </ListItemIcon>

                          <ListItemText primary={text.title} sx={{ opacity: this.state.openMenu ? 1 : 0 }} className="texto-nav"/>
                         
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Drawer> : ""
          }
          <Box component="main" sx={{ flexGrow: 1 }}>
            {this.state.isLogged ? <DrawerHeader /> : ""}
            {this.state.isLogged ? <Fondo /> : ""}

            <Routes>
              <Route path='/' element={<Login onLoadData={this.cargardata} />} />
              <Route path='/cerrandoSesion' element={<CerrarSesion />} />

              {/**Modulos*/}
              <Route path='/apps/home' element={this.state.isLogged ? <Home /> : <Navigate to='/' replace />} />
              <Route path='/apps/agreements' element={<Convenios />} />
              <Route path='/apps/employees' element={<Personal />} />
              <Route path='/apps/patients' element={<Pacientes />} />
              <Route path='/apps/appointments' element={<Citas />} />
              <Route path='/apps/results' element={<Resultados />} />
              <Route path='/apps/examinations' element={<Examenes />} />
              <Route path='/apps/report/exam' element={<Reporte />} />
              <Route path='/apps/patientexaminations' element={<PatientExamination />} />
              <Route path='/apps/apilis' element={<TbApilis />} />

              {/**Perfil*/}

              <Route path='/pages/profile' element={<TbMiPerfil onLoadData={this.cargardata} />} />
              <Route path='/pages/changePassword' element={<CambiarContraseña />} />
              <Route path='/apps/headquarters' element={<AdministarSedes />} />

              {/**Registos*/}
              <Route path='/apps/agreements/new' element={<TbRegConvenios />} />
              <Route path='/apps/agreements/:id' element={<TbEditConvenios />} />
              <Route path='/apps/agreements/priceLists/:id' element={<TbListaDePrecioConvenios />} />
              <Route path='/apps/agreements/priceLists/crear/:id' element={<TbListaDePrecioCrearConvenios />} />
              <Route path='/apps/agreements/priceLists/:id/list/:idlista' element={<TbListaDePrecioEditarConvenios />} />

              <Route path='/apps/employees/new' element={<TbRegPersonal />} />
              <Route path='/apps/employees/:id/user/:userid' element={<TbModificarPersonal />} />

              <Route path='/apps/patients/new' element={<TbRegPaciente />} />
              <Route path='/apps/patients/:id/user/:userid' element={<TbEditarPaciente />} />


              <Route path='/apps/appointments/new' element={<TbRegCita />} />
              <Route path='/apps/appointments/:id' element={<TbEditarCita />} />


              <Route path='/apps/examinations/new' element={<TbRegExamen />} />
              <Route path='/apps/examinations/:id' element={<TbEditarExamen />} />

              <Route path='/apps/results/:id' element={<TbRegistrarResultado />} />
              <Route path='/apps/edit/results/:id' element={<TbEditarResultado />} />

              <Route path='/apps/report/exam/reportDate' element={<TbReporteDate />} />
              <Route path='/apps/report/exam/reportExamFin' element={<TbReportExamFinish />} />
              <Route path='/apps/apilis/configure' element={<Configure />} />
              <Route path='/apps/apilis/configure/marca' element={<Marca />} />
              <Route path='/apps/apilis/configure/marca/new' element={<NuevaMarca />} />
              <Route path='/apps/apilis/configure/marca/:id/modelos' element={<Modelos />} />
              <Route path='/apps/apilis/configure/modelos/:id/new' element={<NuevoModelo />} />
              <Route path='/apps/apilis/configure/modelo/:idmodelo/marca/:id/setting' element={<ModelSetting />} />
              <Route path='/apps/apilis/configure/modelo/:idmodelo/marca/:id/setting/new' element={<ModelSettingNew />} />
              <Route path='/apps/apilis/configure/modelo/:idmodelo/marca/:id/setting/edit' element={<ModelSettingEdit />} />

            </Routes>
          </Box>
        </Box>
      </BrowserRouter >
    );
  }
}

export default App;
