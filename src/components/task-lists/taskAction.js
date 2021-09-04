import { requestPending, addTaskSuccess, requestFail,updateTaskSuccess ,fetchTasksSuccess,deleteTaskSuccess } from './taskSlice'
import { createTask, deleteTasks, getTaskLists, switchTask } from '../../apis/taskApi'

export const addTask = (newTask) => async dispatch => {
    try {
        dispatch(requestPending())
        const result = await createTask(newTask);
        console.log(result)
            dispatch(addTaskSuccess(result));
            result._id  && dispatch(fetchTaskLists())
        
    } catch (error) {
        dispatch(requestFail({
            status: "error",
            message : error.message,
        })
            
        )
        
    }
   

    
    
}


export const fetchTaskLists = () => async dispatch => {
    try {
        dispatch(requestPending())
        const { result } = await getTaskLists();
        dispatch(fetchTasksSuccess(result));


    } catch (error) {
        dispatch(requestFail({
            status: "error",
            message: error.message,
        }))
    }
    
}

export const handleOnDeleteItems = taskToDelete => async dispatch => {
    try {
        dispatch(requestPending())
        const result = await deleteTasks({ ids: taskToDelete })
        dispatch(deleteTaskSuccess(result))
    } catch (error) {
        dispatch(requestFail({
            status:'error', message:''
        })
        )
        
    }
    
}
export const taskSwitcher = taskObj => async dispatch=> {
    try {
        dispatch(requestPending())

        const res = await switchTask(taskObj);
        dispatch(updateTaskSuccess(res))
        res?.status === "success" && dispatch(fetchTaskLists())
    
        

    } catch (error) {
        dispatch(requestFail({
            status:'error',message:error.message,
        }))
        
    }
}
const markAsBadList = async _id => {
		
    const dt = {
        
        id : _id,
        todo : false,
        
    }
    
        

}
const markAsGoodList = async (_id) => {
    
    const dt = {
        
        id : _id,
        todo : true,
        
    }
    const res = await switchTask(dt);
    
}