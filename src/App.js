import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);


useEffect(() => {
  fetch('https://api.imgflip.com/get_memes').then(x =>
   x.json().then(response => setTemplates( response.data.memes))
   );

}, []);





  return <div style={{ textAlign: "center" }}>
 
 
  {!template &&
   templates.map(templates=>{
      return(
        <img 
        style={{width: 200}}
         key={templates.id } 
         src={templates.url}
         alt={templates.name}
         onClick={() =>{
           setTemplate(template);
         }}
         />
      )
    })}
      </div>;  
}

export default App;

