import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
        >
          <Tab label="Trades" component={Link} to="/" />
          <Tab label="Transfers" component={Link} to="/transfersPage" />
          <Tab label="Transports" component={Link} to="/transportsPage"/>
        </Tabs>
      </Paper>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
