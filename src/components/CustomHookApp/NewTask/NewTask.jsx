import Section from '../../UI/Section/Section';
import TaskForm from './TaskForm';
import useFirebaseRealtimeDatabase from '../../../hooks/use-firebase-realtime-database';

//! https://console.firebase.google.com/project/fireship-blog-react-firebase/database/fireship-blog-react-firebase-default-rtdb/rules
//! Change security rules at above URL first
const NewTask = (props) => {
  const {isLoading, error, sendRequest: addTaskRequest} = 
  useFirebaseRealtimeDatabase();

  const createTask = (taskText, taskData)=>{
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }
  
  const enterTaskHandler = async (taskText) => {
    addTaskRequest({
      url: 'https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/tasks.json',
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:{ text: taskText }
    },createTask.bind(null,taskText))//bind method helps us to pre configure the function in advance
    //i.e. set the data which it will receive as argument when executed
   //null is for this keyword, second argument is the first argument that will be
   //received when this function is executed
   //any other arguments which will be passed from the place 
   // where function is executed will be appended to the end of parameter list
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
