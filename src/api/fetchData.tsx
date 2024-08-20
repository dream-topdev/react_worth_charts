import axios from 'axios'
export const fetchData = async (
  symbol: string,
  interval: string
): Promise<any> => {

  const twoHourStockData = (timeSeries) => {
    // Get all timestamps and sort them in descending order
    const timestamps = Object.keys(timeSeries).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const result = {};
    for (let i = 0; i < timestamps.length; i += 2) {
        // Get the current 2-hour chunk
        const chunk = timestamps.slice(i, i + 2);
        // Aggregate data for this 2-hour chunk
        const aggregated = chunk.reduce((acc, timestamp) => {
            const hourData = timeSeries[timestamp];
            return {
                open: acc.open || hourData["1. open"],
                close: hourData["4. close"],
                high: Math.max(acc.high, parseFloat(hourData["2. high"])),
                low: Math.min(acc.low, parseFloat(hourData["3. low"])),
                volume: acc.volume + parseFloat(hourData["5. volume"])
            };
        }, {
            open: null,
            close: null,
            high: -Infinity,
            low: Infinity,
            volume: 0
        });

        // Store the aggregated data using the last timestamp of the chunk
        result[chunk[chunk.length - 1]] = {
            "1. open": aggregated.open,
            "2. high": aggregated.high.toFixed(4),
            "3. low": aggregated.low.toFixed(4),
            "4. close": aggregated.close,
            "5. volume": aggregated.volume
        };
    }
    return result;
};


  try {
    let url = ''
    let response = { data: null }
    switch (interval) {
      case '1D':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data[`Time Series (1min)`]
        break
      case '5D':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data[`Time Series (5min)`]
        break;
      case '1M':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=30min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data[`Time Series (30min)`]
        break
      case '3M':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data[`Time Series (60min)`]
        break;
      case '6M':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return twoHourStockData( response.data[`Time Series (60min)`] )
        break;
      case '1Y':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data['Time Series (Daily)']
        break
      case '5Y':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data['Weekly Time Series']
        break;
      case 'All':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&outputsize=full&apikey=${import.meta.env.VITE_ALPHAVANTAGE_PREMIUM_KEY}`
        response = await axios.get(url)
        return response.data['Monthly Time Series']
        break
    }

  } catch (error) {
    console.log('Error fetching data: ', error)
    return null
  }

}
