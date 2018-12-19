import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
        maxWidth: '100%'
    },

    showColumn: {
      display: 'table-cell'
    },
    hideColumn: {
        display: 'none'
    }
});

export class TableComponent extends React.Component {
  selectItem(item){
    this.props.onRowSelection(item);
  }

  render() {
    const { columns, rows, orderBy, direction, classes } = this.props;
    return(
    <Paper className={classes.paper}>
      <Table>
          <TableHead>
              <TableRow>
                  {columns.map(column => (
                      <TableCell
                          className={column.isDisabled ? classes.hideColumn : classes.showColumn }
                          key={column.name}
                          sortDirection={orderBy === column.name ? direction : false}
                      >
                          {column.label}
                      </TableCell>
                  ))}
              </TableRow>
          </TableHead>
          <TableBody>
              {rows.map(item => (
                  <TableRow hover={true} onClick={this.selectItem.bind(this, item)}>
                      {columns.map(column => (
                          <TableCell
                              key={column.name}
                              numeric={column.isNumeric}
                              className={column.isDisabled ? classes.hideColumn : classes.showColumn }
                          >
                              {item[column.name]}
                          </TableCell>
                      ))}
                  </TableRow>
              ))}
          </TableBody>
      </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(TableComponent);

