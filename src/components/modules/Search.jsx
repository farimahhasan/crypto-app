import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styles from "./Search.module.css"

const Search = ({ currency, setCurrency }) => {
    const [text, setText] = useState("")
    const [coin, setCoin] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCoin([])
        if (!text) {
            setLoading(false)
            return
        }
        const controller = new AbortController()
        const search = async () => {
            try {
                const res = await axios.get(searchCoin(text), { signal: controller.signal })
                if (res.data.coins) {
                    setCoin(res.data.coins);
                    setLoading(false)
                }
            } catch (error) {
                if (error.message !== "canceled") {
                    alert(error.response.data.status.error_message)
                    setLoading(false)
                }
            }
        }
        setLoading(true)
        search()

        return () => { controller.abort() }

    }, [text])

    return (
        <div className={styles.searchBox}>
            <input type="text" placeholder='search' value={text} onChange={e => setText(e.target.value)} />
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            {(coin.length || loading) &&

                <div className={styles.searchResult}>
                    {loading &&
                        <ThreeDots
                            height="50"
                            width="50"
                            radius="9"
                            color="#99aa98"
                            ariaLabel="three-dots-loading"
                            visible={true}
                        />}
                    <ul>
                        {coin.map(coin => (
                            <li key={coin.id}>
                                <img src={coin.thumb} alt={coin.name} />
                                <p>{coin.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default Search;