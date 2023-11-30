import { getCoins } from "../../services/cryptoApi";
import { useEffect, useState } from "react";
import axios from "axios";
import TableCoins from "../modules/TableCoins";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

const HomePage = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [page , setPage]=useState(1)
  const [currency,setCurrency]=useState('usd')
  const [chart,setChart]=useState(null)

  useEffect(() => {
    setLoading(true)
    const fetchApi = async () => {
      try {
      const res = await axios.get(getCoins(page , currency))
      setCoins(res.data)
      setLoading(false)
      } catch (error) {
        alert(error.message)
      }
     
    }
    fetchApi()
  }, [page , currency])
  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins coins={coins} loading={loading} currency={currency} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  );
};

export default HomePage;