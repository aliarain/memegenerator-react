import React, {useState, useEffect} from 'react';
import './App.css';
import { Meme } from './components/Meme';
import { async } from 'q';
export default App;

const objectToQueryParam =(obj) =>{
const params =  Object.entries(obj).map(([key , value])=>  `${key}=${value}`)
  return '?' + params.join('&')
} 


function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");



 useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);
  return (
    <div 
    style={{ textAlign:"center" }}>

      {template && (

      <form onSubmit={async e =>{
        e.preventDefalut();
        const params = {
          template_id: template.id,
          text0: topText,
          text1: bottomText,
          username: 'aliarain' ,
          password: ' aliarain123@' 

        }
        const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(
          params)}`
        );

        const data = await response.json()
        console.log(data);
      }}>
         {/* Input Logic Here */}
       <Meme template={template } />
       <input placeholder="Top Text" value={topText}
       onChange={e => setTopText(e.target.value)}/>
       <input placeholder="Bottom Text"
       value={bottomText}
       onChange={e => setBottomText(e.target.value)} />
       <button type="submit">Create Meme!</button>
       </form>
       
       )}
      {!template &&

      (
        <>
        <h1>Pick The Template:</h1>
        {templates.map(template =>{
        return (
          <Meme
          template={template}
          onClick={()=>{
            setTemplate(template);
          }}
          />
        );
      })}
      </>
      )

      }

    </div>
  )
    }