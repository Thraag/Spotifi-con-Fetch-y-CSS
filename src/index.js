import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./css.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [canciones, setCanciones] = useState([])



  const handleButtonClick = (e) => {
    e.preventDefault();
    if(inputValue.trim() === "" ){
      alert("Ingresa tu cancion");
      return;
    }
      setInputValue('');
      getSong(inputValue);
  };





  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'faee16c02cmshb5d03f7d6843bf8p167aadjsn593864c635e5',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };




  async function getSong(inputValue) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${inputValue}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
      let data = await fetch(url, options)
      let res = await data.json();
      setCanciones(res.tracks.items)
      console.log(res)
      console.log(data)

    } catch (error) {
      console.log(`ups error: ${error}`);
    }
  }








  return (
    <div className='main-container'>
    <div className='section section2'>
      <div className='left'>
        <div className='brand'>
          <img className='logo' src={logo} alt='' />
        </div>
        <div className='hr-dad'>
          <hr className='hr1'/>
        </div>
        <div className='searcher'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Busca tu canción"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className='button-dad'>
          <button type="button" className="btn btn-dark" onClick={handleButtonClick}>Ir</button>
        </div>
      </div>
  
      <div className='right'>
        <h2 className='titulo'>Canciones Del Artista</h2>
        <hr className='hr2'/>
        {canciones.map((cancion, index) => (
          <div key={index} className='boxArtist'>
            <img src={cancion.data.albumOfTrack.coverArt.sources[0].url}/>
            <h2 className='titulesong'>{cancion.data.name}</h2>
            <a href={cancion.data.uri}><button className='button-right'>Play song</button></a>
          </div>
        ))}
      </div>
    </div>
    </div> 
  );
  }
  
  ReactDOM.render(
    <Home />,
    document.querySelector("#app")
  );