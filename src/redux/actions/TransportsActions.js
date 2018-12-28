import actionTypes from '../constants/action-types';

const transportColumns = [
  { name: 'origin', label: 'Origin', isDisabled: false, inputType:'text'},
  { name: 'destination', label: 'Destination', isDisabled: false, inputType:'text' },
  { name: 'loadingDate', label: 'Loading Date', isDisabled: false, inputType:'date' },
  { name: 'unloadingDate', label: 'Unloading Date', isDisabled: false, inputType:'date' },
  { name: 'type', label: 'Type', isDisabled: false, inputType:'text' }
];

const transportActions = {
  getAllTransports: () => ({
    type: actionTypes.GET_ALL_TRANSPORTS
  }),

  receiveTransports: (transports) => ({
      type: actionTypes.RECEIVE_TRANSPORTS,
      transports
  }),

  getTransportsColumns: () => ({
    type: actionTypes.GET_TRANSPORTS_COLUMNS,
    transportColumns
  }),

  addNewTransport: (newTransport) => ({
    type: actionTypes.ADD_NEW_TRANSPORT,
    newTransport
  }),

  newTransportSuccess: (message, newlyAddedTransport) => ({
    type: actionTypes.ADD_NEW_TRANSPORT_SUCCESS,
    message,
    newlyAddedTransport
  }),

  newTransportFail: (message) => ({
    type: actionTypes.ADD_NEW_TRANSPORT_FAIL,
    message
  }),

  updateTransport: (editTransport) => ({
    type: actionTypes.UPDATE_TRANSPORT,
    editTransport
  }),

  updateTransportSuccess: (message, updatedTransport) => ({
    type: actionTypes.UPDATE_TRANSPORT_SUCCESS,
    message,
    updatedTransport
  }),

  deleteTransport: (transportId) => ({
    type: actionTypes.DELETE_TRANSPORT,
    transportId
  }),

  deleteTransportSuccess: (message, transportId) => ({
    type: actionTypes.DELETE_TRANSPORT_SUCCESS,
    message,
    transportId
  }),

  getPurchaseTransports: (purchaseTradeId) => ({
    type: actionTypes.GET_PURCHASE_TRANSPORTS,
    purchaseTradeId
  }),

  receivePurchaseTransports: (purchaseTransports) => ({
      type: actionTypes.RECEIVE_PURCHASE_TRANSPORTS,
      purchaseTransports
  }),

  getSalesTransports: (salesTradeId) => ({
      type: actionTypes.GET_SALES_TRANSPORTS,
      salesTradeId
  }),

  receiveSalesTransports: (salesTransports) => ({
      type: actionTypes.RECEIVE_SALES_TRANSPORTS,
      salesTransports
  })

}

export default transportActions;
