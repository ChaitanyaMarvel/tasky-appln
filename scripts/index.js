const state = {
  taskList: [],
};
// dom manipulation
const taskModel = document.querySelector(".task__modal__body");
const taskContent = document.querySelector(".task__contents");

// console.log(taskModel);

//to create a card on home page
const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class=col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
              <button type='button' class='btn btn-outline-info mr-2' name='${id}' >
                  <i class='fa fa-pencil-alt' name='${id}'></i>
              </button>
              <button type='button' class='btn btn-outline-danger mr-2' name='${id}' onclick="deleteTask.apply(this)">
                  <i class='fa fa-trash-alt' name='${id}'></i>
              </button>
            </div>
            <div class='card-body'>
                ${
                  url
                  ? `<img width='100%' height='150px' style="object-fit: cover; object-position:center" src=${url} alt='card image here' class='card-img-top md-3 rounded-lg'/>`
                  :`<img width='100%' height='150px' style="object-fit: cover; object-position:center" src='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png' alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                }
                <h4 class='task__card__title'>${title}</h4>
                <p class='description trim-3-lines text-muted' data-gram_editor='false'>${description}</p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}</span>
                </div>
                <div class='card-footer'>
                    <button type='button' 
                    class='btn btn-outline-primary float-right' 
                    data-bs-toggle='modal' 
                    data-bs-target='#showTask' 
                    id=${id}
                    onclick='openTask.apply(this, arguments)'
                    >
                    Open Task
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

//Dynamic modals(cards) on our home page
const htmlModelContent = ({ id, title, description, type, url }) => {
  const date = new Date(parseInt(id));
  return `
        <div id=${id}>
            ${
              url &&
              `<img width='100%' src=${url} alt='card image herer' class='img-fluid place__holder__image mb-3'/>`
            }
            <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
            <h2 class="my-3">${title}</h2>
            <p class="lead">${description}</p>
            <span class='badge bg-primary m-1'>${type}</span>
        </div>
    `;
};

//updating local storage (i.e., the card which we see on our ui)
const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

//to get data or card or modals on ui from local storage(browser storage)
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardData) => {
    taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};

const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  };
  if(input.title === '' || input.type === '' || input.description === ''){
    return alert("please fill all the fields")
  }
  taskContent.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );

  //updated task  list - for 1st go
  state.taskList.push({ ...input, id});

  //update the same on local storage
  updateLocalStorage();
};

//opens modal on ui when user clicks open task
const openTask = (e) =>{
  //to popup the current one
  if(!e) e=window.event;

  //to find the correct card
  const getTask = state.taskList.find(({id}) =>
    id === e.target.id
    );
  taskModel.innerHTML = htmlModelContent(getTask);
};

//delete operation
const deleteTask = (e) => {
  if(!e) e=window.event;

  const targetID = e.target.getAttribute("name");
  // console.log(targetID);

  const type = e.target.tageName;
  // console.log(type);

  const removeTask = state.taskList.filter(({id}) => id !== targetID);
  // console.log(removeTask);
};