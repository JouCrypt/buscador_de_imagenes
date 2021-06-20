import React,{useEffect, useState} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
const [buscar, setBuscar] = useState('');
const [imagenes, setImagenes] = useState([]);
const [paginaactual, setPaginaActual] = useState(1);
const [totalpagina, setTotalpagina] = useState(1);

useEffect(() => {
  const consultarAPI =async()=>{
  if(buscar === '')return;
 
 
  const imagenesPorPagina=30;
  const key='21258084-f21dfd6b39019697724920328';
 
  const url= `https://pixabay.com/api/?key=${key}&q=${buscar}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
 
  const respuesta = await fetch (url);
  const resultado = await respuesta.json();
  setImagenes (resultado.hits);
  //calcular el total de paginas
  const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
  setTotalpagina(calcularTotalPaginas);

//mover pantalla hacia arriba
const jumbotron=document.querySelector('.jumbotron');
jumbotron.scrollIntoView({behavior:'smooth'});

 };
 consultarAPI();

}, [buscar,paginaactual])
//definir la pagina anterior
const  paginaAnterior = ()=>{

  const nuevaPaginaActual = paginaactual - 1;
  if(nuevaPaginaActual === 1) return;
  setPaginaActual(nuevaPaginaActual);
};
//definir pagina siguiente
const paginaSiguiente= ()=>{
  const nuevaPaginaActual = paginaactual + 1;
  if(nuevaPaginaActual > totalpagina) return;
  setPaginaActual(nuevaPaginaActual);
};


  return (
   <div className="container">
     <div className="jumbotron">

<p className="lead text-center">Buscador de Imágenes</p>
<Formulario setBuscar={setBuscar}/>
     </div>
     <div className="row justify-content-center">
       <ListadoImagenes
       imagenes={imagenes}
       />

       {paginaactual === 1 ? null :  <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>&laquo;Anterior </button>}
       

       {paginaactual === totalpagina ? null : <button type="button" className="btn btn-info" onClick={paginaSiguiente}>Siguiente &raquo;</button>}
       
     </div>
   </div>
  );
}

export default App;
