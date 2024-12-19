
import React,{ useState }  from 'react';
//https://stackoverflow.com/questions/69843615/switch-is-not-exported-from-react-router-dom
//https://www.w3schools.com/react/react_router.asp
import { BrowserRouter as Router,   Routes,Route, Link } from "react-router-dom";
import IncEditor from './../IncEditor';
import { ComboBox } from './../ComboBox';
import NormalForm from './NormalForm';
import RegistrationForm from './RegistrationForm'; // Adjust the path as needed
import {formSchema} from './../utils/formschema';
import DynamicForm from './DynamicForm';

const Navigation = () => {
 const setDescription = (e: any) => {
        console.log('react rtf');
       };

const [comboBox] = useState<any | null>(null);
const handleFormSubmit = (data: any) => {
    console.log('Form Data:', data);
  };
return (
    <div className="navigation-links">
    <Router>
        <h1>Navigation Links</h1>
   <nav>
     <ul>
       <li>
         <Link to="/">Home</Link>
       </li>
       <li>
         <Link to="/user-registration">User Registration</Link>
       </li>
       <li>
         <Link to="/big-form">Dynamic form</Link>
       </li>
       <li>
         <Link to="/editor">Editor</Link>
       </li>
       <li>
         <Link to="/combo-box">ComboBox</Link>
       </li>
       <li>
         <Link to="/normal-form">Normal form</Link>
       </li>
     </ul>
   </nav>

   <Routes>
     <Route path="/"  element={<DynamicForm schema={formSchema} onSubmit={handleFormSubmit} />} />
     <Route path="/editor" element={<IncEditor  id={'modal'}
    placeholder={'Describe your your solution in detail.'}
    value="description"
    onChange={setDescription}/>} />
     <Route path="/combo-box" element={<ComboBox  value={comboBox}
        allowInput={'true'}
        label="Album:"/>} />
     <Route path="/normal-form"  element={<NormalForm/>} />
     <Route path="/user-registration"  element={<RegistrationForm/>} />
     <Route path="/big-form"  element={<DynamicForm schema={formSchema} onSubmit={handleFormSubmit} />} />
   </Routes>
 </Router>
    </div>
  );
};

export default Navigation;
