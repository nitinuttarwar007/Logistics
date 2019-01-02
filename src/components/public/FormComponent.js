import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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
      textField: {
          width: '100%'
      },
      radioButtonGroup: {
        flexWrap: 'nowrap',
        flexDirection: 'row'
      },
      button: {
        margin: theme.spacing.unit,
      },
      buttonGroup: {
        margin: '0 14%'
      }
});

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemState: this.getInitialFormValues(this.props.editItem)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.editItem !== this.props.editItem) {
            this.setState({
                itemState: this.getInitialFormValues(nextProps.editItem)
            });
          }
    }

    getInitialFormValues = (editItem) => {
        return this.props.columns.reduce(function(acc,col) {
            acc[col.name] ?
              acc[col.name] += " " :
              acc[col.name] = editItem[col.name] ||  " " ;
            return acc;
        }, {})
    }

    handleFieldChange =  name => event  => {
        let newItemState = {...this.state.itemState, [name]: event.target.value};
        this.setState({itemState: newItemState});
    };

    submitForm = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.itemState);
    }

    clearFormFields = () => {
        this.setState({
            itemState: this.getInitialFormValues(this.props.editItem)
        });
    }

    render() {
        const { classes, columns, editItem } = this.props;

        return (
            <Paper elevation={1} className={classes.root}>
                <h2 className={classes.header}>Trade ID: {editItem.trade_id}</h2>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitForm}>
                    {columns.map(column => (
                        <Grid container spacing={24}>
                            <Grid item xs={5}>
                                <p>{column.label} :</p>
                            </Grid>
                            <Grid item xs={7}>
                            { column.inputType !== 'radio' ?
                                <TextField
                                        type={column.inputType ? column.inputType : 'text'}
                                        className={classes.textField}
                                        value={this.state.itemState[column.name]}
                                        onChange={this.handleFieldChange(column.name)}
                                /> :
                                <RadioGroup
                                    className={classes.radioButtonGroup}
                                    value={this.state.itemState[column.name]}
                                    onChange={this.handleFieldChange(column.name)}
                                >
                                    <FormControlLabel
                                        value="BUY"
                                        control={<Radio />}
                                        label="Buy"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="SELL"
                                        control={<Radio />}
                                        label="Sell"
                                        labelPlacement="end"
                                    />
                            </RadioGroup>
                            }
                        </Grid>
                    </Grid>
                    ))}
                    <div className={classes.buttonGroup}>
                        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" className={classes.button} onClick={this.clearFormFields}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(FormComponent);
