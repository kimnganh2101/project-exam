import { useState } from "react"
import ModalUpdateUser from "./ModalUpdateUser"
const TableUser  = (props) =>{
const {ListUser, HandleClickUpdate, HandleDeleteUser} = props

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
            
        </div>
    )
}
export default TableUser;