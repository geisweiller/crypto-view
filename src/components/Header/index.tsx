import React, { useEffect, useState } from 'react';
import './styles.css';
import { Coin } from '../Coin/index';
import { api } from '../../services/api';

interface HeaderTypes {
  onSelected: (coin: string) => void;
};

interface Price {
  [key: string]:{ oldPrice: number, currentPrice: number}
}

const ALL_PRICES = {
  BTC: {oldPrice:0, currentPrice:0},
  LTC: {oldPrice:0, currentPrice:0},
  ETH: {oldPrice:0, currentPrice:0},
  LINK: {oldPrice:0, currentPrice:0},
  XRP: {oldPrice:0, currentPrice:0},
  EOS: {oldPrice:0, currentPrice:0},
}


export const Header: React.FC<HeaderTypes> = (props) => {
  const [prices, setPrices] = useState<Price>(ALL_PRICES);
  const {onSelected} = props;

  useEffect(() => {
    const intervals = Object.keys(ALL_PRICES).map((coin) => {
      return setInterval(() => {
        api
        .get(`price?fsym=${coin}&tsyms=BRL`)
        .then(response => {
          setPrices((prevState) => {
            if(prevState[coin].currentPrice === response.data.BRL) {
              return prevState;
            }
            return {
              ...prevState,
              [coin] : {
                oldPrice: prevState[coin].currentPrice,
                currentPrice: response.data.BRL
              }
            }
          })
        });
      }, 5000);
    });
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    }
    
    
  }, [])

  return ( 

    <div className='Header'> 
        {
          Object.keys(prices).map((coin) => {
            return(
              <button type='button' key={coin} onClick={() => onSelected(coin)}>
                <Coin  
                  coin={coin} 
                  oldPrice={prices[coin].oldPrice}  
                  currentPrice={prices[coin].currentPrice}
              />
              </button>
            )
          })
        }
  
    </div>

  )
  
  
}
