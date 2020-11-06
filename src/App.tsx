import React, { useState } from 'react';
import './assets/styles/global.css';

import { Header } from './components/Header/index';
import { Chart } from './components/Chart/index';

function App() {
  const [coinSelected, setcoinSelected] = useState('BTC')

  return (
    <div className="App">
      <Header onSelected={(coin) => setcoinSelected(coin)}/>
      <Chart coin={coinSelected}/>
    </div>
  );
}

export default App;
