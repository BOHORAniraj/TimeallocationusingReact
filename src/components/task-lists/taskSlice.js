import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    taskLists: [],
    badTaskLists:[],
    state: "",
    message: "",
    isPending: false,
    totalHrs: 0,
    taskToDelete : [],
}
const taskSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {
        //Ispending
        requestPending: (state) => {
            state.isPending = true;

        },
        // response is successful
        addTaskSuccess: (state, { payload }) => {
            state.status = payload.status;
            state.message = payload.message;
            state.isPending = false;
        },
        fetchTasksSuccess: (state, { payload }) => {
            state.isPending = false;
            
            state.totalHrs = payload.reduce((subttl, itm)=> subttl + +itm.hr, 0)

            // task list only

            const taskListsOnly = payload.filter((item) => item.todo);
            state.taskLists = taskListsOnly;

	// bad list only
            const badtaskListsOnly = payload.filter((item) => !item.todo);
            state.badTaskLists=badtaskListsOnly


        },

    // setTask to delete
        
        setTaskToDelete: (state, { payload }) => {
            const{checked,value} = payload;
		if(checked){
			state.taskToDelete = [...state.taskToDelete,value]

		} else {
			const filteredArg = state.taskToDelete.filter(itms => itms !== value )
            state.taskToDelete = filteredArg;
		}
        },
        deleteTaskSuccess: (state, { payload }) => {
            state.isPending = false;
            state.status = payload.status;
            state.message = payload.message;
        },

        updateTaskSuccess: (state, { payload }) => {
            state.isPending = false;
            state.status = payload.status;
            state.message = payload.message;
        },
        // response failure

        requestFail: (state, action) => {
            state.isPending = false;
        }

        }
    
});
const { reducer, actions } = taskSlice

export const { requestPending , addTaskSuccess , requestFail ,fetchTasksSuccess , setTaskToDelete ,deleteTaskSuccess,updateTaskSuccess } = actions;

export default reducer;