import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import TransportsActions from '../../redux/actions/TransportsActions';
import TransfersActions from '../../redux/actions/TransfersActions';
import TableComponent from '../public/TableComponent';
import FormComponent from '../public/FormComponent';
import ModalComponent from '../public/ModalComponent';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


const STATUS_OPEN = 'OPEN';

const primary_btn = blue[500];
const white = grey[50];
const danger = red[500];

const styles = theme => ({
    addBtn: {
        position: 'fixed',
        margin: '-2% 72%'
    },
    root: {
        padding: '15px',
        marginTop: '20px'
      },
      header: {
        border: '2px solid #f50057',
        borderRadius: '5px',
        height: '40px',
        lineHeight: '1.5',
        color: ' #f50057',
        paddingLeft: '10px'
      },
      fab1: {
        background: primary_btn,
        color: white,
        position: 'absolute',
        right: theme.spacing.unit * 8,
      },
      fab2: {
        background: danger,
        color: white,
        position: 'absolute',
        right: theme.spacing.unit * 2,
      }
});

class ConnectedTransportsPage extends React.Component {
    state = {
        selectedRow: {},
        renderForm: false,
        isOpenModal: false
    }

    componentWillMount() {
        this.props.getAllTransports();
        this.props.getTransportsColumns();
    }

    onRowSelection(item) {
        this.setState({
            selectedRow: item,
            renderForm: false
        });

        this.props.getTradesColumns();
        console.log(item.loadTransfer);
        this.props.getPurchaseTransports(item.loadTransfer);
        this.props.getSalesTransports(item.unloadTransfer);
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
        this.props.deleteTransport(this.state.selectedRow.transport_id);
        let deleteIndex = this.props.transports.findIndex(x => x.transport_id === this.state.selectedRow.transport_id);
        this.setState({
            isOpenModal: true,
            selectedRow: this.props.transports[deleteIndex -1]
        });
    }

    addNewTransport(newTransport) {
        let newTransportId = this.props.transports.length + 1;
        this.props.addNewTransport({...newTransport, transport_id: newTransportId, status: STATUS_OPEN});
        this.setState({ isOpenModal: true });
    }

    updateTransport(editTransport) {
        this.props.updateTransport({...editTransport, transport_id: this.state.selectedRow.transport_id, status: this.state.selectedRow.status});
        this.setState({ isOpenModal: true });
    }

    handleCloseModal() {
        this.setState({ isOpenModal: false });
    }

    onDeleteClick(){

    }

    render() {
        const { classes, transports, transportsColumn, message, purchaseTransports, salesTransports, tradesColumn} = this.props;
        const { renderForm, selectedRow, isOpenModal } = this.state;
        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={7}>
                        <TableComponent
                            rows={transports}
                            orderBy="name"
                            direction="asc"
                            columns={transportsColumn}
                            onRowSelection={this.onRowSelection.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        { !renderForm ?
                            <div>
                                <Paper elevation={1} className={classes.root}>
                                    <Fab aria-label="Edit" size="small" className={classes.fab1}>
                                        <EditIcon onClick={this.handleEditClick.bind(this)}/>
                                    </Fab>
                                    <Tooltip title="Delete">
                                        <Fab aria-label="delete" size="small" className={classes.fab2}>
                                            <DeleteIcon onClick={this.onDeleteClick.bind(this)}/>
                                        </Fab>
                                    </Tooltip>
                                    <h2 className={classes.header}>Transport ID: {selectedRow.transport_id}</h2>
                                    <TableComponent
                                        rows={[selectedRow]}
                                        orderBy="name"
                                        direction="asc"
                                        columns={transportsColumn}
                                        onRowSelection={this.onRowSelection.bind(this)}
                                    />
                                    {
                                        purchaseTransports.leength !==0 ?
                                        <TableComponent
                                            rows={purchaseTransports}
                                            orderBy="name"
                                            direction="asc"
                                            title={"Purchases"}
                                            columns={tradesColumn}
                                        /> : 
                                        <div></div>
                                    }
                                    {
                                        salesTransports.length !== 0 ? 
                                        <TableComponent
                                            rows={salesTransports}
                                            orderBy="name"
                                            direction="asc"
                                            title={"Sales"}
                                            columns={tradesColumn}
                                        /> : 
                                        <div></div>
                                    }
                                </Paper>
                            </div> :
                            <FormComponent
                                editItem={selectedRow}
                                columns={transportsColumn}
                                handleSubmit={(Object.keys(selectedRow)).length === 0 ? this.addNewTransport.bind(this) : this.updateTransport.bind(this)}
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
                    onCloseModal={this.handleCloseModal.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>  {
    return {
        transports: state.TransportsReducer.transports || [],
        transportsColumn: state.TransportsReducer.transportsColumn || [],
        message: state.TransportsReducer.message || ' ',
        purchaseTransports: state.TransportsReducer.purchaseTransports || [],
        salesTransports: state.TransportsReducer.salesTransports || [],
        tradesColumn: state.TransferReducer.tradesColumn || []
    }
};

const mapDispatchToProps = dispatch => {
    let getAllTransports = TransportsActions.getAllTransports,
        getTransportsColumns = TransportsActions.getTransportsColumns,
        addNewTransport = TransportsActions.addNewTransport,
        updateTransport = TransportsActions.updateTransport,
        deleteTransport = TransportsActions.deleteTransport,
        getPurchaseTransports = TransportsActions.getPurchaseTransports,
        getSalesTransports = TransportsActions.getSalesTransports,
        getTradesColumns = TransfersActions.getTradesColumnsForTransfers;

    return bindActionCreators({
        getAllTransports,
        getTransportsColumns,
        addNewTransport,
        updateTransport,
        deleteTransport,
        getPurchaseTransports,
        getSalesTransports,
        getTradesColumns
    }, dispatch);
}

 const TransportsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedTransportsPage);

 export default withStyles(styles)(TransportsPage);
