import React from 'react';

import './styles.css';


interface CoinTypes {
  coin: string;
  oldPrice: number;
  currentPrice: number;
}

export const Coin: React.FC<CoinTypes> = (props) => {
  const {coin, oldPrice, currentPrice} = props;
  const classes =['Coin'];

  if(oldPrice < currentPrice){
    classes.push('up');
  } 
  if(oldPrice > currentPrice){
    classes.push('down');
  }

  return (

    <div className={`${classes.join(' ')}`}>
      <span className='CoinContent'>{coin}</span>
      <span className='CoinContent'>R$ {currentPrice.toLocaleString()}</span>
    </div>
  );
  
  
}

