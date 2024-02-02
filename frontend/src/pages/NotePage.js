import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const sleep = ms => new Promise(r => setTimeout(r, ms));

const NotePage = () => {
    let { id } = useParams();
    let[note,setNote] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>
    {
        getNote()
    }, [id]);

    let getNote = async ()=> {
        if (id === 'new') return;
        let response = await fetch(`/api/notes/${id}/`);
        let data = await response.json();
        setNote(data);
    }

    let updateNote = async() =>{
        
        fetch(`/api/notes/${id}/update/`,
        {   method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
    });
        
    }

    let createNote = async() =>{
        fetch(`/api/notes/create/`,
        {   method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
    });
        
    }

    let handleUpdate = async ()=>
    {
        
        
        if(id !== 'new' && !note.body)
        {
            
            deleteNote();
            await sleep(300)
            navigate('/');
            
        }
        else if(id !== 'new')
        {
            
            updateNote();
            await sleep(300)
            navigate('/');
        }
        else if (id ==='new' && note != null)
        {
            
            createNote();
            await sleep(300)
            navigate('/');
        }
    }

    let handleChange= (value) =>{
        setNote(note => ({...note,body: value}));
    }

    let deleteNote = async() =>{
        fetch(`/api/notes/${id}/delete/`,
        {
            metod: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
    }



  return (
    <div className='note'>
        <div className='note-header'>
            
            <Link to='/'>
                <h3>
                    <ArrowLeft />
                    {id !== 'new' ? (<button onClick={deleteNote}>Delete</button>):(<div></div>)}
                    
                </h3>
                
            </Link>
            
            
        </div>
        <textarea onChange = {(e)=> {handleChange(e.target.value)}} value={note?.body}>
        </textarea>
        <button className='note-button' onClick={handleUpdate}> Submit </button>
        
    </div>
  )
}

export default NotePage