import { createBrowserRouter , RouterProvider } from 'react-router-dom';

import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRouter from './Component/PrivateRouter';


function App() {

  const routerContainer = createBrowserRouter([
    {path : '/' , element: <PrivateRouter/> , children:[
      {index : true , element: <Home/>},
    ]},
    {path : '/login' , element : <Login/>} ,
    {path : '/register' , element : <Register/>}
  ])

  return (
    <>
      <RouterProvider router={routerContainer}/>
    </>
  )
}

export default App;
