//
//  캔버스 페이지, 3번의 캔버스를 네임만 바꾸며 초기화 하며 이용
//  초기화 하기 전에 picture 배열에 이미지를 string형식으로 저장하여
//  마지막에 세번째 그림을 그린 후 한번에 result 페이지로 전달
//
//  ver1 마우스O 터치X
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

        document.getElementById("jsNext").click();
        
        let painting = false;

        function stopPainting(){
            painting = false;
        }
        function startPainting(){
            painting = true;
        }
        function onMouseMove(event){
            const x = event.offsetX;
            const y = event.offsetY;

            const canvas = document.getElementById("jsCanvas");
            const ctx = canvas.getContext("2d");

            if(painting === false){
                ctx.beginPath();
                ctx.moveTo(x,y);
            }
            else{
                ctx.lineTo(x,y);
                ctx.stroke();
            }
        } 
        function handleCM(event){
            event.preventDefault();
        }
        if(this.canvas){ //캔버스에 이벤트 적용
            this.canvas.addEventListener("mousedown", startPainting);
            this.canvas.addEventListener("mousemove",onMouseMove);
            this.canvas.addEventListener("mouseup", stopPainting);
            this.canvas.addEventListener("mouseleave",stopPainting);

        //   this.canvas.addEventListener("touchstart",startPainting);
        //  this.canvas.addEventListener("touchmove",onMouseMove);
        //  this.canvas.addEventListener("touchend",stopPainting);
        //  this.canvas.addEventListener("touchcancel",stopPainting);

        this.canvas.addEventListener("contextmenu",handleCM);
        }   
    }   
    render() {
        return (
            <div className="wrapper">
                <h2 id="jsHead">test page</h2>
                <canvas className="canvas" id="jsCanvas" name="test" width="650" height="450"></canvas>
                <div className="controls">
                    <button className="btn" id="jsClean" onClick={() => {
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
                            this.ctx.fillStyle = "white"; //canvas reset
                            this.ctx.fillRect(0,0,650,450);
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
