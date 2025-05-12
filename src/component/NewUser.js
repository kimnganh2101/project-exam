import { useEffect, useState } from "react";
import { GetQuizByUser } from "../service/User";
import { useNavigate } from 'react-router-dom';
import '../component/NewUser.scss'
 
const NewUser = (props) => {
     const [getQuiz, setGetQuiz] = useState([])
    const navigate = useNavigate()

  const getQuizData = async () => {
    const res = await GetQuizByUser();
    
    
      if (res && res.EC === 0) {
        setGetQuiz(res.DT)
      }
      
    }
    useEffect(() => {
        getQuizData();
    
    }, [])
  console.log("getQuiz", getQuiz)
    return (
      <div className="card-ListQuiz">
        {getQuiz && getQuiz.map((item, index) => {
          return (
            <div className="card">
            <img className="card-img-top " src={`data:image/jpeg;base64,${item.image}`}/>
                <div className="card-body">
                <h5 className="card-title"> {item.name}</h5>
                <p className="card-text"></p>
                 <button className="btn btn-primary" onClick = {()=> navigate(`/user/${item.id}`,{ state: { title:getQuiz } })} >Go somewhere</button>
            </div>
          </div>
          )
        })}
           
      </div>
        
        
        
    )
}
export default NewUser;