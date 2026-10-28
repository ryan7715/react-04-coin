import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("https://api.upbit.com/v1/market/all")
            .then(response => {
                return response.json();
            })
            .then(json => {
                setCoins(json);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <h1>업비트 코인 목록 ({coins.length}개)</h1>
            <hr />
            <select>
                {coins.map((coin, index) => {
                    return (
                        <option key={index} value={coin.market}>
                            {coin.korean_name} ({coin.market})
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default App;
