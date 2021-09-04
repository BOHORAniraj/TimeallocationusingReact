import React from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useSelector , useDispatch} from "react-redux";
import { setTaskToDelete } from "./taskSlice";
import { taskSwitcher } from "./taskAction";

export const NotToDoList = ({ markAsGoodList , badHours}) => {
	const dispatch = useDispatch()
	const {badTaskLists , taskToDelete} = useSelector(state => state.task)
	return (
		<div>
			<h2>BAD Task List</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{badTaskLists.map((itm, i) => (
						<tr key={i}>
							<td>
								<input type="checkbox" 	
								defaultValue = {itm._id}
								checked = {taskToDelete.includes(itm._id)}
								onChange = {(e)=> dispatch(setTaskToDelete(e.target))}
								/> { ""}<label>{itm.task}</label>
							</td>
							<td>{itm.hr}</td>
							<td>
								<Button onClick={() => dispatch(taskSwitcher({id:itm._id ,todo:true}))}>Mark AS Good</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Alert variant="warning">You have save = {badHours} hours per week</Alert>
		</div>
	);
};
