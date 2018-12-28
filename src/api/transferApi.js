import axios from 'axios';

class TransferApi {

    constructor() {
      this.serverURL = 'http://localhost:5000';
    }

    getAllPurchaseTrades() {
        return axios.get(this.serverURL + '/fetchAllPurchaseTrades');
    }

    getAllSalesTrades() {
        return axios.get(this.serverURL + '/fetchAllSalesTrades');
    }

    getAllMatchingTransports(purchase, sales) {
        return axios.get(this.serverURL + '/getAllMatchingTransports/' + purchase.tradeDate + '/' + sales.tradeDate + '/' + purchase.location + '/' + sales.location);
    }

    updateTradeStatus(tradeId, statusToBeUpdated) {
        return axios.post(this.serverURL + '/updateTradeStatus/' + tradeId , {statusToBeUpdated})
    }

    updateTransportsAddTransfer(transportID, loadTransfer, unloandTransfer) {
        return axios.post(this.serverURL + '/updateTransportsAddTransfer/' + transportID, {loadTransfer, unloandTransfer})
    }

}

let TransferApiObj = new TransferApi();
export default TransferApiObj;