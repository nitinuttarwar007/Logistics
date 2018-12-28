import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import tradeActions from '../../redux/actions/TradeActions';
import TableComponent from '../public/TableComponent';
import FormComponent from '../public/FormComponent';
import InfoPane from '../public/InfoPane';
import ModalComponent from '../public/ModalComponent';

const STATUS_OPEN = 'OPEN';
const styles = theme => ({
    addBtn: {
        position: 'fixed',
        margin: '-2% 72%'
    }
});

class ConnectedTradesPage extends React.Component {
    state = {
        selectedRow: {},
        renderForm: false,
        isOpenModal: false
    }

    componentWillMount() {
        this.props.getAllTrades();
        this.props.getTradesColumns();
    }

    onRowSelection(item) {
        this.setState({
            selectedRow: item,
            renderForm: false
        });
    }

    handleAddClick() {
        this.setState({
            renderForm: true,
            selectedRow: { }
        });
    }

    handleEditClick() {
        this.setState({ renderForm: true });
    }

    handleDeleteClick() {
        this.props.deleteTrade(this.state.selectedRow.trade_id);
        let deleteIndex = this.props.trades.findIndex(x => x.trade_id === this.state.selectedRow.trade_id);
        this.setState({
            isOpenModal: true,
            selectedRow: this.props.trades[deleteIndex -1]
        });
    }

    addNewTrade(newTrade) {
        let newTradeId = this.props.trades.length + 1;
        this.props.addNewTrade({...newTrade, trade_id: newTradeId, status: STATUS_OPEN});
        this.setState({ 
            isOpenModal: true,
            renderForm: false, 
            selectedRow: newTrade
        });
    }

    updateTrade(editTrade) {
        this.props.updateTrade({...editTrade, trade_id: this.state.selectedRow.trade_id, status: this.state.selectedRow.status});
        this.setState({ 
            isOpenModal: true, 
            renderForm: false, 
            selectedRow: editTrade 
        });
    }

    handleCloseModal = () => {
        this.setState({ isOpenModal: false });
    };

    render() {
        const { classes, trades, tradesColumn, message } = this.props;
        const { renderForm, selectedRow, isOpenModal } = this.state;
        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={9}>
                        <TableComponent
                            rows={trades}
                            orderBy="name"
                            direction="asc"
                            columns={tradesColumn}
                            onRowSelection={this.onRowSelection.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        { !renderForm ?
                            <InfoPane
                                selectedItem={selectedRow}
                                columns={tradesColumn}
                                onEdit={this.handleEditClick.bind(this)}
                                onDelete={this.handleDeleteClick.bind(this)}
                            /> :
                            <FormComponent
                                editItem={selectedRow}
                                columns={tradesColumn}
                                handleSubmit={(Object.keys(selectedRow)).length === 0 ? this.addNewTrade.bind(this) : this.updateTrade.bind(this)}
                            />
                        }
                    </Grid>
                </Grid>
                <Tooltip title="Add" aria-label="Add">
                    <Fab size="medium" color="secondary" aria-label="Add" className={classes.addBtn}>
                        <AddIcon onClick={this.handleAddClick.bind(this)}/>
                    </Fab>
                </Tooltip>
                <ModalComponent
                    openModal={isOpenModal}
                    header={'Status: '}
                    message={message}
                    onCloseModal={this.handleCloseModal}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>  {
    return {
        trades: state.TradeReducer.trades ? state.TradeReducer.trades : [],
        tradesColumn: state.TradeReducer.tradesColumn || [],
        message: state.TradeReducer.message || ' '
    }
};

const mapDispatchToProps = dispatch => {
    let getAllTrades = tradeActions.getAllTrades,
        getTradesColumns = tradeActions.getTradesColumns,
        addNewTrade = tradeActions.addNewTrade,
        updateTrade = tradeActions.updateTrade,
        deleteTrade = tradeActions.deleteTrade;

    return bindActionCreators({
        getAllTrades,
        getTradesColumns,
        addNewTrade,
        updateTrade,
        deleteTrade
    }, dispatch);
}

 const TradesPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedTradesPage);

 export default withStyles(styles)(TradesPage);
