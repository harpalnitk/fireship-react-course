import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../../hooks/ReactRouterAppPractice/use-http';
import { getAllComments } from '../../../lib/ReactRouterAppPractice/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList';


const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const {quoteId} = params;

  const {sendRequest, status, data:loadedComments, error} = useHttp(getAllComments)

  useEffect(()=>{
    sendRequest(quoteId);
  },[quoteId, sendRequest]);
  
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //use call back used because this function is being 
  //passed as prop to NewCommentForm
  //and there it is being used as a dependency
  const addedCommentHandler=useCallback(()=>{
    //add logic for fetching comments again when a new comment is added
    sendRequest(quoteId);
  },[quoteId,sendRequest]);

  let comments;

  if(status === 'pending'){
    comments = (<div className='centered'>
      <LoadingSpinner/>
      </div>);
  }
  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
  comments = <CommentsList comments={loadedComments}/>
  }
  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No comments added yet!</p>
    }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && 
      <NewCommentForm 
      quoteId={quoteId} 
      onAddedComment={addedCommentHandler}
      />
      }
      {comments}
    </section>
  );
};

export default Comments;
