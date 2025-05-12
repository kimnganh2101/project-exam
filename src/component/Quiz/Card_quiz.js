import React from 'react';
import { Navigate } from 'react-router-dom';

const ListQuiz = () => {
  const navigate = Navigate()
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src="https://via.placeholder.com/150" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        
      </div>
    </div>
  );
};

export default ListQuiz;
