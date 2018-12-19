import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const primary_btn = blue[500];
const white = grey[50];
const danger = red[500];

const styles = theme => ({
      root: {
        padding: '15px'
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

function InfoPane( props ) {
const { classes, selectedItem, columns, onEdit, onDelete } = props;

    return (
        <Paper elevation={1} className={classes.root}>
            <Fab aria-label="Edit" size="small" className={classes.fab1}>
                <EditIcon onClick={onEdit}/>
            </Fab>
            <Tooltip title="Delete">
                <Fab aria-label="delete" size="small" className={classes.fab2}>
                    <DeleteIcon onClick={onDelete}/>
                </Fab>
            </Tooltip>
                <h2 className={classes.header}>Trade ID: {selectedItem.trade_id}</h2>
                {columns.map(column => (
                    <Grid container spacing={24}>
                        <Grid item xs>
                            <p>{column.label} :</p>
                        </Grid>
                        <Grid item xs>
                            <p>{selectedItem[column.name]}</p>
                        </Grid>
                    </Grid>
                ))}
        </Paper>
    );
}

export default withStyles(styles)(InfoPane);
