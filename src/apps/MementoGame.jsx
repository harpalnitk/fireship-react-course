import { useState, useEffect } from "react";
import shuffle from "../utilities/shuffle";
import Card from "../components/GameCard";
import Header from '../components/Header';
import './MementoGame.css';


export default function MementoGame(){
// shuffle will return random duplicate array of 8*2=16 pictures
    const [cards, setCards] = useState(shuffle);// cards arra from /public/assets folder
   //for tracking two successive clicks by user
    const [pickOne, setPickOne] = useState(null); // First selection
    const [pickTwo, setPickTwo] = useState(null); // Second selection
    //To add slight delay to the application and 
    //disable the UI for short time
    //so that user does not click everything in a short span of time
    const [disabled, setDisabled] = useState(false); // Delay handler
   // const [setBadge, clearBadge] = useAppBadge(); // Handles app badge
    //inremented by 1 everytime user wins a game
    const [wins, setWins] = useState(0); // Win streak


  // Handle card selection
  //One click handler handles both the clicks
  const handleClick = (card) => {
    if (!disabled) {
        //if pickOne is set we setPick two else PickOne
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

//when two succesive clicks have finished it's one turn
  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

    // Start over
    const handleNewGame = () => {
        setWins(0);
      //  clearBadge();
        handleTurn();
        setCards(shuffle);
      };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              //both selected cards, if matching will
              //have their matched property set
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, wins]);



    // If player has found all matches, handle accordingly
    useEffect(() => {
        // Check for any remaining card matches
        const checkWin = cards.filter((card) => !card.matched);
    
        // All matches made, handle win/badge counters
        if (cards.length && checkWin.length < 1) {
          console.log('You win!');
          setWins(wins + 1);
        //  setBadge();
          handleTurn();
          //shuffle the cards again
          setCards(shuffle);
        }
      }, [cards, wins]);




    return (
        <main className='mementoGame'>
    <Header handleNewGame={handleNewGame} wins={wins} />
       
        <div className='grid'>
            {cards.map((card)=>{
            const {image,id,matched} = card;

            return(
                <Card key={id}
                image={image}
                // a card will be considered selected if equals pick one 
                //or pick two or matched, if true it will apply selected 
                //css class to the card
                selected={card === pickOne || card === pickTwo || matched}
                onClick={()=>{handleClick(card)}}>

                </Card>
            )

            })}

        </div>
        </main>

    );
}

