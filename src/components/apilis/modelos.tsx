import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getBrandAllApi, deleteModelApi, getBrandApi, getModelApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';

export default function Modelos() {
    const { id } = useParams();
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows, setRows] = React.useState<any[]>([]);
    const [nombre, setNombre] = React.useState<any>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);
    const [modelList, setModelList] = React.useState<any[]>([]);
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);
    const [id2, setId] = React.useState<any>("");

    React.useEffect(() => {
      getModelApi(id).then((x: any) => {
        let mapeado: any = []
        x.data.data?.forEach((d: any) =>{
          mapeado.push({
            id:d.id,
            nombremodelo:d.nameModel,
            color:d.Color,
          })
        })
        setRows2(mapeado)
      })

      getBrandApi(id).then((x: any) => {
        setNombre(x.data.nameBrand)
      })

    }, [])

    console.log(rows2)
   
    let aux = modelList
    console.log(modelList)
    const handleDelete = async (id2: any, nombre: any) => {
      console.log(id2);
      var DeleteModel=()=>{
      Swal
      .fire({
          title: "Desea eliminar el modelo "+nombre+"?",
          showCancelButton: true,
          cancelButtonColor: '#0C3DA7',
          confirmButtonColor: '#FB0909',
          confirmButtonText: "Sí",
          cancelButtonText: "No",
      })
      .then(resultado => {
          if (resultado.value) {
              // Hicieron click en "Sí"
              try {
                setRows([])
                //await sleep(50)
                 
                setRows(aux)
  
                deleteModelApi(id2).then((x: any) => {
                  setId(x.data.id)
                  //setId(x.data.name)
                });
  
                setRows(aux.filter((row: any) => row.id !== id2));
          
              } catch(error) {
                 console.error(error)
                 
              }
              window.location.href = '/apps/apilis/configure/marca/'+ id + '/modelos'
              //DeletePaciente();
          } else {
              // Dijeron que no
              console.log("*NO se elimina el convenio");
          }
      });
    }
     
    DeleteModel()
  
    };

    const fechatotal=()=>{
        Swal.fire({
            title: 'Por favor, ingrese un filtro',
            icon: 'warning',
          })
    }

    const otrosfilt=()=>{
        Swal.fire({
            title: 'Por favor, ingrese uno de los filtros',
            icon: 'warning',
          })
    }

    const fechainitial=()=>{
        Swal.fire({
            title: 'Ingrese la fecha inicial por favor',
            icon: 'warning',
          })
    }

    const fechasecond=()=>{
        Swal.fire({
            title: 'Ingrese la fecha secundaria por favor',
            icon: 'warning',
          })
    }

    let componente: any;


    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200} sx={{mb: 50}}>
                    <Grid item xs={300} sx={{ placeContent: "center" }}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ display: "flex", width: "1150px" }} className="nav-tabla">
                        <Grid item xs={50}>
                        <Link to={"/apps/apilis/configure/marca"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem", cursor: "pointer"}} >APILIS/ {nombre}</InputLabel >
                            </div>
                        </Link>
                        <br></br>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.4rem"}} > MODELOS DE {nombre}</InputLabel >
                            </div>
        
                        </Grid>
                      </div>

                        <br></br>
                        <br></br>
                        <Grid xs={1000} mt={1} sx={{ placeContent: "center" }}>

                        <Grid container sx={{ placeContent: "center" }} xs={1000} mt={1} className='contenedor-tabla-apilis'>

                        {rows2.map((row: any, index: any) => {
                        return (                                        
                        <MenuItem key={index} value={row.id}>
                        <Box
                            className="card-container"
                            sx={{
                            width: 150,
                            height: 150,
                            backgroundColor: row.color,
                            boxShadow: '0px 0px 15px -5px',
                            transition: '0.3s',
                            animation:'ease-in',
                            }}
                          >
                          <Link to={"/apps/apilis/configure/modelo/"+ row.id +"/marca/"+ id+"/setting"}>   
                          <Grid container item xs={15} sx={{ placeContent: "center" }} style = {{fontWeight: "bold", fontSize: "1.2rem"}}>
                            <br></br>
                            {row.nombremodelo}
                          </Grid>
                          </Link>
                          <br></br>
                          <br></br>
                          <br></br>
                          <DeleteIcon onClick={() => handleDelete(row.id, row.nombremodelo)} style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}></DeleteIcon>
                          </Box>
                        </MenuItem>
                          
                         )
                        })}
                        <Link to={"/apps/apilis/configure/modelos/"+ id + "/new"}>
                        <MenuItem>
                        <Box
                            className="card-container"
                            sx={{
                            width: 150,
                            height: 150,
                            backgroundColor: 'primary.dark',
                            boxShadow: '0px 0px 15px -5px',
                            transition: '0.3s',
                            animation:'ease-in',
                            }}
                          >
                          <Grid container item xs={15} sx={{ placeContent: "center" }} style = {{fontWeight: "bold", fontSize: "1.2rem"}}>
                            <AddCircleOutlineIcon style={{ color: "white", fontSize: "10.5rem", cursor: "pointer" }}></AddCircleOutlineIcon>
                          </Grid>
                          </Box>
                        </MenuItem>
                        </Link>

                        </Grid>


                        </Grid>

    
                        <Grid>
                        
                        </Grid>
                        
                    


                        </div>
                       </div>
                    </Grid>
                </Grid>
            <br></br>
            <div>
            
            </div>

        </Contenido>
    </div>
    );
}


