import React, {useState, useEffect} from 'react'
import './style.css'

// to get the data from Local Storage

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log('this is list',list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    
    const addItem = () => {
        if(!inputData){
          alert('!please write something')
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
      
      }
    
    // delete the items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }


    // add data to localStorage
    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (     
                <div  className='main-div'>
                    
                 <div className='inputBox'>
                    <div className='inputBox'>
                        <input className='input' type="text" placeholder="✍ write a wonderful comment..."
                           value={inputData} 
                           id=""
                           onChange={(e) => setInputData(e.target.value) }
                        />             
                       
                    </div>
                    {
                           <button className='addCommentbtn button cmntButton' title="Add Comment" onClick={addItem} >Add comment</button>                      }
                     </div>

                    <div className='showItems'>
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className='eachItem'  key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <button className='button delete' onClick={() => deleteItem(elem.id)}>delete</button>
                                        <button className='button reply'>reply</button>
                                        
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                </div>  
    )
}

export default Todo
