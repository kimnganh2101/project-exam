import { useState } from "react";
import Select from 'react-select';
import "../Question/Question.scss"
import { v4 as uuidv4 } from 'uuid';
import { CiCirclePlus } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import _ from "lodash";
import { useEffect } from "react";
import { GetAllQuiz, postanswerforAdmin, postquestionforAdmin } from "@/service/User";
import { toast } from "react-toastify";

const Question = () => {
    const [dataQuiz, setDataQuiz] = useState([])
    useEffect (() => {
        ListQuiz()
    }, [])
    const [selectQuiz, setSelectQuiz] = useState()
    const [questions, setquestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: null,
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    descripton: '',
                    iscorrect: false
                },
            ],
        }
    ])
    const handleAddRemoveQuestion = (type, id) => {
        if (type == "ADD") {
            console.log("id", id)
            const newQuestion = {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    descripton: '',
                    iscorrect: false
                }
            ],
        }
        setquestions([...questions, newQuestion])
        }
        if (type === "REMOVE") {
            setquestions(questions =>questions.filter(item => item.id !== id))
        }
    }
    const handleAddRemoveAnswer = (type, questionid, answerId) => {
        let questClone = _.cloneDeep(questions)
        if (type === "ADD") {
            const newAnsewer = {
                    id: uuidv4(),
                    descripton: '',
                    iscorrect: false
            }
            const index = questClone.findIndex(item => item.id === questionid)
            questClone[index].answers.push(newAnsewer)
            setquestions(questClone)
        }
        if (type === "REMOVE") {
            console.log("isss", answerId)
            const index = questClone.findIndex(item => item.id === questionid);
            questClone[index].answers = questClone[index].answers.filter(item => item.id !== answerId)
            setquestions(questClone)
        }
    }
    const handleOnchange = (type, value, questionid, answerId) => {
        let questClone = _.cloneDeep(questions);
        const index = questClone.findIndex(item => item.id === questionid);
        if (index > -1) {
            if (type === "questions") {
                questClone[index].description = value
                setquestions(questClone);
            }
            if (type === "answers") {
                let ansewerIndex = questClone[index].answers.findIndex(item => item.id === answerId)
                questClone[index].answers[ansewerIndex].descripton = value
                setquestions(questClone)
            }
            if (type === "checkbox") {
                let ansewerIndex = questClone[index].answers.findIndex(item => item.id === answerId)
                questClone[index].answers[ansewerIndex].iscorrect = value
                setquestions(questClone)
            }
            
        }
    }

    const handleChangFileQuestion = (event, questionid) => {
        let questClone = _.cloneDeep(questions)
        const index = questClone.findIndex(item => item.id === questionid);
        if (event.target && event.target.files && event.target.files[0]) {
            questClone[index].imageFile = event.target.files[0]
            questClone[index].imageName = event.target.files[0].name  
            setquestions(questClone)
        }
    }
    const ListQuiz = async() => {
        let res = await GetAllQuiz();
        console.log("data", res.DT[0].name)
        if (res && res.EC === 0) {
            let newListSelect = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setDataQuiz(newListSelect)
        }
    }
    const handleSave = async () => {
        validateSSelectQuestion();
        validateQuestion();
        await Promise.all( questions.map(async (item) =>
        {
            const q = await postquestionforAdmin(
                +selectQuiz.value,
                questions.description,
                questions.imageFile)
            await Promise.all(item.answers.map(async(itemanswer) =>
            {
                const a = await postanswerforAdmin(itemanswer.descripton, itemanswer.iscorrect, q.DT.id)
            }))
        })
    )
    }

    const validateSSelectQuestion = () => {
        if (_.isEmpty(selectQuiz))
        {
            toast.error("not select")
            return;
        }
    }
    const validateQuestion = () => {
        let ischeck = false;
        let indexQ = 0;
        let indexA = 0;
        let iscorrectanswer = 0;
        for (let i = 0; i < questions.length; i++){
            if (!questions[i].description) {
                toast.error(`not question ${i}` )
                ischeck = true
                indexQ = i
                break;
            }
                for (let j = 0; j < questions[i].answers.length; j++){
                    if (!questions[i].answers[j].descripton ) {
                        toast.error(`not question ${i + 1} answer ${j + 1}`)
                        ischeck = true
                        indexA = j;
                        break;
                    }
                    if (questions[i].answers[j].iscorrect === true) {
                        iscorrectanswer++;
                    }
            }
            if (ischeck === true || iscorrectanswer === 0) {
                toast.error("chua co dap an dung")
                break;
            }
        }
    }

console.log("ques", selectQuiz)
    return (
        <div className="q-contain">
            <div className="title">
                Manage Question
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select quiz</label>
                    <Select
                        value={selectQuiz}
                        onChange={setSelectQuiz}
                        options={dataQuiz}
                        className="form-control"
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    />
                </div>
                <div className="mt-3 mb-2">
                    Add questions:
                </div>
                    {
                        questions && questions.length > 0 && questions.map((questions, index) => {
                            return (
                                <div key={questions.id} className="q-main mb-10">
                                    <div className="question-content ">
                                        <div className="form-floating description col-6">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Description"
                                                value={questions.description}
                                                onChange={(event)=>handleOnchange("questions",event.target.value, questions.id)}

                                            />
                                            <label htmlFor="floatingInput">questions { index +1}</label>
                                        </div>
                                        <div className="group-upload " >
                                            <label
                                                className="label-up"
                                                htmlFor={questions.id}
                                            >
                                                <LuImagePlus className="label-up"/>
                                            </label>
                                            <input
                                                id={questions.id}
                                                type={'file'} hidden
                                                onChange={(event)=>handleChangFileQuestion(event, questions.id)}
                                            />
                                            <span >{questions.imageName ? questions.imageName : "0 file is updated"}</span>
                                            <div className="icon-add" onClick={()=>handleAddRemoveQuestion("ADD",'')}>
                                                <span>
                                                    <CiCirclePlus />
                                                </span>
                                            </div>
                                            {
                                                index > 0 &&
                                                <div className="icon-remove" onClick={()=>handleAddRemoveQuestion("REMOVE", questions.id)}>
                                                    <span>
                                                        <FiMinusCircle />
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {
                                        questions.answers && questions.answers.length > 0 && questions.answers.map((answers, index) => {
                                            return (
                                                <div key={answers.id} className="ansewer-content">
                                                    <input
                                                        className="form-check-input iscorrect "
                                                        type="checkbox"
                                                        value={answers.iscorrect}
                                                        onChange={(event)=>handleOnchange("checkbox", event.target.checked, questions.id, answers.id)}
                                                    />
                                                    <div className="form-floating description answer-name">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={answers.descripton}
                                                            placeholder="Description"
                                                            onChange={(event)=>handleOnchange("answers",event.target.value, questions.id, answers.id)}
                                                        />
                                                        <label >ansewer {index+1} </label>
                                                    </div>
                                                    <div className="icon-add" onClick={()=>handleAddRemoveAnswer("ADD", questions.id,'')}>
                                                        <FaSquarePlus />
                                                    </div>
                                                    {
                                                        questions.answers.length > 1 &&
                                                        <div className="icon-remove" onClick={()=>handleAddRemoveAnswer("REMOVE", questions.id,answers.id)}>
                                                        <FiMinusCircle />
                                                    </div>
                                                    }
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
            </div>
            <div>
                <button className="btn-save mt-5" onClick={()=>handleSave()}>
                    save 
                </button>
            </div>
            </div>
    )
}
export default Question;
