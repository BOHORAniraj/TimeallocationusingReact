import React from "react";
import { Table, Button, Alert } from "react-bootstrap";

export const NotToDoList = ({ badTasks, markAsGoodList, badHours, badTaskToDelete,handleOnBadTaskClicked }) => {
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
					{badTasks.map((itm, i) => (
						<tr key={i}>
							<td>
								<input type="checkbox" 	
								defaultValue = {i}
								checked = {badTaskToDelete.includes(i)}
								onChange = {handleOnBadTaskClicked}
								/> <label>{itm.task}</label>
							</td>
							<td>{itm.hr}</td>
							<td>
								<Button onClick={() => markAsGoodList(i)}>Mark AS Good</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Alert variant="warning">You have save = {badHours} hours per week</Alert>
		</div>
	);
};
