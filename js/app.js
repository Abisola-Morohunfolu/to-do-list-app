//data storage and creation module
const toDoListData = (() => {
    class Task {
        constructor (id, description) {
            this.id = id;
            this.description = description;
        }
    }

    let allTask = {
        high: [],
        medium: [],
        low: []
    };

    //creating a new task
    return {
        addNewTask: (type, description) => {
            let ID;

            //creating ID for each object
            if (allTask[type].length > 0) {
                ID = allTask[type][allTask[type].length - 1].id + 1;
            } else {
                ID = 0
            }
            //creating and pushing object
            let newTask = new Task(ID, description);
            allTask[type].push(newTask);
            return newTask;
        },

        testing: () => {
            return allTask;
        }
    }
})();

const UITaskHandler = (() => {
    //geting access to DOM
    const DOMStrings = {
        taskType : '.add-task__options',
        taskDescription: '.add-task__description',
        addTaskButton: '.add-task__button',
        taskContainer: '.task-container'
    }

    return {
        getStrings: () => {
            return DOMStrings;
        },

        displayNewTask: (obj, type) => {
            let html, newHtml, element;

            //content to be inserted unto the page
            if (type === 'high') {
                html =  '<div class="task task-high" id="high-%id%"><h4 class="task-heading">High</h4><p class="task-details task-details__high">%description%</p><button class="btn btn-red">Done</button></div>'
            } else if (type === 'medium') {
                html = '<div class="task task-medium" id="medium-%id%"><h4 class="task-heading">Medium</h4><p class="task-details task-details__medium">%description%</p><button class="btn btn-green">Done</button></div>'
            } else if ( type === 'low') {
                html = '<div class="task task-low" id="low-0"><h4 class="task-heading">Low</h4><p class="task-details task-details__low">%description%</p><button class="btn btn-blue">Done</button></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);

            //inserting element into DOM
            element = document.querySelector(DOMStrings.taskContainer);
            element.insertAdjacentHTML("beforeend", newHtml);
        },

        clearInput: () => {
            document.querySelector(DOMStrings.taskDescription).value = '';
            document.querySelector(DOMStrings.taskType).focus();
        }
    }
})();

const appController = ((dataControl, UIControl) => {

    //get dom strings
    const DOM = UIControl.getStrings();
    let DOMValues ={
        description: document.querySelector(DOM.taskDescription),
        type: document.querySelector(DOM.taskType)
    };

    const addTask = () => {

        if (DOMValues.description.value != "") {
            //create new object
             let newTodo = dataControl.addNewTask(DOMValues.type.value, DOMValues.description.value);

            //displaying new task in UI
            UIControl.displayNewTask(newTodo, DOMValues.type.value);

             //clearing input fields adding a new element
            UIControl.clearInput();
        }

    }


    //adding event listener
    document.querySelector(DOM.addTaskButton).addEventListener('click', addTask);
    //adding key press events
    document.addEventListener('keypress', function(event){
    //adding conditional statement to check if enter was pressed
        if (event.keycode === 13 || event.which === 13){
            addTask();
        }
    });


})(toDoListData, UITaskHandler);

