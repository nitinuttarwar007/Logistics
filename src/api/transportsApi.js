import axios from 'axios';
import qs from 'qs';

class TransportsApi {
  
  constructor() {
    this.serverURL = 'http://localhost:5000';
  }

  getAllTransports() {
    return axios.get(this.serverURL + '/fetchTransports');
  }

  addNewTransport(newTransport) {
    return axios.post(this.serverURL + '/addNewTransport/', {newTransport});
  }

  updateTransport(editTransport) {
    return axios.post(this.serverURL + '/updateTransport/' + editTransport.transport_id, {editTransport});
  }

  deleteTransport(transportId) {
    return axios.post(this.serverURL + '/deleteTransport/' + transportId);
  }
  
  getTradesToTransports(purchaseTradeIds) {
    return axios.get(this.serverURL + '/getTradesToTransports', { 
      params: { 
        tradeIds: purchaseTradeIds
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    });
  }

}

let TransportsApiObj = new TransportsApi();
export default TransportsApiObj;
