import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './List.css';

const List = () => {
  
    const [items,setItems] = useState([1, 2, 3]);

 
    const addItemHandler = () => {
        // this.setState((prevState) => {
        //     return {
        //         items: prevState.items.concat(prevState.items.length + 1)
        //     };
        // });

        setItems(items.concat(items.length + 1))
    }

    const removeItemHandler = (selIndex) => {
        // this.setState((prevState) => {
        //     return {
        //         items: prevState.items.filter((item, index) => index !== selIndex)
        //     };
        // });
        const newItems = items.filter((item, index) => index !== selIndex);

        
       setItems(newItems);
    }

    
        const listItems = items.map( (item, index) => {
            return (
// in property is automatically set by Transition Group whenever an item 
// is added or removed

            <CSSTransition key={index}
            classNames='fade'
            timeout={300}>
            <li 
                className="ListItem" 
                onClick={()=>removeItemHandler(index)}>{item}</li>
            </CSSTransition>
            
)
        }

    );

        return (
            <div>
                <button className="Button" onClick={addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                <TransitionGroup component="ul" className="List">
                {listItems}
                </TransitionGroup>
                {/* <ul className="List">
                   
                </ul> */}
            </div>
        );
    
}

export default List;