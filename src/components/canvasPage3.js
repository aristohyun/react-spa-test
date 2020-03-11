//
//  캔버스 페이지, 3번의 캔버스를 네임만 바꾸며 초기화 하며 이용
//  초기화 하기 전에 picture 배열에 이미지를 string형식으로 저장하여
//  마지막에 세번째 그림을 그린 후 한번에 result 페이지로 전달
//
//  ver3 그림 -> 사진
//  종종 업로드가 안될때가 있음

import React, { Component } from "react";
import { Link } from "react-router-dom";

//import PropTypes from "prop-types";
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
        this.inter = {};
    }
    componentDidMount(){    //최초 렌더링 이후 한번만 발생
        this.canvas = document.getElementById("jsCanvas");
        this.ctx = this.canvas.getContext("2d");
        document.getElementById("jsNext").click();
       
    }
    resizeImg(){    //사진 크기 조절
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var filesToUploads = document.getElementById('imageFile').files;
            var file = filesToUploads[0];
            if (file) {
                var reader = new FileReader();
                // Set the image once loaded into file reader
                reader.onload = function(e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
    
                    const canvas = document.getElementById("jsCanvas");
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
    
                    var MAX_WIDTH = 400;
                    var MAX_HEIGHT = 400;
                    var width = img.width;
                    var height = img.height;
    
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);
                }
                reader.readAsDataURL(file);
            }
            
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }

    render() {
        return (
            <div className="wrapper">
                <h2 id="jsHead">test page</h2>
                <canvas className="canvas" id="jsCanvas" name="test"></canvas>
                <div className="controls">
                    <button className="btn paint" id="jsGetPic" onClick={() => {
                        const file = document.getElementById("imageFile");
                        file.click();
                    }}>Get Pic</button>
                    <input type="file" id="imageFile" accept="image/*" className="btn imgUpload" onChange={(evt) => {
                        var files = evt.target.files;
                        var file = files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function(e) {
                                document.createElement('img').src = e.target.result;
                                //왠진 모르게는데 이게 없으면 사진이 업로드가 안됨
                            };  
                            reader.readAsDataURL(file);
                            this.resizeImg();
                        }
                     }}></input>
                    <button className="btn" id="jsNext" onClick={() => {
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
                            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        }
                    }>Next</button>
                    <Link className="btn result" id="jsResult" to={{
                        pathname : "/resultPage",
                        state : {
                            picture : this.picture
                        }
                    }} onClick={()=>{this.picture[2] = this.canvas.toDataURL("image/png");}}>Result</Link>
                </div>
            </div>
        )
            
        }
}
