import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
        maxWidth: '100%'
    },
    showColumn: {
        display: 'table-cell',
        padding: '4px 40px 4px 10px',
        textAlign: 'center'
    },
    hideColumn: {
        display: 'none',
        padding: '4px 40px 4px 10px',
        textAlign: 'center'
    },
    heading: {
        padding: '10px 0 0 10px'
    },
    table: {
        minWidth: '450px',
    },
    button: {
        padding: '7px 5px',
        fontSize: '12px',
        minHeight: '10px'
    }
});

export class TableComponent extends React.Component {
  constructor() {
      super();
      this.state = {
        selectedValue: ' '
      }
  }

  selectItem(item, e) {
     typeof(this.props.onRowSelection) === 'function' ?
            this.props.onRowSelection(item) : 
            e.preventDefault();
  }

  onButtonClick(item) {
    this.props.onButtonClick(item);
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    const { columns, rows, orderBy, direction, classes, title, showCheckBox, showButton, buttonTilte } = this.props;
    const { selectedValue } = this.state;
    return(
    <Paper className={classes.paper}>
        <h2 className={classes.heading}>{title}</h2>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                { showCheckBox ? 
                    <TableCell padding="checkbox"> </TableCell> :
                    <div></div> 
                }
                { columns.map(column => (
                    <TableCell
                        className={column.isDisabled ? classes.hideColumn : classes.showColumn }
                        key={column.name}
                        sortDirection={orderBy === column.name ? direction : false}
                    >
                        {column.label}
                    </TableCell>
                ))}
                { 
                    showButton ?
                    <TableCell></TableCell>:
                    <div></div>
                }
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(item => (
                    <TableRow hover={true} onClick={this.selectItem.bind(this, item)}>                      
                        { showCheckBox ? 
                            <TableCell padding="checkbox"> 
                                <Checkbox 
                                    checked={selectedValue === item._id}
                                    onChange={this.handleChange.bind(this)}
                                    value={item._id}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        />
                            </TableCell> : 
                            <div></div> 
                        }
                        { columns.map(column => (
                            <TableCell
                                key={column.name}
                                numeric={column.isNumeric}
                                className={column.isDisabled ? classes.hideColumn : classes.showColumn }
                            >
                                {item[column.name]}
                            </TableCell>
                        ))}
                        { showButton ? 
                            <TableCell padding="checkbox"> 
                                <Button variant="outlined" color="secondary" className={classes.button} onClick={this.onButtonClick.bind(this, item)}>
                                    {buttonTilte}
                                </Button>
                            </TableCell> : 
                            <div></div> 
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(TableComponent);

