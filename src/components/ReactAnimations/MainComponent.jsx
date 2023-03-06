import { useState } from "react";

import "./MainComponent.css";
import Modal from "./Modal/Modal";
import Backdrop from "./Backdrop/Backdrop";
import List from "./List/List";

import { Transition } from "react-transition-group";

const MainComponent = () =>{

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  const showModal = ()=>{
setModalIsOpen(true);
  }
  const closeModal = ()=>{
    setModalIsOpen(false);
      }

      const showBlockHandler =()=>{
        setShowBlock(!showBlock);
      }
  
    return (
      <div className="App">
        <h1>React Animations</h1>
 <button className="Button" onClick={showBlockHandler}>Toggle</button>
 <br/>
{/* timeout is time from entering to entered state 
OR exiting to exited state */}
 <Transition 
 in={showBlock} 
 timeout={300}
 mountOnEnter //add element to DOM on enter
 unmountOnExit //remove element from DOM on exit
 //six type of events we can listen to
 onEnter={()=>console.log('onEnter')}
 onEntering={()=>console.log('onEntering')}
 onEntered={()=>console.log('onEntered')}
 onExit={()=>console.log('onExit')}
 onExiting={()=>console.log('onExiting')}
 onExited={()=>console.log('onExited')}
 >
  {state => (
      <div style={{
        background:'red',
        width:100,
        height: 100,
        margin: 'auto',
        transition: 'opacity 1s ease-out',
        opacity: state === 'exiting' ? 0 : 1
        
        }}></div>
  )}

{/* state has values entering,entered,exiting,exited  and each value moves to
other based on the time specified in duration*/}


 </Transition>





  <Modal show={modalIsOpen} closed={closeModal} />


       
        {modalIsOpen && <Backdrop show={modalIsOpen}/>}
        <button className="Button" onClick={showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  
}

export default MainComponent;