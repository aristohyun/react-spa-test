//
//  캔버스 페이지, 3번의 캔버스를 네임만 바꾸며 초기화 하며 이용
//  초기화 하기 전에 picture 배열에 이미지를 string형식으로 저장하여
//  마지막에 세번째 그림을 그린 후 한번에 result 페이지로 전달
//
//
//  ver2 마우스O 터치O (아직 터치시 스크롤 이동함)
//

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
//import ReactDom from "react-dom";
//import PropTypes from "prop-types";
//import classNames from "./index.css";
//import Konva from "konva";

//import {Modal,Button,Input,Form} from "corfu";

export default class canvasPage extends Component {
    constructor(props){
        super(props);
        this.canvas = {};
        this.ctx = {};
        this.isPaint = true;
        this.canvasNum = 0;
        this.isLastPage = false;
        this.picture = ["","",""];
    }
    componentDidMount(){    //최초 렌더링 이후 한번만 발생
        this.canvas = document.getElementById("jsCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle ="#2c2c2c";
        this.ctx.lineWidth = 2.5;

        const canvas = this.canvas;
        const ctx = this.ctx;

        document.getElementById("jsNext").click();
       
        var drawing = false;
        var mousePos = { x:0, y:0 };
        var lastPos = mousePos;

                // Get the position of the mouse relative to the canvas
        window.requestAnimFrame = (function (callback) {
            return  window.requestAnimationFrame || 
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimaitonFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000/60);
                    };
        })();
        function renderCanvas() {
            if (drawing) {
                ctx.beginPath();
                ctx.moveTo(lastPos.x, lastPos.y);
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
                lastPos = mousePos;
            }
        }
  
  // Allow for animation
        (function drawLoop () {
            window.requestAnimFrame(drawLoop);
            renderCanvas();
        })();

        function getMousePos(canvasDom, mouseEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - rect.left,
                y: mouseEvent.clientY - rect.top
            };
        }
        // Get the position of a touch relative to the canvas
        function getTouchPos(canvasDom, touchEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left,
                y: touchEvent.touches[0].clientY - rect.top
            };
        }
        canvas.addEventListener("mousedown", function (e) {
            drawing = true;
            lastPos = getMousePos(canvas, e);
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            drawing = false;
        }, false);
        canvas.addEventListener("mousemove", function (e) {
            mousePos = getMousePos(canvas, e);
        }, false);

        canvas.addEventListener("touchstart", function (e) {
            mousePos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);

        // Prevent scrolling when touching the canvas
        document.body.addEventListener("touchstart", function (e) {
            if (e.target ===canvas) {
            e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", function (e) {
            if (e.target === canvas) {
            e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", function (e) {
            if (e.target === canvas) {
                e.preventDefault();
            }
        }, false);
    }   
    render() {
        return (
            <div className="wrapper">
                <h2 id="jsHead">test page</h2>
                <canvas className="canvas" id="jsCanvas" name="test" width="650" height="450"></canvas>
                <div className="controls">
                    <button className="btn" id="jsClean" onClick={() => {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.ctx.fillStyle = "white"; //canvas reset
                        this.ctx.fillRect(0,0,650,450);
                    }}>Clean</button>
                    <button className="btn paint" id="jsMode" onClick={() => {
                        const mode = document.getElementById("jsMode");
                        if(this.isPaint){
                            this.isPaint = false;
                            mode.innerHTML = "Erase";
                            this.ctx.strokeStyle ="white";
                            this.ctx.lineWidth = 12;
                        }else{
                            this.isPaint = true;
                            mode.innerHTML = "Paint";
                            this.ctx.strokeStyle ="#2c2c2c";
                            this.ctx.lineWidth = 2.5;
                        }
                    }}>Paint</button>
                    <button className="btn" id="jsNext" onClick={
                        () => {
                            document.documentElement.scrollTop = 0; //go top
                            const head = document.getElementById("jsHead");
                            this.canvasNum++;
                            if(!this.isPaint) document.getElementById("jsMode").click();

                            switch(this.canvasNum){
                                case 1:
                                    head.innerHTML = "home test page";
                                    this.canvas.name = "homeTestPic";
                                    break;
                                case 2:
                                    this.picture[0] = this.canvas.toDataURL("image/png");
                                    head.innerHTML = "tree test page";
                                    this.canvas.name = "treeTestPic";
                                    break;
                                case 3:
                                    this.picture[1] = this.canvas.toDataURL("image/png");
                                    head.innerHTML = "person test page";
                                    this.canvas.name = "personTestPic";
                                    document.getElementById("jsNext").remove();
                                    document.getElementById("jsResult").style.display = "inline-block";
                                    break;
                                default:
                                    alert("error");
                                    break;
                            }
                            document.getElementById("jsClean").click();
                        }
                    }
                    >Next</button>
                    <Link className="btn result" id="jsResult" to={{
                        pathname : "/resultPage",
                        state : {
                            picture : this.picture
                        }
                    }} onClick={()=>{this.picture[2] = this.canvas.toDataURL("image/png"); console.log(this.picture);}}>Result</Link>
                   
                </div>
            </div>
        )
            
        }
}
