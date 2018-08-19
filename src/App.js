import React, { Component } from 'react';
import './App.css';
import YSearch from 'youtube-api-search';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import List from './components/Video/List/List';
import Video from './components/Video/Video';


const YOUTUBE_API_KEY = 'AIzaSyCfgGDa7izBRRcOB6Gsbk6sxkbER1QBkdg'

class App extends Component {

  state = { videos: [] ,
            selectedVideo: null}

  componentDidMount(){
    YSearch({ key: YOUTUBE_API_KEY, term: 'ViViD Dear'}, (data) => {
 　    this.setState({ videos: data , selectedVideo: data[2]})
　  });
  }
  
   onVideoClickedHandler= (video) => {
    this.setState({selectedVideo: video})
  }

  onKeywordChangedHandler = (keyword) => {
    let newTerm = 'ViViD' + keyword;
    if(keyword === ''){
    newTerm = 'ViViD Dear';
  }
   YSearch({ key: YOUTUBE_API_KEY, term: newTerm}, (data) => {
 　    this.setState({ videos: data, selectedVideo: data[0]})
　  });
  }
 
  render() {
    return (
      <div className="App">
        <Header onKeywordChanged={this.onKeywordChangedHandler}/>
        <Body>
        <Video video={this.state.selectedVideo}/>
        <List 
        videos={this.state.videos}
        onVideoClicked = {this.onVideoClickedHandler}
        selectedVideo = {this.state.selectedVideo}
         />
        </Body>
      </div>
    );
  }
}

export default App;