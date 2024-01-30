// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {currencyList: [], isLoading: true}

  componentDidMount() {
    this.getCurrencyList()
  }

  getCurrencyList = async () => {
    const request = await fetch(
      `https://apis.ccbp.in/crypto-currency-converter`,
    )
    const data = await request.json()

    console.log(data)

    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      currencyLogo: eachItem.currency_logo,
      currencyName: eachItem.currency_name,
      euroValue: eachItem.euro_value,
      usdValue: eachItem.usd_value,
    }))

    this.setState({currencyList: formattedData, isLoading: false})
  }

  render() {
    const {currencyList, isLoading} = this.state

    return (
      <div className="bg">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div className="card-container">
            <h1 className="heading">Cryptocurrency Tracker</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
              alt="cryptocurrency"
              className="crypto-currency"
            />
            <div className="cryptocurrencies-list-container">
              <div className="list-header">
                <p className="list-coin-type-heading">Coin Type</p>
                <div className="usd-and-euro-values-container">
                  <p className="list-coin-value-heading">USD</p>
                  <p className="list-coin-value-heading">EURO</p>
                </div>
              </div>
              <ul className="cryptocurrencies-list">
                {currencyList.map(eachCryptocurrency => (
                  <CryptocurrencyItem
                    key={eachCryptocurrency.id}
                    currencyDetails={eachCryptocurrency}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
