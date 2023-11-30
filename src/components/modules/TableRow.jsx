import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"
import styles from "./TableCoins.module.css"
import { marketChart } from "../../services/cryptoApi";
import axios from "axios";


const TableRow = ({ coin, currency, setChart }) => {

    const { id, name, image, symbol, total_volume, current_price, price_change_percentage_24h: percent
    } = coin
    const showHandler = async () => {
        try {
            const res = await axios.get(marketChart(id))
            setChart({...res.data , coin})
        } catch (error) {
            setChart(null)
        }

    }


    return (
        <tr>
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} alt="" />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>{currency === "usd" && "$"}{currency === "eur" && "€"}{currency === "jpy" && "¥"}{current_price.toLocaleString()}</td>
            <td className={percent > 0 ? styles.success : styles.error}>{percent.toFixed(2)}%</td>
            <td>{total_volume}</td>
            <td><img src={percent > 0 ? chartUp : chartDown} alt="" /></td>
        </tr>
    );
};

export default TableRow;