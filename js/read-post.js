const postList = document.querySelector('#posts');


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
            <a href="read-post.html" class="card-link fw-bold" id="read-more" onclick="readPost(${post.id})">Show Less</a>
            <a class="card-link link-danger" onclick="deletePost(${post.id})"><i class="fa-solid fa-trash-can" id="delete-post"></i></a>
        </div>
    </div>
</div>` 
  });
  
  postList.innerHTML = output;
}


const url = 'https://jsonplaceholder.typicode.com/posts';


function renderReadPost() {
    let readObj = localStorage.getItem('readPost');
    let readPost = JSON.parse(readObj);

    document.querySelector('.card-id').innerHTML = readPost.id;
    document.querySelector('.card-title').innerHTML = readPost.title;
    document.querySelector('.card-text').innerHTML = readPost.body;
}

renderReadPost();

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