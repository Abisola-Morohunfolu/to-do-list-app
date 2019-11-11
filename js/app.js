window.addEventListener('load', () => {
    const preload = document.querySelector('.load-container');
    const loggedIn = localStorage.getItem('logged-in');
    if (!localStorage.getItem('user') && !localStorage.getItem('pin') && loggedIn !== 'true') {
        return window.location.replace('login.html');
    }
    preload.classList.add('load-container_fade');
})



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

        addExistingItem: (type, exsitingID) => {

            let existingItem = new Task(exsitingID, description = 'existingItem');
            allTask[type].push(existingItem);
        },
        
        removeExistingItem: (type, id) => {
            const itemArray = [...allTask[type]];
            const newArray = itemArray.filter(item => item.id !== id);
            allTask[type] = [...newArray];
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
        taskContainer: '.task-container',
        clearButton: '.btn-clear'
    }

    return {
        getStrings: () => {
            return DOMStrings;
        },

        displayNewTask: (obj, type) => {
            //content to be inserted unto the page
              let markup =  `<div class="task task-${type}" id="${type}-${obj.id}">
                            <h4 class="task-details task-details__${type}">${obj.description}</h4>
                            <button type="button" class="btn btn-${type}">Done</button>
                        </div>`;


           localStorage.setItem(type + '-' + obj.id, markup);
            //inserting element into DOM
            let element = document.querySelector(DOMStrings.taskContainer);
            element.insertAdjacentHTML("beforeend", markup);
        },

        removeSingleTask: (taskID) => {
            let element = document.getElementById(taskID);
            element.parentElement.removeChild(element);
            localStorage.removeItem(taskID);
        },

        addExistingTask: (type) => {
            let existingItem, element;

            existingItem = localStorage.getItem(type);
            element = document.querySelector(DOMStrings.taskContainer);
            element.insertAdjacentHTML("beforeend", existingItem);
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
        type: document.querySelector(DOM.taskType),
        clearBtn: document.querySelector(DOM.clearButton)
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
    };



    //adding event listener
    document.querySelector(DOM.addTaskButton).addEventListener('click', addTask);

    document.querySelector(DOM.taskContainer).addEventListener('click', event => {
        const itemID = event.target.parentNode.id;
        const splitID = itemID.split('-');

        const type = splitID[0];
        const ID = parseFloat(splitID[1]);

        //remove from data structure
        dataControl.removeExistingItem(type, ID)
        
        UIControl.removeSingleTask(itemID);
    })
    //adding key press events
    document.addEventListener('keypress', function(event){
    //adding conditional statement to check if enter was pressed
        if (event.keycode === 13 || event.which === 13){
            addTask();
        }
    });

    document.querySelector(DOM.clearButton).addEventListener('click', () => {
        if (document.querySelector(DOM.taskContainer).childElementCount > 0) {
                document.querySelector(DOM.taskContainer).textContent = " ";

                //remove item from local storage
                let keyArray = [];
                for (let i = 0; i < localStorage.length; i++) {
                    keyArray.push(localStorage.key(i));
                }

                for (key of keyArray) {
                    if (key.includes('high') || key.includes('medium') || key.includes('low')) {
                        localStorage.removeItem(key);
                    }
                }
                //localStorage.clear();
        }
    })




})(toDoListData, UITaskHandler);


const headerDisplay = (dayTime, curDay, curMonArr, curMon, year) => {
    //localStorage.setItem('user', 'Jack');
    let markup = `
        <div class="top-section__text">
            <h1 class="main-heading">
                Good ${dayTime}, ${localStorage.getItem('user')}
            </h1>
            <h3 class="sub-heading">
                ${curMonArr[curMon - 1]} ${curDay}, ${year}
            </h3>
        </div>
    `;

    document.querySelector('.top-section').insertAdjacentHTML('beforeend', markup);
};

const dateDisplay = () => {
    let dayTime;

    const timeOfday = new Date().getHours();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const dayTimeArray = ['morning', 'afternoon', 'evening'];
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    if (timeOfday > 0 && timeOfday < 12) {
        dayTime = dayTimeArray[0]
    } else if (timeOfday > 12 && timeOfday < 17) {
        dayTime = dayTimeArray[1];
    } else {
        dayTime = dayTimeArray[2];
    }

    //console.log(currentMonth, monthArray[10]);

    headerDisplay(dayTime, currentDay, monthArray, currentMonth, currentYear);
};

function init() {

    

    // localStorage.setItem('logged in', 'true');
    // if (localStorage.getItem('logged in') === 'true') {
    //     return window.location.replace('https://twitter.com/home');
    // }

    dateDisplay();
    let keyArray = [];
    if (localStorage != null) {
        for (let i = 0; i < localStorage.length; i++) {
            keyArray.push(localStorage.key(i));
        }
    
    for (let key of keyArray) {
        if (key.includes('high') || key.includes('medium') || key.includes('low')) {
            UITaskHandler.addExistingTask(key);
            let taskID = key.split('-');
            let type = taskID[0];
            let ID = parseFloat(taskID[1]);
            toDoListData.addExistingItem(type, ID);
            //console.log(type, ID);
        }
    }
    }
}

init();

