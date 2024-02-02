import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<NotesListPage />}/>
      <Route path="/note/:id" element={<NotePage/>}/>
    </Route>
  )
);


function App() {
  return (
      <div className="container dark">
        <div className='app'>
          <Header />
          <RouterProvider router={router} />

        </div>
        
      </div>
  );
}

export default App;
