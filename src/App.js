
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state,setState] = useState()

  const dataArr = [state]
  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      const data = await response.json()
      state ? dataArr.push(data.bpi.USD.rate) : 
      setState(data.bpi.USD.rate)
      console.log(dataArr);
    }
    setInterval(()=>{
      fetchData()
    }, 10000)
   
  },[])
   
    
 
  return (
    <div className="App">
      <h1>Course diagram</h1>
      <p>{state} $</p>
    </div>
  );
}

export default App;
