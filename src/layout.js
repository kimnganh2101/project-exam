import {
  BrowserRouter,
  Route, 
  Routes,
} from "react-router-dom";
import App from './App';
import User from './component/User';
import Admin from './component/Admin/admin';
import Homepage from './component/Homepage/Homepage';
import Login from './component/Admin/Content/Login';
import Aside from './component/Sidebar/Aside';
import ManagerUser from './component/Admin/Content/ManagerUser';
import { ToastContainer, toast } from "react-toastify";
import QuizDetail from "./component/Quiz/QuizDetail";
import NewUser from "./component/NewUser";
import ManagerQuiz from "./component/Admin/Content/Quiz/ManageQuiz";
import ListQuestion from "./component/Quiz/ListQuestion";
import Question from "./component/Admin/Content/Quiz/Question/Question";

const Layout = () => {
    return (
        <>
          <Routes>
              <Route path='/' element = {<App/>}>
                  <Route index element = {<Homepage/>}/>
                  <Route path='/user' element = {<NewUser/>}/>
          </Route>
         
          <Route path="/user/:id" element = {<QuizDetail/>}/>
          <Route path='/admin' element = {<Admin/>}>                 
            <Route path='manager' element={<ManagerUser />} />
            <Route path='manager/quiz' element={<ManagerQuiz />} />
            <Route path='manager-question' element={<Question />} />

                
          </Route>
          <Route path='/login' element = {<Login/>}>
          </Route>
          </Routes>       
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        </>
    )
}

export default Layout;