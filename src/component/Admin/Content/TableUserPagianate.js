import { useEffect,useState } from "react"
import ModalUpdateUser from "./ModalUpdateUser"


import ReactPaginate from "react-paginate";


const items = [...Array(33).keys()];





const TableUserPanigate  = (props) =>{

const {ListUser, HandleClickUpdate, HandleDeleteUser,GetAllUserPage,pageCount} = props

const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    GetAllUserPage(+event.selected+1)
   
  };
console.log("tablepain")
    return(
        <div className="table-user my-3 ms-3">
            <table className="table table-hover table-bordered">
            <thead>
                <tr className="table-primary">
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {ListUser && ListUser.length > 0 && ListUser.map((item, index)=>{
                    return(
                        <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                <button type="button" className="btn btn-primary" >View</button>
                                <button type="button" className="btn btn-secondary mx-3" onClick={() => HandleClickUpdate(item)}>Update</button>
                                <button type="button" className="btn btn-success" onClick={()=> HandleDeleteUser(item.id)}>Delete</button>
                                </td>
                                </tr>
                    )
                    })
                } 
                <tr>
                <th scope="row">3</th>
                <td colspan="4">Larry the Bird</td>
          
                </tr>
            </tbody>
            </table>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
            />
           
        </div>
    )
}
export default TableUserPanigate;