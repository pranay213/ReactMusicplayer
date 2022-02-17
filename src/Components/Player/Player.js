import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import './Player.css'


export default function Player() {
  const[songs,setSongs]=useState();
  const[current,setCurrent]=useState(new Audio);
  const[index,setIndex]=useState(0);
  const[playing,setPlaying]=useState(false);
  const[player,setPlayer]=useState({
    background:'',
    albumArt:'', 

  })
  const[duration,setDuration]=useState("00:00")
  const[currenttime,setCurrentTime]=useState("00:00")
  const[seekbar,setSeekbar]=useState("0%");
  

  // const intervalFunc=()=>
  // {
  //   console.log(current.currentTime)
  // }
  // const {background,albumArt}=player;
  // const background=player.background
  // const albumArt=player.albumArt

  useEffect(()=>
  {
    axios.get('http://vinayk.epizy.com/index.php').then((res)=>{
      setSongs(res.data)  
         
      
    })
  },[])
  useEffect(()=>
  {
    if(songs)
    { 
      // console.log('setting up the song at '+index)
      
      // setCurrent((current)=>{current.src=songs[index].src});
      current.src=songs[index].src
      
      setPlayer((player)=>{
        return{
          ...player,background:songs[index].image,albumArt:songs[index].image
        }
       
      })      
    }
    //
  },[songs,index])
 
  
  function next()
  {  
    // current.pause()
    
    console.log('next')
    setIndex((index+1)%(songs.length))
    
  
    setTimeout(() => {
      timeduration()
      play()
    }, 1);
    
    
    
    
  }
  function prev()
  {  
    // current.pause()
    console.log('prev')
    if(index>0)
    {
      setIndex((index-1)%(songs.length))
    }
    else{
      setIndex(songs.length-1)
    }
    
  
    setTimeout(() => {
      timeduration()
      play()
    }, 1000);
     
  }  

  function pause()
  {
    
    setPlaying(false)
    current.pause()
    
  }
  function currentTime()
  {
    
    current.ontimeupdate=()=>
    {
    
        var minutes = "0"+parseInt(current.currentTime / 60, 10);
        var seconds = "0"+parseInt(current.currentTime % 60);
        setCurrentTime(minutes + ":" + seconds.slice(-2));
        // console.log(current.currentTime)
        setSeekbar(current.currentTime/current.duration*100+"%")
      if(current.currentTime>=current.duration)
      {
        pause();
      }
    }
  }
  function timeduration()
  {
    setTimeout(() => {
      if (current.readyState > 0) {
        var minutes = "0"+parseInt(current.duration / 60, 10);
        var seconds = "0"+parseInt(current.duration % 60);
        setDuration(minutes + ":" + seconds.slice(-2))
        
      }
      
    }, 1000);
  }
  
   function play()
  { 
    currentTime()
    timeduration()
    setPlaying(true)
     current.play()
     
  }
  
  function timeUpdate(e)
  {
     
      // console.log(e.target.clientWidth,e.nativeEvent.offsetX)
      const seektime=(e.nativeEvent.offsetX/e.target.clientWidth*current.duration);
      current.currentTime=seektime
      console.log(seektime)
  }



  return (
      
    <div id="app-cover">
  <div id="bg-artwork" style={{backgroundImage:player.albumArt?`url(${player.albumArt})`:`url('https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg')`}}/>
  <div id="bg-layer" />
  <div id="player">
    <div id="player-track" className={playing?'active':''}>
      <div id="album-name" >
      {songs&&songs[index].name}
      </div>
      <div id="track-name" >
      {songs&&songs[index].name}
      </div>

      <div id="track-time" className={playing?'active':''}>
        <div id="current-time" >{currenttime}</div>
        <div id="track-length" >{duration}</div>
        
      </div>
      <div id="s-area" onClick={timeUpdate}   >
        <div id="ins-time" />
        <div id="s-hover"  />
        <div id="seek-bar" style={{width:seekbar}} />
      </div>
    </div>
    <div id="player-content" >
      <div id="album-art" className={playing?'active':''}>
        <img src={player.albumArt?player.albumArt:'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg'} className="active" />
       
        <div id="buffer-box"className="active">Buffering ...</div>
      </div>
      <div id="player-controls">
        <div className="control">
          <div className="button" id="play-previous"  onClick={prev}>
            <i className="fas fa-backward"/>
          </div>
        </div>
        <div className="control">
          
          {
            !playing&&<div className="button" id="play-pause-button"  onClick={play} >
            <i className="fas fa-play"></i>
            </div>
          }
          {
            playing&&<div className="button" id="play-pause-button"  onClick={pause} >
            <i className="fas fa-pause"></i>
            </div>
          }
            
         
        </div>
        <div className="control">
          <div className="button" id="play-next" onClick={next}>
            <i className="fas fa-forward" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}
