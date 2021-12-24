import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

function MainPanel(props) {

  const [amountToday, setAmountToday] = useState(0);
  const [amountMonth, setAmountMonth] = useState(0);
  const [avgMonth, setAvgMonth] = useState(0.0);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/member/stats?wallet_id=' + props.wallet.wallet_id, {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setAmountToday(data['amount_today']);
      setAmountMonth(data['amount_month']);
      setAvgMonth(data['avg_month']);
    })
  }, [props.wallet, props.numTransactionAdded]);

  function getCurrencyString(currencies) {
    if (!currencies || currencies.length <= 0 || !props.wallet) return '';
    else {
      let currency = currencies.filter((c) => c.currency_id === props.wallet.currency_id);
      if (currency.length <= 0) return ''; else return currency[0].code;
    }
  }

  function getUserAvatarURL() {
    if (!props.user) return ''; else 
    return process.env.REACT_APP_API_ENDPOINT + '/static/' + props.user.avatar_url
  }

  return (
    <div className="max-w-max rounded-2xl m-8 flex flex-row justify-around">
      <div className="flex flex-col justify-center items-center w-5/12">
        <img className="rounded-full w-24 h-24" src={getUserAvatarURL()} alt="Avatar"/>
        <span className="text-sm">Nay xài bao nhiêu rồi hả?</span>
      </div>
      <div className="flex flex-col items-center w-3/4 ml-4">
        <span className="text-gray-400">Today</span>
          <span className="text-3xl">{amountToday + ' ' + getCurrencyString(props.currencies)}</span>
          <div className="flex flex-row mt-4 w-11/12 justify-around">
              <div className="flex flex-col">
                  <span className="text-sm text-gray-400">This <br/> month</span>
                  <span className="text-lg">{amountMonth}</span>
              </div>
              <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Avg day <br/> (month)</span>
                  <span className="text-lg">{avgMonth.toFixed(2)}</span>
              </div>
          </div>
      </div>
    </div>
    )
}

export default MainPanel;