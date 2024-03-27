import React, {useState} from 'react';

export default function TaskList(){

    // We use conditional rendering because setTasks or setTask is an ASYCHRONOUS activity

    const [tasks, setTasks] = useState(
        [
            {   
                id:1,
                description: "Walk the dog",
                done: false
            },
            {
                id:2,
                description: "Water the plants",
                done: false
            },
            {
                id:3,
                description: "Pay the bills",
                done: false
            }
        ]
    );

    const [newTask, setNewTask] = useState("");

    function addTask(){
        let newEntry = {
            id: tasks.length + 1,
            description: newTask,
            done: false
        }
        setTasks([...tasks, newEntry])
    }

    return (
        <React.Fragment>
            <h1> To do List </h1>
            <ul>
                {
                    tasks ? tasks.map((task) => (
                        <li key={task.id}>
                            {task.description}
                            <input  type="checkbox"
                                    checked={task.done === true}
                            />
                            <button> Edit </button>
                            <button> Delete </button>
                        </li>
                    )) : <p> Loading </p>
                }
            </ul>
            <h2> Create new task </h2>
            <div>
                <label> Task Desription </label>
                <input  type="text" 
                        name="newTaskName" 
                        value={newTask}
                        onChange={(event)=> setNewTask(event.target.value)}
                        />
                <button onClick={addTask}> Add </button>
                <p> "This is new Task State: " </p>
            </div>
        </React.Fragment>            
    )
}
