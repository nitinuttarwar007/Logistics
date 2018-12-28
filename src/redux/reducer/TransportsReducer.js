import  actionTypes from '../constants/action-types';

const TransportsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_TRANSPORTS:
        console.log(state);
        return { ...state, transports: action.transports };

    case actionTypes.GET_TRANSPORTS_COLUMNS:
      return {...state, transportsColumn: action.transportColumns};

    case actionTypes.ADD_NEW_TRANSPORT_SUCCESS:
      return {...state, transports: [...state.transports, action.newlyAddedTransport], message: action.message};

    case actionTypes.ADD_NEW_TRANSPORT_FAIL:
      return {...state, message: action.message};

    case actionTypes.UPDATE_TRANSPORT_SUCCESS:
      let editIndex = state.transports.findIndex(x => x.transport_id === action.updatedTransport.transport_id);
      state.transports.splice(editIndex, 1, action.updatedTransport);
      return {...state, message: action.message};

    case actionTypes.DELETE_TRANSPORT_SUCCESS:
      let deleteIndex = state.transports.findIndex(x => x.transport_id === action.transportId);
      state.transports.splice(deleteIndex, 1);
      return{...state, message: action.message}
    
    case actionTypes.RECEIVE_PURCHASE_TRANSPORTS:
      return {...state, purchaseTransports: action.purchaseTransports};

    case actionTypes.RECEIVE_SALES_TRANSPORTS:
      return {...state, salesTransports: action.salesTransports};

    default:
      return state;
  }
}

export default TransportsReducer;
