import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getModelApi, deleteModelApi, deleteBrandApi, getBrandAllApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Contenido } from "../Home";
import Swal from 'sweetalert2';


export default function Marca() {
    const [rows, setRows] = React.useState<any[]>([]);
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [marcaList, setMarcaList] = React.useState<any[]>([]);
    const [id, setId] = React.useState<any>("");

    React.useEffect(() => {
        getBrandAllApi(0, 5000, 0).then((ag: any) => {
          let mapeado: any = []
          ag.data?.forEach((d: any) =>{
            mapeado.push({
              id:d.id,
              nombremarca:d.nameBrand,
              descripcionMarca: d.Descr,
              color:d.Color,
              modelo:d.model.modelo,
            })
                
          })
          setMarcaList(mapeado)
        });

 
    }, [])

    let aux = marcaList
    console.log(marcaList)
    const handleDelete = async (id: any, nombre: any) => {
      console.log(id);
      var DeleteClient=()=>{
      Swal
      .fire({
          title: "Desea eliminar la marca "+nombre+"?",
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
  
                deleteBrandApi(id).then((x: any) => {
                  setId(x.data.id)
                  //setId(x.data.name)
                });
  
                setRows(aux.filter((row: any) => row.id !== id));
          
              } catch(error) {
                 console.error(error)
                 
              }
              window.location.href = '/apps/apilis/configure/marca'
              //DeletePaciente();
          } else {
              // Dijeron que no
              console.log("*NO se elimina el convenio");
          }
      });
    }
     
    DeleteClient()
  
    };

   
    let componente: any;

    console.log(marcaList)

    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200} sx={{mb: 50}}>
                    <Grid item xs={300} sx={{ placeContent: "center" }}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ display: "flex", width: "1150px" }} className="nav-tabla">
                        <Grid item xs={6}>
                        <Link to={"/apps/apilis/configure"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem", cursor: "pointer"}} >APILIS / CONFIGURACION / MARCA</InputLabel >
                            </div>
                        </Link>
                        </Grid>
                      </div>


                        <br></br>
                        <br></br>
                        <Grid xs={5000} mt={1} sx={{ placeContent: "center" }}>  
                        <Grid container sx={{ placeContent: "center" }} xs={5000} mt={1} className='contenedor-tabla-apilis'>
                        {marcaList.map((row: any, index: any) => {
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
                          <Link to={"/apps/apilis/configure/marca/"+ row.id + "/modelos"}>  
                          <Grid container item xs={15} sx={{ placeContent: "center" }} style = {{fontWeight: "bold", fontSize: "1.2rem"}}>
                            <br></br>
                            <br></br>
                            {row.nombremarca}
                            <br></br>
                            {row.modelo.length + " modelos"}
                          </Grid>
                          </Link>
                            
                          <DeleteIcon onClick={() => handleDelete(row.id, row.nombremarca)} style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}></DeleteIcon>
                          
                        </Box>
                        </MenuItem>
                         )
                        })}

                        <Link to={"/apps/apilis/configure/marca/new"}>
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


