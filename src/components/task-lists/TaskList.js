import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector , useDispatch} from "react-redux";
import { setTaskToDelete } from "./taskSlice";
import {taskSwitcher } from "./taskAction";

export const TaskList = () => {
	 const dispatch = useDispatch()
	const {taskLists , taskToDelete} = useSelector(state => state.task)
	return (
		<div>
			<h2>Task List</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{taskLists.map((itm, i) => (
						<tr key={i}>
							<td>
								<input type="checkbox" defaultValue = {itm._id}
								checked = {taskToDelete.includes(itm._id)}
								onChange = {(e)=> dispatch(setTaskToDelete(e.target))}
								/> {""}<label>{itm.task}</label>
							</td>
							<td>{itm.hr}</td>
							<td>
								<Button onClick={() => taskSwitcher({id:itm._id ,todo :false})}>Mark AS Bad</Button>
							</td>
							
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
