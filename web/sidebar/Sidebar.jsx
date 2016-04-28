import React from 'react';
import Config from '../config'
import Immutable from 'immutable'

import SidebarRoomListElm from './SidebarRoomListElm'

export default React.createClass({
  getDefaultProps: function(){
    return {
      activeRooms: Immutable.Map(),
      roomList: Immutable.Map(),
      roomName: null,
      unreadCounts: Immutable.Map()
    }
  },
  renderYourRooms: function(){
    return <ul id="roomlist" className="nav">
      <li key="your-rooms" className="hidden-folded padder m-t m-b-sm text-muted text-xs">
        <span>Your Rooms</span>
      </li>
      {
        this.props.roomList.toArray().map((room) => {
          return <SidebarRoomListElm key={room.get('name')}
                                     room={room}
                                     active={room.get('name') == this.props.roomName}
                                     unreadCount={this.props.unreadCounts.get(room.get('name'))}/>
        })
      }
    </ul>
  },
  renderSuggestedRooms: function(){
    if(!Config.features.suggestedRooms){
      return null;
    }

    if (this.props.activeRooms.size === 0 ) {
      return null
    }
  
    return <div>
      <li className="line dk"></li>
      <ul id="toproomlist" className="nav">
          <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">
            <span>Suggested Active Rooms</span>
          </li>
          {this.props.activeRooms.map((room) => {
            return <SidebarRoomListElm key={room.get('name')} room={room} active={false}/>
          })}
      </ul>
    </div>
  },
  render: function () {
    let classes = "app-aside hidden-xs bg-dark";
    if(this.props.open){
      classes += " off-screen";
    }
    return (
      <aside id="aside" className={classes}>
        <div className="aside-wrap">
          <div className="navi-wrap">
            <nav ui-nav className="navi clearfix">
              {this.renderYourRooms()}
              {this.renderSuggestedRooms()}
            </nav>
          </div>
        </div>
      </aside>
    )
  }
})
