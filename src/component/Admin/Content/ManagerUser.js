import { useState, useEffect } from "react";
import ModalCreateUser from "./ModelCreateUser";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import {
  deleteUser,
  GetAllUser,
  GetAllUserPaginate,
  putUpdatedate,
} from "../../../service/User";
import ModalUpdateUser from "./ModalUpdateUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUserPaginate from "./TableUserPagianate";

const ManagerUser = () => {
  const [showModal, setshowModal] = useState(false);
  const [ListUser, setListUser] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [data, setupdateData] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const limit = 2;
  

  useEffect(() => {
    GetAllUserPage(1);
  }, []);

  const HandleClickUpdate = (data) => {
    setShowUpdate(true);
    setupdateData(data);
  };
  const HandleDeleteUser = async (id) => {
    let data = await deleteUser(id);
    if (data && data.EC == 0) {
      toast.success("succes");
      GetUser();
    } else {
      toast.error("khong thanh cong !");
    }
  };
  
  const GetUser = async () => {
    let data = await GetAllUser();
    if (data.EC == 0) {
      setListUser(data.DT);
    }
  };

  const GetAllUserPage = async (page) => {
    let data = await GetAllUserPaginate(page, limit);
    if (data.EC == 0) {
      console.log(data.DT);
      setListUser(data.DT.users);
      setPageCount(data.DT.totalPages)
    }
  };

  return (
    <div className="manager-user-container">
      <div className="title">ManagerUser</div>
      <div className="user-contain">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setshowModal(true)}
          >
            <FcPlus /> Add New User
          </button>
        </div>
        <div className="table-user">
          <TableUserPaginate
            ListUser={ListUser}
            HandleClickUpdate={HandleClickUpdate}
            HandleDeleteUser={HandleDeleteUser}
            GetAllUserPage={GetAllUserPage}
            pageCount={pageCount}
          />
        </div>
        <ModalCreateUser
          show={showModal}
          setShow={setshowModal}
          GetUser={GetUser}
        />
        <ModalUpdateUser
          show={showUpdate}
          setShow={setShowUpdate}
          data={data}
          setupdateData={setupdateData}
          GetUser={GetUser}
        />
      </div>
    </div>
  );
};
export default ManagerUser;
