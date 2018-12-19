import axios from 'axios';

class TradesApi {
  constructor(){
    this.serverURL = 'http://localhost:5000';
  }

  getAllTrades() {
    return axios.get(this.serverURL + '/fetchTrades');
  }

  addNewTrade(newTrade) {
    return axios.post(this.serverURL + '/addNewTrade/', {newTrade});
  }

  updateTrade(editTrade) {
    return axios.post(this.serverURL + '/updateTrade/' + editTrade.trade_id, {editTrade});
  }

  deleteTrade(tradeId) {
    return axios.post(this.serverURL + '/deleteTrade/' + tradeId);
  }

}

let TradesApiObj = new TradesApi();
export default TradesApiObj;
