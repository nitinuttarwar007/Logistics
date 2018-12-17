import axios from 'axios';


class TradesApi {
  constructor(){
    this.serverURL = 'http://localhost:5000';
  }

  getAllTrades() {
    return axios.get(this.serverURL + '/fetchTrades');
  }

  addNewTrade(newTrade) {
    console.log('newTradeAPi', newTrade);
    return axios.post(this.serverURL + '/addNewTrade/', {newTrade});
  }
}

let TradesApiObj = new TradesApi();
export default TradesApiObj;

