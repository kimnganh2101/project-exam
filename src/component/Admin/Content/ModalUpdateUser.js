import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from "react-icons/io"; 
// import axios from 'axios';
import  axios from '../../../utils/CustomizeAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserService, putUpdatedate } from '../../../service/User';
function ModalUpdateUser(props) {
  const {show, setShow, data, setupdateData,GetUser} = props;
  const handleClose = () => {
    setShow(false);
    setemail("");
    setusername("");
    setpassword("");
    setrole("");
    setupdateData("")
    
  };
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const [img, setimg] = useState("");
  const [preimg, setpreimg] = useState("");
  const [id, setID] = useState("");


  const setState = ()=>{
    setemail(data.email)
    setusername(data.username)
    setpassword(data.password)
    setrole(data.role)
    setID(data.id)
    
    
  }

  const sendData = async()=>{
    let data = await putUpdatedate(id,username, password)
    if(data && data.EC == 0
    )
    {
      toast.success('succes')
      handleClose()
      GetUser();
      
    }
    else {toast.error('khong thanh cong !')};
  
  }

useEffect(()=>{
  setState();
}, [data])


console.log("UpdateTable")
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='xl'
        className='Modal-User'
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row g-3">
            <div className="col-6" >
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" 
                value={email} disabled/>
            </div>
            <div className="col-6">
                <label for="inputPassword4" className="form-label"> UserName</label>
                <input type="text" className="form-control" id="inputPassword4"
                onChange={(event) => setusername(event.target.value)}
                value={username}
                />
            </div>
            <div className="col-6">
                <label for="inputusername" className="form-label">UserName</label>
                <input type="password" className="form-control" id="inputusername" placeholder="UserName"
                onChange={(event) => setpassword(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label for="inputRole" className="form-label">Role</label>
                <select id="inputRole" className="form-select" onChange={(event) => setrole(event.target.value)}>
                <option selected>Choose...</option>
                <option>...</option>
                </select>
            </div>
            <div className="col-md-12 upload ">
                <label for="inputImg" className="form-label label-Upload" htmlFor='inputImg'>     <IoIosAddCircleOutline />      Upload Image</label> 
                <input type="file" className="form-control" id="inputImg" hidden 
                />
            </div>
            <div className="col-md-12 pre-img">
                {
                  preimg?
                  <img src={preimg} alt="img"/>
                  :<span>Upload img</span>
                }
            </div>
            </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendData}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUpdateUser;