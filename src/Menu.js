import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import './App.css';
import layout from './layout_icon.png';
import add from './add_component.png'
import settings from './settings.png'
import palette from './palette.png'

import layout2 from './layout_icon_dark.png';
import add2 from './add_component_dark.png'
import settings2 from './settings_dark.png'
import palette2 from './palette_dark.png'
import back2 from './back_dark.png'

class Menu extends Component {
    render() {
        return (
        <div className="nav">
            <div className="menuBar">
                <div className="menuIcon">
                    <img src={back2}/>
                </div>
                <div className="menuIcon">
                    <img src={layout2}/>
                </div>
                <div className="menuIcon">
                    <img src={add2}/>
                </div>
                <span className="rightComponents">
                <div className="menuIcon">
                    <img src={palette2}/>
                </div>
                <div className="menuIcon">
                    <img src={settings2}/>
                </div>       
          </span>
        </div>
        </div>
        );
    }
}

export default Menu;