import { Route, Routes } from "react-router-dom"
import Header from "./component/Header"
import Login from "./component/Login"
import Register from "./component/Register"
import PageNotFound from "./component/PageNotFound"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AccountDetail from "./component/AccountDetail"
import ViewAccount from "./component/ViewAccount"

function App() {


  return (
    <> 
        {/* code for toast  */}
       <ToastContainer
             position="top-center"
             autoClose={2000}
             hideProgressBar={true}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss={false}
             draggable
             pauseOnHover={false}
             theme="colored"
             />
          
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/accountdetail" element={<AccountDetail/>}></Route>
        <Route path="/viewaccount" element={<ViewAccount/>}></Route>
        <Route path="/edit/:id" element={<AccountDetail/>}></Route>

        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
