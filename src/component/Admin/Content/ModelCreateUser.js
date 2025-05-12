import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from "react-icons/io"; 
// import axios from 'axios';
import  axios from '../../../utils/CustomizeAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserService } from '../../../service/User';
function ModalCreateUser(props) {
  const {show, setShow, GetUser} = props;
  const handleClose = () => {
    setShow(false);
    setemail("");
    setusername("");
    setpassword("");
    setrole("");
    setimg("");
    setpreimg("");

  };
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("USER");
  const [image, setimg] = useState("");
  const [preimg, setpreimg] = useState("");
 
  const handleChangeImage = (event) => {
    {
      if(event&& event.target && event.target.files)
      {
        setpreimg(URL.createObjectURL(event.target.files[0]));
        setimg(event.target.files[0])
        
      }
      else{
        setpreimg("");
      }
      
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const createUser = async()=>{
    let checkemail = validateEmail(email)
    if(!checkemail)
    {
      toast.error('Error Notification !');
      return;
    }
  
    let data = await createUserService(email, username, password, role, image );
    if(data && data.EC == 0
    )
    {
      toast.success('succes')
      handleClose()
      GetUser();
      
    }
    else {toast.error('khong thanh congg !')};
  }
console.log('modelcreate')
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
                onChange={(event) => setemail(event.target.value)}
                />
            </div>
            
            <div className="col-6">
                <label for="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4"
                onChange={(event) =>setpassword(event.target.value)}
                />
            </div>
            <div className="col-6">
                <label for="inputusername" className="form-label">UserName</label>
                <input type="text" className="form-control" id="inputusername" placeholder="UserName"
                onChange={(event) => setusername(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label  className="form-label">Role</label>
                <select 
                id="inputRole" 
                className="form-select" 
                // value={role}
                onChange={(event) => setrole(event.target.value)}>
                <option selected>Choose...</option>
                <option>ADMIN</option>
                <option>USER</option>
                </select>
            </div>
            <div className="col-md-12 upload ">
                <label className="form-label label-Upload" htmlFor='labelUpload'>     <IoIosAddCircleOutline />      Upload Image</label> 
                <input 
                type="file" 
                id="labelUpload" hidden 
                onChange={(event)=>handleChangeImage(event)}
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
          <Button variant="primary" onClick={createUser}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalCreateUser;