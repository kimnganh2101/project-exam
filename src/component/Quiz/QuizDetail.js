import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GetQuestionByIdQuiz, postSubmitQuiz } from "../../service/User";
import './QuizDetail.scss'
import _ from 'lodash'
import Question from "./ListQuestion";
import Modalresult from "./Modalresult";
const QuizDetail = (props) => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const param = useParams();
    const quizId = param.id;
    const { state } = useLocation();
    const { title } = state;
    const [showModalResult, setshowModalResult] = useState(false);
    const [ dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        getQuizBYId();
    }, [quizId])

    const getQuizBYId = async () => {
        const Quiz = await GetQuestionByIdQuiz(quizId)
        console.log("quiz", Quiz)
        if (Quiz && Quiz.EC === 0) {
            let data = _.chain(Quiz.DT)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map(
                    (value, key) => {
                        let answer = [];
                        let questionDescription, image= null;
                        value.forEach((item, index) => {
                            if (index === 0) {
                                questionDescription = item.description;
                                image = item.image;
                            }
                            item.answers.isSelected = false
                            answer.push(item.answers)
                            console.log("answer", item.answer)
                        })
                        return { questionId: key, answer, questionDescription, image}
                    }
                )
                .value();
            setDataQuiz(data)
           
        }
    }
    const handleNext = () => {
        if(dataQuiz && dataQuiz.length > index +1){
                setIndex(index+1)
            }
    }
    const handlePrev = () => {
        {
            if (index - 1 < 0) return;
            setIndex(index-1)
        } 
    }
    const handleCheckbox = (questionId, answerId) => {
        const cloneDataQuiz = _.cloneDeep(dataQuiz)
        let question = cloneDataQuiz.find(item => +item.questionId === +questionId) // tim cau hoi da tick checkbox
        if (question && question.answer) { // tim cau tra loi 
           let b =  question.answer.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
               }
                else {
                    item.isSelected = false
               }
               return item;
           })
            question.answer = b;      
        }
        let index = cloneDataQuiz.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            cloneDataQuiz[index] = question;
            setDataQuiz(cloneDataQuiz)
        }
    }
    const handleFinishQuiz = async() => {
        console.log("quizdata", dataQuiz)
        let payload = {
            quizId: quizId,
            answers: []               
        }
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId
                let userAnswerId = []
                question.answer.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId

                })
            })
        }
        payload.answers = answers;
        console.log("payload", payload)
        let res = await postSubmitQuiz(payload)
        console.log("res", res)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal
            })
           setshowModalResult(true)
        }

    }
    

    return (
        <div className="detail-quiz-contain">
            <div className="left-content ">
                <div className="title">
                    Quiz {title.id} : {title.description}
                </div>
                <hr/>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-contain">
                    <Question
                        index={index}
                        handleCheckbox = {handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-primary mr-3" onClick={()=>handlePrev()}> prev</button>
                    <button className="btn btn-secondary mr-3" onClick={() => handleNext()}>next</button>
                    <button className="btn btn-success mr-3" onClick={()=>handleFinishQuiz()}>Finish</button>
                    </div>
            </div>
            <div className="right-content">
                right
            </div>

            <Modalresult
                show={showModalResult}
                setshow={setshowModalResult}
                dataModalResult= {dataModalResult}
            
            />
        </div>
    )
}
export default QuizDetail;