import { useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { AddTaskForm } from "./components/form/AddTaskForm";

import { TaskList } from "./components/task-lists/TaskList";
import { NotToDoList } from "./components/task-lists/NotToDoList";

import "./App.css";

const hrPwk = 168;
const App = () => {
	const [tasks, setTasks] = useState([]);
	const [badTasks, setBadTasks] = useState([]);
	const [error, setError] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState([])
	const [badTaskToDelete, setBadTaskToDelete] = useState([])

	const taskHrs = tasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
	const badHours = badTasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
	const totalHrs = taskHrs + badHours;

	// useEffect(() => {
	// 	console.log("from use effect");
	// }, [error]);

	const addTaskList = frmDt => {
		if (hrPwk < totalHrs + +frmDt.hr) {
			setError(true);
		} else {
			error && setError(false);
			setTasks([...tasks, frmDt]);
		}
	};

	const markAsBadList = i => {
		
		const tempTask = [...tasks];
		const badTask = tempTask.splice(i, 1)[0];
	
		setBadTasks([...badTasks, badTask]);
		setTasks(tempTask);
	};

	//collect indices of the task list that needs too be deleted
	const handleOnTaskClicked = e => {
		const{checked,value} = e.target;
		if(checked){
			setTaskToDelete([...taskToDelete, +value])

		} else {
			const filteredArg = taskToDelete.filter(itms => itms !== +value )
			setTaskToDelete(filteredArg)
		}
	}
	// const handleOnBadTaskClicked = e => {
	// 	const{checked,value} = e.target;
	// 	if(checked){
	// 		setBadTaskToDelete([...badTaskToDelete, +value])

	// 	} else {
	// 		const filteredArg = taskToDelete.filter(itms => itms !== +value )
	// 		setTaskToDelete(filteredArg)
	// 	}
	// }

	const deleteFromTaskList = () => {
		const newArg = tasks.filter((itms,i) => !taskToDelete.includes(i));
		setTaskToDelete([]);
		setTasks(newArg);
	}

	const handleOnDeleteItems = () => {
		deleteFromTaskList();
		deleteFromBadTaskList();
		}


	


	const markAsGoodList = i => {
		const tempBadList = [...badTasks];
		const goodTask = tempBadList.splice(i, 1)[0];
		setTasks([...tasks, goodTask]);
		setBadTasks(tempBadList);
	};
	
	const handleOnBadTaskClicked = e => {
		const {checked, value} = e.target;
		if(checked) {
		setBadTaskToDelete([...badTaskToDelete, +value]);
		}else{
			const filterArg = badTaskToDelete.filter(itms => itms !== +value )
			setBadTaskToDelete(filterArg)
		}
	}	
	const deleteFromBadTaskList = () => {
		const newArgs = badTasks.filter((itm,i) => !badTaskToDelete.includes(i));
		setBadTaskToDelete([]);
		setBadTasks(newArgs);
	}

	return (
		<div className="main">
			<Container>
				<Row>
					<Col>
						<h1 className="text-center mt-5">Not To Do Task List</h1>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						{error && (
							<Alert variant="danger">
								You don't have enough hours to allocate this task
							</Alert>
						)}
					</Col>
				</Row>
				<AddTaskForm addTaskList={addTaskList} />
				<hr />
				<Row>
					<Col>
						<TaskList tasks={tasks}
						 markAsBadList={markAsBadList}
						taskToDelete={taskToDelete}
						handleOnTaskClicked={handleOnTaskClicked}
						 />
					</Col>
					<Col>
						<NotToDoList
							badTasks={badTasks}
							markAsGoodList={markAsGoodList}
							badHours={badHours}
							badTaskToDelete= {badTaskToDelete}
							handleOnBadTaskClicked= {handleOnBadTaskClicked}
							
							
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button variant = "danger"
						onClick={handleOnDeleteItems}
						>
							Delete
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Alert variant="info">
							Your total allocated hours = {totalHrs} / 168 hours per week
						</Alert>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default App;
