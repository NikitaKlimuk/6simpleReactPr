import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  // const [rates, setRates] = React.useState([]);
  const ratesRef = React.useRef({})

  React.useEffect(() => {
    // Апишка не рабочая, если нужно будет искать другую
    fetch('https://cdn.cyr.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.quotes);
        ratesRef.current = json.quotes;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию')
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const price1 = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency];
    const price = price1 * value; 
    setToPrice(value);
    setFromPrice(price.toFixed(3));
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}/>
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
