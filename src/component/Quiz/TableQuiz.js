import { useEffect, useState } from "react";
import { GetAllQuiz } from "../../service/User";
import Accordion from 'react-bootstrap/Accordion';
import "../Quiz/TableQuiz.scss"
const TableQuiz = (props) => {
    const [dataQuiz, setDataQuiz] = useState([])
    useEffect (() => {
        ListQuiz()
    }, [])

    const ListQuiz = async() => {
        let res = await GetAllQuiz();
        console.log("ressss", res)
        if (res && res.EC === 0 ) {
            setDataQuiz(res.DT)
        }
    }
    console.log("dataQuiz", dataQuiz)
    return (
       
            <table className="table table-hover table-bordered mt-5 ">
            <thead>
                <tr>
                        <th scope="col">ID </th>
                        <th scope="col">Name </th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
                <tbody>
                    {
                        dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-warning">
                                            Edit
                                        </button>
                                        <button className="btn btn-primary">
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            )
                            
                        })
                    }
            </tbody>
            </table>
        
    )
}
export default TableQuiz;