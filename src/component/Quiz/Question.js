import QuizDetail from "./QuizDetail"

const Question = (props) => {
    const { data, index } = props;
    console.log("da", data)
    
    console.log("index", index)
    const HandlehandleCheckbox = (event,questionId, answerId) => {
        console.log(answerId, +questionId)
        props.handleCheckbox(questionId, answerId)
        
    }

    return (
        <div className="q-child-content">
            <div className="q-image">
                <img src={`data:image/jpeg;base64,${data.image}`}/>
            </div>
            <div className="question">
                Question {index +1}: {data.questionDescription}
            </div>

            <div className="answer">
                {
                    data.answer && data.answer.length > 0 && data.answer.map((a, index) => {
                        return (
                            
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked= {a.isSelected}
                                        onClick={(event) => HandlehandleCheckbox(event, data.questionId, a.id)} />
                                    <label className="form-check-label" >
                                        {a.description} 
                                    </label> 
                                </div>  
                                
                            </div>
                        )
                    })
                }
            </div>
                
            </div>
    )
}
export default Question;