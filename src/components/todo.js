import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
const todo = ()=>{

    // const [todoname, todoChange] = useState('');
    // const [todoList, todoListChange]=useState([]);
    // const [submittedTodo, submit] = useState(null);
    const inputRef = useRef();

    // const changeInput =(event)=>{
    //     todoChange(event.target.value);
    // }

    const reducer = (state, action)=>{
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'DEL':
                return state.filter((todo)=> todo.id!==action.payload);
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, []);

    // useEffect(()=>{
    //     if(submittedTodo){
    //         dispatch({type: 'ADD', payload: submittedTodo});
    //     }
    // }, [submittedTodo])

    useEffect(()=>{
        axios.get('https://paractice-1fb08.firebaseio.com/todos.json')
        .then(result=>{
            const todoData = result.data;
            const todoLists = [];
            for(let key in todoData){
                todoLists.push({name: todoData[key].name, id: key});
            }
            console.log(todoLists);
            dispatch({ type: 'SET', payload: todoLists });
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    // const blah=(event)=>{
    //     console.log(event.clientX);
    // };

    // useEffect(()=>{
    //     document.addEventListener('mousemove', blah);
    //     return ()=>{
    //         document.removeEventListener('mousemove', blah);
    //     }
    // }, [todoname])

    // console.log(inputRef);

    const changeList = ()=>{
        const todoname = inputRef.current.value;
        axios.post('https://paractice-1fb08.firebaseio.com/todos.json', { name: todoname })
        .then(result=>{
            setTimeout(()=>{
                const todo = {id: result.data.name, name: todoname};
                dispatch({type:'ADD', payload: todo});
                console.log(result);
                },3000)
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const removeHandler=(id)=>{
        axios.delete(`https://paractice-1fb08.firebaseio.com/todos/${id}.json`)
        .then(res=>{
            dispatch({type: 'DEL', payload: id});
            console.log('s');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <>
        <input ref={inputRef} type="text" />
        <button onClick={changeList} >click</button>
        <ul>
            {state.map(todo=><li key={todo.id} onClick={()=>removeHandler(todo.id)}>{todo.name}</li>)}
        </ul>
        </>
    )
}

export default todo;