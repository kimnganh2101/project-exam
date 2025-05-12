import { useEffect, useState } from "react";
import { GetQuizByUser } from "../service/User";
 import { useNavigate } from 'react-router-dom';

const User = (props) => {
  const [getQuiz, setGetQuiz] = useState([])
  const navigate = useNavigate()

  const getQuizData = async () => {
      const res = await GetQuizByUser();
    console.log("res", res)
    
      if (res && res.EC === 0) {
        setGetQuiz(res.DT)
      }
      
    }
    useEffect(() => {
        getQuizData();
    
},[])
console.log("getQuiz", getQuiz)
  return (

    <div className="list-card-container">
      {
        getQuiz && getQuiz.map((item, index) => {
          return ( 
            <div className="card" style={{ width: "18rem" }}>
              <div>
                {index}
              </div>
               <img
                className="card-img-top"
                src={props.image || "https://via.placeholder.com/150"}
                alt="Card image cap"
              /> 
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">
                  {item.description}
                </p>
                <button  className="btn btn-primary" onClick = {()=> navigate(`/user/${item.id}`,{ state: { title:item } })} >Go somewhere</button>
              </div>
            </div>
          )
          
        })
      }
    </div>
    
  );
};

export default User;
