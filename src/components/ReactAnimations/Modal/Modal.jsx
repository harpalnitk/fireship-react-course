import React from 'react';
import { Transition, CSSTransition } from 'react-transition-group';

import './Modal.css';

const animationTiming= {
    enter: 400,
    exit: 1000
}

const Modal = (props) => {
  const cssClasses = [
    `Modal`,
    
  ];

  return (
//     <Transition 
// in={props.show} 
// timeout={animationTiming} // or use timeout={300} which means both enter and exit will have 300ms duration
// mountOnEnter //add element to DOM on enter
// unmountOnExit //remove element from DOM on exit
// >
//     {state=>{
    
//     const cssClasses = ['Modal', state=== 'entering' 
//                                  ? 'ModalOpen' 
//                                  : state === 'exiting'
//                                  ? 'ModalClosed'
//                                  :null
// ]
//     return(<div className={cssClasses.join(' ')}>
//     <h1>A Modal</h1>
//     <button className='Button' onClick={props.closed}>
//       Dismiss
//     </button>
//   </div>)
    

//     }}

//     </Transition>


<CSSTransition 
in={props.show} 
timeout={animationTiming} // or use timeout={300} which means both enter and exit will have 300ms duration
mountOnEnter //add element to DOM on enter
unmountOnExit //remove element from DOM on exit
classNames="fade-slide">
    {/* fade-slide,fade-slide-enter,fade-slide-enter-active,fade-slide-exit,fade-slide-exit-active  */}
 {/* or use {{
    enter:'',
    enterActive:'ModalOpen',
    exit:'',
    exitActive:'ModalClosed'
 }} */}
    <div className="Modal">
    <h1>A Modal</h1>
    <button className='Button' onClick={props.closed}>
      Dismiss
    </button>
  </div>
    

   

    </CSSTransition>

  );
};

export default Modal;
