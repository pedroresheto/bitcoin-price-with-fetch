import React, { useState, useEffect } from 'react';


function BitcoinPrice() {
  const [price, setPrice] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция для выполнения запроса к API CoinGecko и обновления цены
    async function fetchBitcoinPrice() {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        const data = await response.json();
        const bitcoinPrice = data.bpi.USD.rate;
        setPrice(bitcoinPrice);
        setPriceHistory([...priceHistory, bitcoinPrice]); // Добавляем цену в историю
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении цены биткоина:', error);
        setLoading(false);
      }
    }

    // Вызываем функцию для выполнения запроса при монтировании компонента
    // fetchBitcoinPrice();

    // Устанавливаем интервал для обновления цены каждую минуту
    setInterval(fetchBitcoinPrice, 30000);
    
  }, [priceHistory]);

  return (
    <div>
      <h2>Цена биткоина</h2>
      {loading ? (
        <p>Загрузка цены...</p>
      ) : (
        <div>
          <p>Текущая цена биткоина: <b>${price}</b></p>
          <p>История цен за последние минуты:</p>
          <ul>
            {priceHistory.map((price, index) => (
              <li key={index}>${price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BitcoinPrice;
