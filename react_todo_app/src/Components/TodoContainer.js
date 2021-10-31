import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";



const TodoContainer = () => {
    const getInitialTodos = () => {
        // getting stored items
        const temp = localStorage.getItem("todos")
        const savedTodos = JSON.parse(temp)
        return savedTodos || []
    }

    const [todos, setTodos] = useState(getInitialTodos())
    useEffect( () => {
        //store todos
        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
    }, [todos])


    const handleChange = id => {
        //who passes prevState to setTodos?
        setTodos(prevState =>
            prevState.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo
            })
        )
    }

    const delTodo = id => {
        setTodos([
            ...todos.filter(todo => {
                return todo.id !== id
            }),
        ])

    }

    const addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        }
        setTodos([...todos, newTodo])
    }

    const setUpdate = (updatedTitle, id) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle
                }
                return todo
            })
        )

    }
   
    return(
        <div className = "container">
            <div className = "inner">
                <Header />
                <InputTodo addTodoProps = {addTodoItem} />
                <TodoList 
                    todos = {todos}
                    handleChangeProps = {handleChange}
                    deleteTodoProps = {delTodo}
                    setUpdate = {setUpdate}
                />
            </div>
        
        </div>
    )
        

}



    // useEffect(() => {
    //     //get stored items
    //     const loadedTodos = JSON.parse(localStorage.getItem('todos'));
    //     if (loadedTodos) {
    //         setTodos(loadedTodos)
    //     }
    // }, [])


export default TodoContainer;