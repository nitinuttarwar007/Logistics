import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import transferApi  from '../../api/transferApi';
import TransfersActions from '../actions/TransfersActions';
import actionTypes from '../constants/action-types';

/**
 * search products epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */

const transferEpic = {
    getAllPurchaseTrades: (action$) => {
        return action$
              .ofType(actionTypes.GET_ALL_PURCHASE_TRADES).switchMap(() => {
                    return transferApi.getAllPurchaseTrades()
                        .then(res => TransfersActions.receiveAllPurchaseTrades(res.data))
                });
    },

    getAllSalesTrades: (action$) => {
        return action$
               .ofType(actionTypes.GET_ALL_SALES_TRADES).switchMap(() => {
                    return transferApi.getAllSalesTrades()
                        .then(res => TransfersActions.receiveAllSalesTrades(res.data));
                });
    },

    getAllMatchingTransports: (action$) => {
        return action$
                .ofType(actionTypes.GET_MATCHING_TRANSPORTS).switchMap((payload) => {
                    return transferApi.getAllMatchingTransports(payload.purchase, payload.sales)
                                        .then(res => TransfersActions.receiveAllMatchingTransports(res.data));
                });
    },
   
    updateTradeStatus: (action$) => {
        return action$
               .ofType(actionTypes.UPDATE_TRADE_STATUS).switchMap((payload) => {
                    return transferApi.updateTradeStatus(payload.tradeId, payload.statusToBeUpdated )
                                      .then(res => TransfersActions.updateTradeStatusSuccess())
               });
    },

    updateTransportsAddTransfer: (action$) => {
        return action$
                .ofType(actionTypes.UPDATE_TRANSPORT_ADD_TRANSFER).switchMap((payload) => {
                    return transferApi.updateTransportsAddTransfer(payload.transportID, payload.loadTransfer, payload.unloandTransfer)
                                        .then(res => TransfersActions.updateTransportsAddTransferSuccess(res.data.message));
                });
    },

    getPurchaseTransports: (action$) => {
        return action$
               .ofType(actionTypes.GET_PURCHASE_TRANSPORTS).switchMap((payload) => {
                   return transferApi.getTradesToTransports(payload.purchaseTradeId)
                                     .then(res => TransfersActions.receivePurchaseTransports(res.data.data));
                });
    },

    getSalesTransports: (action$) => {
        return action$  
               .ofType(actionTypes.GET_SALES_TRANSPORTS).switchMap((payload) => {
                    return transferApi.getTradesToTransports(payload.salesTradeId)
                                      .then(res => TransfersActions.receiveSalesTransports(res.data.data));
               });
    }

}

export default transferEpic;
