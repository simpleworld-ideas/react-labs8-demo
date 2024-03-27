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

    const [modifiedTaskName, setModifiedTaskName] = useState("");
    const [taskBeingEdited, setTaskBeingEdited] = useState(0);

    function addTask(){
        let newEntry = {
            id: tasks.length + 1,
            description: newTask,
            done: false
        }
        setTasks([...tasks, newEntry])
    }

    function checkTask(taskId){

        let targetedTask = tasks.filter(task => task.id === taskId)[0];
        
        targetedTask.done = !targetedTask.done;

        let modifiedTaskList = tasks.map( task => {
            if (task.id !== taskId){
                return task;
            } else {
                return targetedTask;
            }
        })
        setTasks(modifiedTaskList);
    }

    function deleteTask (taskId) {

        let targetedIndex = tasks.findIndex(task => task.id === taskId);
        let modifiedTasks = [...tasks.slice(0, targetedIndex),
                             ...tasks.slice(targetedIndex + 1)
                            ]
        setTasks(modifiedTasks);
    }

    function displayTask(tasks){
        return (
            tasks.map((task) => (
                taskBeingEdited !== task.id ?
                    (<li key={task.id}>
                        {task.description}
                        <input  type="checkbox"
                                checked={task.done === true}
                                onChange={()=> checkTask(task.id)}
                                value={task.description === true}
                        />
                        <button onClick={()=> { 
                                                setTaskBeingEdited(task.id); 
                                                setModifiedTaskName(task.description)
                                        }}                          
                        > Edit </button>
                        <button onClick={()=> deleteTask(task.id)}
                        > Delete </button>
                    </li>) : displayEditTask(task)     
                )
            )
        )
    }

    function displayEditTask(task){
        return(
            <li key={task.id}>
                <span> {task.id} </span>
                <input  type="text"
                        name={modifiedTaskName}
                        placeholder="Enter new description to update"
                        onChange={(event)=> setModifiedTaskName(event.target.value)}
                />
                <button onClick={()=>{updateTask(task.id); setTaskBeingEdited(0); setModifiedTaskName("")}}> Confirm </button>
            </li>
        )
    }

    function updateTask(taskId){
        let targetedTask = tasks.filter((task)=> task.id === taskId);
        let modifiedTask = targetedTask[0];
        modifiedTask.description = modifiedTaskName;

        let modifiedTaskList = tasks.map((task)=>{
            if (task.id !== taskId){
                return task;
            } else {
                return modifiedTask;
            }
        })
        setTasks(modifiedTaskList);
    }

    return (
        <React.Fragment>
            <h1> To do List </h1>
            <ul>
                { 
                    tasks ? displayTask(tasks) : <p> Loading </p>
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
