const postList = document.querySelector('#posts');
const createPost = document.querySelector('#create-post');
const title = document.getElementById('title');
const content = document.getElementById('content');
const btn = document.querySelector('.btn');


dataArr = [];

const renderPosts = (dataArr) => {
  output = '';
  dataArr.forEach(post => {
    output +=`<div class="col-lg-4 col-md-6 col-12 my-2">
    <div class="card text-center h-100">
        <div class="card-header">Posts</div>
        <div class="card-body" data-id=${post.id}>
            <h4 class="card-id">${post.id}</h4>
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <a class="card-link fw-bold" id="read-more" onclick="readPost(${post.id})">Read More...</a>
            <a class="card-link link-success" onclick="editPost(${post.id})"><i class="fa-solid fa-pen-to-square"></i></a>
            <a class="card-link link-danger" onclick="deletePost(${post.id})"><i class="fa-solid fa-trash-can" id="delete-post"></i></a>
        </div>
    </div>
</div>` 
  });
  
  postList.innerHTML = output;
}


const url = 'https://jsonplaceholder.typicode.com/posts';


// GET REQUEST
fetch(url)
  .then(response => response.json())
  .then(data => {
    dataArr= data;
    renderPosts(dataArr)
  });


// CREATE REQUEST
createPost.addEventListener('submit', (e) =>{
  e.preventDefault();
  fetch(url, { 
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      body: content.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(data =>{

      dataArr.unshift(data);
      renderPosts(dataArr);
    });
});


// UPDATE POST
function editPost(id) {
  // console.log(id);
  fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title.value,
      body: content.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let updateTitle = document.querySelectorAll('.card-title');
      let updateContent = document.querySelectorAll('.card-text');

      updateTitle.forEach((title, index) => {
        if(index === id - 1){
          if(data.title !== '') {
            title.innerHTML = data.title;
          }
        }
    });
      updateContent.forEach((content, index) => {
        if(index === id - 1){
          if(data.body !== '') {
            content.innerHTML = data.body;
          }
        }
    });
  });
};


// READ POST
function readPost(id) {
  // console.log(id);
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('readPost', JSON.stringify(data));
      window.location.href = `read-post.html?id=${id}`;
    })}

    
// DELETE POST
function deletePost(id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
     dataArr = dataArr.filter(post => post.id !== id);

      renderPosts(dataArr);
    })
}