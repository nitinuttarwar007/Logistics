import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import tradesApi  from '../../api/tradesApi';
import tradeActions from '../actions/TradeActions';
import actionTypes from '../constants/action-types';

/**
 * search products epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */

const tradeEpic = {
  getAllTrades: (action$) => {
    return action$
      .ofType(actionTypes.GET_ALL_TRADES).switchMap(() => {
        return tradesApi.getAllTrades().then(res => tradeActions.receiveTrades(res.data))
      });
  },

  addNewTrade: (action$) => {
    return action$
      .ofType(actionTypes.ADD_NEW_TRADE).switchMap((payload) => {
        return tradesApi.addNewTrade(payload.newTrade)
                        .then(res => tradeActions.newTradeSuccess(res.data.message, res.data.data))
                        .catch(res => tradeActions.newTradeFail(res.message));
      });
  },

  updateTrade: (action$) => {
    return action$
      .ofType(actionTypes.UPDATE_TRADE).switchMap((payload) => {
        return tradesApi.updateTrade(payload.editTrade)
                        .then(res => tradeActions.updateTradeSuccess(res.data.message, res.data.data));
      });
  },

  deleteTrade: (action$) => {
    return action$
      .ofType(actionTypes.DELETE_TRADE).switchMap((payload) => {
        return tradesApi.deleteTrade(payload.tradeId)
                        .then(res => tradeActions.deleteTradeSuccess(res.data.message, res.data.data));
      });
  }

}

export default tradeEpic;
