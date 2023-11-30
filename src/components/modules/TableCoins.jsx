import TableRow from "./TableRow";
import { ThreeDots } from "react-loader-spinner";
import styles from "./TableCoins.module.css"

const TableCoins = ({ coins, loading  , currency  , setChart}) => {
    return (
        <div className={styles.container}>
            {
                loading ?
                    <ThreeDots
                        height="70"
                        width="70"
                        radius="9"
                        color="#99aa98"
                        ariaLabel="three-dots-loading"
                        visible={true}
                    />
                    :
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Coin</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>24h</th>
                                <th>Total Volume</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map((coin) => <TableRow key={coin.id} coin={coin} currency={currency}  setChart={setChart} />)}
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default TableCoins;