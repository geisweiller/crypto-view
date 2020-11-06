import { createChart, CrosshairMode, ISeriesApi } from 'lightweight-charts';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import { ChartKey } from '../ChartKey/index';

import './styles.css';

interface ChartTypes {
  coin: string;
}

export  const Chart: React.FC<ChartTypes> = (props) => {
  const { coin } = props;
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const candleSeriesRef = useRef() as MutableRefObject<ISeriesApi<"Candlestick">>
  const [prices, setPrices] = useState<any[]>([]);
  const [chartLoaded, setchartLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval((() => {
      api.get(`histominute?fsym=${coin}&tsym=BRL&limit=300`)
      .then(response => {
        setPrices(prevState => {
          const price = response.data.Data[1];
          const newPrice = {
            time: price.time,
            high: price.high,
            open: price.open,
            close: price.close,
            volume: price.volumefrom,
          };
          candleSeriesRef.current.update(newPrice);
          return [...prevState, newPrice];
          });      
      });
    }), 60000)
    return() => clearInterval(interval)
  }, [coin, chartLoaded]);



  useEffect(() => {
    api.get(`histoday?fsym=${coin}&tsym=BRL&limit=300`)
    .then(response => {
      const prices = response.data.Data.map((row: any) => ({
        time: row.time,
        low: row.low,
        high: row.high,
        open: row.open,
        close: row.close,
        volume: row.volumefrom,
      }));

      setPrices(prices);
    })
  }, [coin, chartLoaded]);

  useEffect(() => {
    setPrices([]);
  }, [coin]);


  useEffect(() => {
    if(candleSeriesRef.current) {
      candleSeriesRef.current.setData(prices);
    }
  }, [prices])




  useEffect(() => {
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        backgroundColor: '#202020',
        textColor: '#F5F5F5',
      },
      grid: {
        vertLines: {
          color: '#363636'
        },
        horzLines: {
          color: '#363636'
        },
      },
        crosshair: {
          mode: CrosshairMode.Normal
        },
        //@ts-ignore
        priceScale: {
          borderColor: '#404040'
        },
        timeScale: {
          borderColor: '#404040'
        }
    });

    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#4bffb5',
      wickDownColor: '#839ca1',
      wickUpColor: '#839ca1',
    });

    setchartLoaded(true);
  }, []);


  return (
    <div className='Chart' ref={containerRef}>
      <ChartKey chartKey={coin}/>
    </div>
  )
}