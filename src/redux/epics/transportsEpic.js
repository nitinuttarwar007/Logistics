import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import transportsApi  from '../../api/transportsApi';
import TransportsActions from '../actions/TransportsActions';
import actionTypes from '../constants/action-types';

/**
 * search products epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */

const transportsEpic = {
  getAllTransports: (action$) => {
    return action$
      .ofType(actionTypes.GET_ALL_TRANSPORTS).switchMap(() => {
        return transportsApi.getAllTransports().then(res => TransportsActions.receiveTransports(res.data))
      });
  },

  addNewTransport: (action$) => {
    return action$
      .ofType(actionTypes.ADD_NEW_TRANSPORT).switchMap((payload) => {
        return transportsApi.addNewTransport(payload.newTransport)
                        .then(res => TransportsActions.newTransportSuccess(res.data.message, res.data.data))
                        .catch(res => TransportsActions.newTransportFail(res.message));
      });
  },

  updateTransport: (action$) => {
    return action$
      .ofType(actionTypes.UPDATE_TRANSPORT).switchMap((payload) => {
        return transportsApi.updateTransport(payload.editTransport)
                        .then(res => TransportsActions.updateTransportSuccess(res.data.message, res.data.data));
      });
  },

  deleteTransport: (action$) => {
    return action$
      .ofType(actionTypes.DELETE_TRANSPORT).switchMap((payload) => {
        return transportsApi.deleteTransport(payload.transportId)
                        .then(res => TransportsActions.deleteTransportSuccess(res.data.message, res.data.data));
      });
  },

  getPurchaseTransports: (action$) => {
    return action$
           .ofType(actionTypes.GET_PURCHASE_TRANSPORTS).switchMap((payload) => {
               return transportsApi.getTradesToTransports(payload.purchaseTradeId)
                                 .then(res => TransportsActions.receivePurchaseTransports(res.data.data));
            });
},

getSalesTransports: (action$) => {
    return action$  
           .ofType(actionTypes.GET_SALES_TRANSPORTS).switchMap((payload) => {
                return transportsApi.getTradesToTransports(payload.salesTradeId)
                                  .then(res => TransportsActions.receiveSalesTransports(res.data.data));
           });
}

}

export default transportsEpic;
