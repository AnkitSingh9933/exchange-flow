import { useEffect, useState} from "react"


const useCurrencyInfo = (currency) => {
    const [data,setData] = useState({});
    useEffect(()=>{
        let url = `https://open.er-api.com/v6/latest/${currency}`;
        fetch(url)
        .then((curData)=>curData.json())
        .then((currencyRates)=>setData(currencyRates.rates))
    },[currency])
    return data;
}
export default useCurrencyInfo;