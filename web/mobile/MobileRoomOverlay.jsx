import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleCloseAllMenus } from '../redux/actions/menu-actions';

import { getSettingsOrSidebarOpen } from '../redux/selectors/ui-selectors';


class MobileRoomOverlay extends Component {
  render() {
    const styles = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: '71px',
      zIndex: 1,
      display: this.props.show ? 'block' : 'none'
    };

    return <div style={styles} onClick={this.props.closeSidebar}></div>;
  }
}

function mapStateToProps(state) {
  return {
    show: getSettingsOrSidebarOpen(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSidebar() {
      dispatch(handleCloseAllMenus());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileRoomOverlay);
