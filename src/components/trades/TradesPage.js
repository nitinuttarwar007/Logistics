import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { getAllTrades, getTradesColumns, addNewTrade } from '../../redux/actions/TradeActions';
import TableComponent from '../public/TableComponent';
import FormComponent from '../public/FormComponent';
import InfoPane from '../public/InfoPane';

const styles = theme => ({
    addBtn: {
         margin: '-30% 72%'
    }
});

class ConnectedTradesPage extends React.Component {
    state = {
        selectedRow: {},
        renderForm: false
    }

    componentDidMount() {
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

    addNewItem( values) {
        this.props.addNewTrade(values);
        console.log(this.props.message);
        alert(this.props.message);
    }

    render() {
        const { classes, trades, tradesColumn } = this.props;
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
                        { !this.state.renderForm ?
                            <InfoPane
                                selectedItem={this.state.selectedRow}
                                columns={tradesColumn}
                                onEdit={this.handleEditClick.bind(this)}
                            /> :
                            <FormComponent
                                editItem={this.state.selectedRow}
                                columns={tradesColumn}
                                handleSubmit={this.addNewItem.bind(this)}
                            />
                        }
                    </Grid>
                </Grid>
                <Tooltip title="Add" aria-label="Add">
                    <Fab size="medium" color="secondary" aria-label="Add" className={classes.addBtn}>
                        <AddIcon onClick={this.handleAddClick.bind(this)}/>
                    </Fab>
                </Tooltip>
            </div>
        )
    }
}

const mapStateToProps = (state) =>  {
    return {
        trades: state.TradeReducer.trades ? state.TradeReducer.trades.data : [],
        tradesColumn: state.TradeReducer.tradesColumn || [],
        message: state.TradeReducer.message || ' '
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
    getAllTrades,
    getTradesColumns,
    addNewTrade
    }, dispatch);
}

 const TradesPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedTradesPage);

 export default withStyles(styles)(TradesPage);
