import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../../UI/Card/Card';
import MealItem from './Mealtem/MealItem';


const AvailableMeals = (props) => {
const [meals, setMeals] = useState([]);
const [isLoading,setLoading]= useState(true);
const [httpError,setHttpError]= useState();


  useEffect(()=>{
    const fetchMeals = async () => {
     
      const res = await fetch('https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/meals.json')
      
      if(!res.ok){
        throw new Error('Something went wrong!');
      }
      
      const data = await res.json();
      const loadedMeals = [];
      for(const key in data){
        loadedMeals.push({
          id:key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    
    //WILL NOT WORK AS ERROR THROWN IS A PROMISE SINCE IT IS THROWN
    //FROM AN ASYNC FUNCTION
  //  try {
  //    fetchMeals();
  //  } catch (error) {
  //   setLoading(false);
  //   setHttpError(error.message)
  //  }

  fetchMeals().catch(error=>{
        setLoading(false);
    setHttpError(error.message)
  });


},[]);

if(isLoading){
  return <section className={classes['meals-loading']}>
    <p>Loading...</p>
  </section>
}

if(httpError){
  return <section className={classes['meals-error']}>
    <p>{httpError}</p>
  </section>
}


    const mealsList = meals.map(meal => 
    <MealItem 
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />);
     return (
         <section className={classes.meals}>
           <Card>
           <ul>
                {mealsList}
            </ul>
           </Card>

         </section>
     );
        }


export default AvailableMeals;