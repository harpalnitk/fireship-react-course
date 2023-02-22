import React, { useEffect, useState, useCallback } from 'react';

import Tasks from '../components/CustomHookApp/Tasks/Tasks';
import NewTask from '../components/CustomHookApp/NewTask/NewTask';
import useFirebaseRealtimeDatabase from '../hooks/use-firebase-realtime-database';

function CustomHookApp() {

  const [tasks, setTasks] = useState([]);



  
  const {isLoading, error, sendRequest: fetchTasks} = 
  useFirebaseRealtimeDatabase();


// adding fetchTasks as dependency will create infinite loop
  useEffect(() => {
    const transformTasks = taskObj =>{
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
  // state updating function is guranteed to never change
  //and as such doesn't need to be added to dependency array
      setTasks(loadedTasks);
    };

    fetchTasks(
    {url: 'https://fireship-blog-react-firebase-default-rtdb.firebaseio.com/tasks.json'},
    transformTasks);
  }, [fetchTasks]); //fetch task function since being used as dependency should be memoized
  //using useCallback

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default CustomHookApp;