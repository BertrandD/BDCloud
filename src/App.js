import React, { Component } from 'react';
import config from "./config.js";
import {Route} from "react-router-dom";
import './App.css';
import { Photo, Video } from "react-gallery";
import Home from "./components/home/Home";
import path from 'path';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/" render={(props) => {
              const p = window.location.pathname;
              switch (path.extname(p)) {
                  case '.mp4':
                      return (
                          <Video src={config.staticUrl + p}/>
                      );
                  case '.jpg':
                  case '.jpeg':
                  case '.JPG':
                      return (
                          <Photo src={config.staticUrl + p}/>
                      );
                  case '.mp3':
                  case '.wav':
                  case '.flac':
                      return (
                          <audio controls src={config.staticUrl + p}>Your browser does not support HTML5 audio. Sorry.</audio>
                      );
                  default:
                      return(
                          <div>
                              File type not yet supported. Sorry.
                          </div>
                      )
              }
          }}/>
      </div>
    );
  }
}

export default App;
