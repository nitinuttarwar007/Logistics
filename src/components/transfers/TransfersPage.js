import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TransfersActions from '../../redux/actions/TransfersActions';
import TransportsActions from '../../redux/actions/TransportsActions';
import Grid from '@material-ui/core/Grid';
import TableComponent from '../public/TableComponent';
import ModalComponent from '../public/ModalComponent';


const styles = theme => ({
  paper: {
    maxWidth: '100%',
    marginTop: '20px',
    height: '500',
    padding: '10px'
  },
  button: {
    marginLeft: '500px'
  }
});

class ConnectedTransfersPage extends React.Component {
  constructor() {
    super();
    this.state = {
      purchase: {},
      sales: {},
      isOpenModal: false
    }
  }
  componentWillMount() {
    this.props.getAllPurchaseTrades();
    this.props.getAllSalesTrades();
    this.props.getTradesColumnsForTransfers();    
  }

  onPurchaseRowSelection(item) {
      this.setState({
        purchase: item
      });
      if(Object.keys(this.state.sales).length !== 0) {
        this.props.getTransportsColumns();
        this.props.getMatchingTransports(item, this.state.sales);
      }
  }

  onSalesRowSelection(item) {
    this.setState({
      sales: item
    });
    if(Object.keys(this.state.purchase).length !== 0) {
      this.props.getTransportsColumns();
      this.props.getMatchingTransports(this.state.purchase, item);
    }
  }

  nominateTransport(selectedTransport) {
    // console.log('nominateTransport!!!', selectedTransport);
    // console.log(this.state.purchase);
    // console.log(this.state.sales);
    console.log({ ...selectedTransport, laodTransfer: [...[this.state.purchase.trade_id]], unLaodTransfer: [...[this.state.sales.trade_id]] });
    this.props.updateTradeStatus(this.state.purchase.trade_id, 'NOMINATED');
    this.props.updateTradeStatus(this.state.sales.trade_id, 'NOMINATED');
    //this.props.updateTransportsAddTransfer({ ...selectedTransport, laodTransfer: [...[this.state.purchase.trade_id]], unLaodTransfer: [...[this.state.sales.trade_id]] });
    this.props.updateTransportsAddTransfer(selectedTransport.transport_id, this.state.purchase.trade_id, this.state.sales.trade_id)
    this.setState({ isOpenModal: true });
  }

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  }

  render() {
    const { tradesColumn, purchaseTrades, salesTrades, matchingTransports, transportsColumn, message, classes } = this.props;
    
    return (
        <div>
          <Grid container spacing={16}>
            <Grid item xs={5}>
              <TableComponent
                title="Purchases"
                rows={purchaseTrades}
                orderBy="name"
                direction="asc"
                columns={tradesColumn}
                showCheckBox={true}
                onRowSelection={this.onPurchaseRowSelection.bind(this)}
              />
              <br />
              <TableComponent
                title="Sales"
                rows={salesTrades}
                orderBy="name"
                direction="asc"
                columns={tradesColumn}
                showCheckBox={true}
                onRowSelection={this.onSalesRowSelection.bind(this)}
              />
            </Grid>
            <Grid item xs={7}>
              { matchingTransports.length !== 0 ? 
                <TableComponent
                  title="Transports"
                  rows={matchingTransports}
                  orderBy="name"
                  direction="asc"
                  columns={transportsColumn}
                  showButton={true}
                  buttonTilte={'Nominate'}
                  onButtonClick={this.nominateTransport.bind(this)}
                /> :
                <Paper className={classes.paper}> 
                  <h3>No Transports Meeting Your Critera are currently scheduled.</h3>
                  <Button component={Link} to="/transportsPage" type="submit" variant="outlined" color="secondary" className={classes.button}>
                        Create New
                  </Button>
                </Paper>
              }
            </Grid>
          </Grid>
          <ModalComponent
                    openModal={this.state.isOpenModal}
                    header={'Status: '}
                    message={message}
                    onCloseModal={this.handleCloseModal}
          />
        </div>
    );
  }
}

const mapStateToProps = (state) =>  {
  return {
    tradesColumn: state.TransferReducer.tradesColumn || [],  
    purchaseTrades: state.TransferReducer.purchaseTrades || [],
    salesTrades: state.TransferReducer.salesTrades || [],
    //transports: state.TransportsReducer.transports || [],
    matchingTransports: state.TransferReducer.matchingTransports || [],
    transportsColumn: state.TransportsReducer.transportsColumn || [],
    message: state.TransferReducer.message
  }
};

const mapDispatchToProps = dispatch => {
  let getAllPurchaseTrades = TransfersActions.getAllPurchaseTrades,
      getAllSalesTrades= TransfersActions.getAllSalesTrades,
      getTradesColumnsForTransfers = TransfersActions.getTradesColumnsForTransfers,
      getMatchingTransports = TransfersActions.getMatchingTransports,
      getTransportsColumns = TransportsActions.getTransportsColumns,
      updateTradeStatus = TransfersActions.updateTradeStatus,
      updateTransportsAddTransfer = TransfersActions.updateTransportsAddTransfer

  return bindActionCreators({
      getAllPurchaseTrades,
      getAllSalesTrades,
      getTradesColumnsForTransfers,
      getMatchingTransports,
      getTransportsColumns,
      updateTradeStatus,
      updateTransportsAddTransfer
  }, dispatch);
}


const TransfersPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedTransfersPage);
export default  withStyles(styles)(TransfersPage);
