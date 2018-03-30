import React, { Component } from 'react';
import config from './config.js';
import './App.css';
import { Photo, Video, Gallery } from 'react-gallery';
import Home from './components/home/Home';
import Records from './components/records/Records';
import path from 'path';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRecords(data) {
    const songs = [];
    const records = data.records;

    for (let i = 0; i < records.length; i++) {
      for (let j = 0; j < records[i].songs.length; j++) {
        records[i].songs[j].image = data.rootURL + records[i].image;
        records[i].songs[j].srcs[0].src =
          data.rootURL + records[i].songs[j].srcs[0].src;
        songs.push(records[i].songs[j]);
      }
    }

    this.setState({
      songs,
      data
    });
  }

  handlePhotos(data) {
    this.setState({
      data
    });
  }

  componentWillMount() {
    const p = window.location.pathname;
    console.log(p);
    if (
      [
        '.mp4',
        '.jpg',
        '.jpeg',
        '.JPG',
        '.mp3',
        '.wav',
        '.flac',
        '.png',
        '.PNG'
      ].indexOf(p) === -1
    ) {
      fetch(config.staticUrl + p + '/data.json')
        .then(res => {
          if (res.ok) {
            return res;
          } else {
            if (res.status === 404) {
              this.setState({
                error: 'File not found'
              });
              return Promise.reject();
            }
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.type === 'records') {
            this.handleRecords(data);
          } else if (data.type === 'photos') {
            this.handlePhotos(data);
          }
        });
    }
  }

  render() {
    return (
      <div className="App">
        {(() => {
          const p = window.location.pathname;
          if (p === '/') return <Home />;
          switch (path.extname(p)) {
            case '.mp4':
              return <Video src={config.staticUrl + p} />;
            case '.jpg':
            case '.jpeg':
            case '.JPG':
            case '.png':
            case '.PNG':
              return <Photo src={config.staticUrl + p} />;
            case '.mp3':
            case '.wav':
            case '.flac':
              return (
                <audio controls src={config.staticUrl + p}>
                  Your browser does not support HTML5 audio. Sorry.
                </audio>
              );
            default:
              if (this.state.data && this.state.data.type === 'records') {
                return (
                  <Records
                    albums={this.state.data.records}
                    songs={this.state.songs}
                  />
                );
              }
              if (this.state.data && this.state.data.type === 'photos') {
                return (
                  <Gallery
                    staticUrl={this.state.data.rootURL}
                    title={this.state.data.title}
                    photos={this.state.data}
                  />
                );
              }
              if (this.state.error) {
                return <div>{this.state.error}</div>;
              }
              return <div>Loading data...</div>;
          }
        })()}
        <footer>
          <span>Website made with &#10084; by Bertrand Darbon</span>
        </footer>
      </div>
    );
  }
}

export default App;
