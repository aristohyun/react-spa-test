//
//  메인 시작 페이지
//

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
//import ReactDom from "react-dom";
//import PropTypes from "prop-types";
//import classNames from "./index.css";
//import Konva from "konva";

//import {Modal,Button,Input,Form} from "corfu";

export default class Main extends Component {
    render() {
        return(
            <center>
                <h2>Hi, this is HTP-Test</h2>
                <Link className="btn" to="/canvasPage"> Next </Link>
            </center>
        )
    }
}