import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect,useState} from 'react';
function App() {

  const dat = new Date();
  let year = dat.getFullYear();

  const [data,setData]=useState({});
  const [inputCity,setCity]=useState("");

  const WeatherDetails=(cityName)=>{
    if(!cityName) return;
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid="+process.env.REACT_APP_SECRET_KEY
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("response", data)
      setData(data);
  })
  }

  
const handleSearch=()=>{
  WeatherDetails(inputCity)
  setCity("")

}


const handleChangeInput=(e)=>{
  setCity(e.target.value);
 
  
}

useEffect(() => {
  WeatherDetails("delhi")
},[])


  return (
    <>
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className='heading'> Weather App</h1>




      <div className='d-grid mt-3 gap-3 col-md-4'> 
      <input type="text" className='form-control' onChange={handleChangeInput} value={inputCity}/>
      <button className='btn btn-primary' type='button' onClick={handleSearch}>Search
      </button>
      </div>  
      </div>


{ data.name !==undefined ?

<div className='col-md-12 text-center mt-3'>
        <div className='shadow rounded weatherBox'>
        {/* <img className='image1' src="https://m.media-amazon.com/images/I/4173Qy1AD8L.jpg" alt='shortimage' /> you can add this defaul icon */}
        {data.weather ? <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" /> : null}
        <h5 className='weatherCity'>{data?.name}</h5>
        {data.main ? <h6 className='weatherTemp'>{((data.main.temp)-273.15).toFixed(2)}°C</h6>: null}
        {data.weather ? <p> Description: {data.weather[0].description}</p> : null} 
        </div>
      </div>
:
<div className='col-md-12 text-center mt-3'>
        <div className='shadow rounded weatherBox'>
          <p className='error'>please enter correct city Name</p>
          </div>
          </div>
}
      <footer className='footer'>
        Copyright@Nishant {year}
      </footer>

    </div>
    </>



  );
}

export default App;
