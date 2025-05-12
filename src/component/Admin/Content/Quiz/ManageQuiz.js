import { useState } from "react";
import Select from 'react-select';
import { postCreateNewQuiz } from "../../../../service/User";
import { toast } from "react-toastify";
const ManagerQuiz = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("EASY")
    const [image, setimage] = useState(null)
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        ];
    const handleChangeImage = (event) => {
        // setType(event.target.value)
        console.log("event", event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            setimage(event.target.files[0])
        }
    }
    
    const handlesave = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName("")
            setDescription("")
            setimage(null)

        } else {
            toast.error(res.EM)
        }
    }


    return (
        <div>
       
                <fieldset className="border rounded-3 p-2 mx-5">
                <legend className="float-none w-auto">Add new Quiz</legend>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control"  placeholder="Name" value={name} onChange={(event)=>setName(event.target.value)}/>
                    <label htmlFor ="floatingInput">Email address</label>
                </div>
                <div className="form-floating my-3">
                        <input type="text" className="form-control" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                    <label htmlFor ="floatingInput">Description</label>
                </div>
                    <div className="more-action my-3 ">
                        <div>
                            <label htmlFor ="formFileLg" className="form-label">Large file input example</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(event) => { handleChangeImage(event) }} />
                        </div>

                        <Select className="my-3"
                            aria-label="Default select example"
                            onChange={setType}
                            defaultValue={type}
                            options={options}
                            />
                        
                    </div>
                    <button className="btn btn-warning" onClick={handlesave}>
                        Save 
                    </button>
            </fieldset>
           
        </div>
);
                                
};
export default ManagerQuiz;