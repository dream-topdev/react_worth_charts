import { fetchData } from './fetchData'
import { getTimeStamp } from '../utils/getTimeStamp'

export const fetchStockData = async (symbol: string, interval: string, start: Date, end:Date) => {

  if (start === null ) {
    start = new Date("Sat Dec 03 1999 00:00:00 GMT-0400")
  } 

  if (end === null) {
    end = new Date();
  }

  const startDate = start.toISOString().split('T')[0];
  const endDate = end.toISOString().split('T')[0];

  const rawData = await fetchData(symbol, interval)

  const result = {};
  for (const date in rawData ) {
    if (date >= startDate && date <=endDate) {
      result[date] = rawData[date];
    }
  }

  const stockDataSeries = Object.entries(result)
    .map(data => {
      const stockData = {
        time: getTimeStamp(data[0]),
        open: Number(data[1]['1. open']),
        high: Number(data[1]['2. high']),
        low: Number(data[1]['3. low']),
        close: Number(data[1]['4. close']),
      }
      return stockData
    })
    .reverse()

  const timeData = Object.entries(result)
    .map((data, index) => {
      const stockData = [
        getTimeStamp(data[0]),
        {
          index: index,
          open: Number(data[1]['1. open']),
          high: Number(data[1]['2. high']),
          low: Number(data[1]['3. low']),
          close: Number(data[1]['4. close']),
          volume: Number(data[1]['5. volume']),
        },
      ]
      return stockData
    })
    .reverse()

  // @ts-ignore
  const tempDataArray = new Map(timeData)

  const Volume = Object.entries(result)
    .map((data, index) => {
      const volumeData = {
        time: getTimeStamp(data[0]),
        value: Number(data[1]['5. volume']),
        index: index,
      }
      return volumeData
    })
    .reverse()

  const timeIndex = Object.entries(result).map((data, index) => {
    return getTimeStamp(data[0])
  })

  return {
    stockDataSeries,
    tempDataArray,
    Volume,
    timeIndex,
  }
}
