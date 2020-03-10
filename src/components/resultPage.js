//
//  결과 페이지, 앞서 canvas에서 그린 그림을 받아와 출력함
//

import React, { Component } from "react";
import "./index.css";
//import ReactDom from "react-dom";
//import PropTypes from "prop-types";
//import classNames from "./index.css";
//import Konva from "konva";

//import {Modal,Button,Input,Form} from "corfu";

export default class Result extends Component {

    componentDidMount(){

    }
    render() {
        return(
    <div className="wrapper">
        <div className="resultDiv">
            <img className="resultImg" src={this.props.location.state.picture[0]} alt="this is home"/>
            <p className="resultContent"> this is home  </p>
        </div>
        <div className="resultDiv">
            <img className="resultImg" src={this.props.location.state.picture[1]} alt="this is tree"/>
            <p className="resultContent"> this is tree </p>
        </div>
        <div className="resultDiv">
            <img className="resultImg" src={this.props.location.state.picture[2]} alt="this is person"/>
            <p className="resultContent"> this is tree </p>
        </div>
    </div>
        )
    }
}