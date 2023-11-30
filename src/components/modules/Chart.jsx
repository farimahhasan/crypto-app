import styles from "./Chart.module.css"
import close from "../../assets/close-icon.svg"
import convertData from "../../helpers/convertData";
import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = ({ chart, setChart }) => {
    const [type, setType] = useState('prices')

    // console.log(convertData(chart,type))

    console.log(chart)

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <img src={close} onClick={() => setChart(null)} className={styles.close} />
                <div className={styles.coin}>
                    <img src={chart.coin.image} alt={chart.coin.name} />
                    <span>{chart.coin.name}</span>
                </div>
                <div className={styles.graph}>
                    <ResponsiveContainer width="90%" height="100%">
                        <LineChart
                            width={450}
                            height={400}
                            data={convertData(chart, type)}
                        >

                            <CartesianGrid stroke='#404042' />
                            <XAxis dataKey="date" hide />
                            <YAxis dataKey={type} domain={['auto', 'auto']} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth='2px' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.type}>
                    <button className={type === "prices" ? styles.selected : null} onClick={() => setType('prices')}>Prices</button>
                    <button className={type === "market_caps" ? styles.selected : null} onClick={() => setType('market_caps')}>Market Caps</button>
                    <button className={type === "total_volumes" ? styles.selected : null} onClick={() => setType('total_volumes')}>Total Volumes</button>
                </div>
                <div className={styles.details}>
                    <p>
                        <span>Price : </span>
                        ${chart.coin.current_price}
                    </p>
                    <p>
                        <span>ATH : </span>
                        ${chart.coin.ath}
                    </p>
                    <p>
                        <span>Market Cap : </span>
                        ${chart.coin.market_cap}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chart;