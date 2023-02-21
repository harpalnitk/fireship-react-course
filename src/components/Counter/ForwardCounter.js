import useCounter  from '../../hooks/use-counter';

import Card from '../UI/Card/Card';

const ForwardCounter = () => {
  //the state in usecounter will be tied to this component
const counter = useCounter(true);

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
