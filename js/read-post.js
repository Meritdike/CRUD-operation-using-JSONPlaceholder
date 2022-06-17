const postList = document.querySelector('#posts');
const url = 'https://jsonplaceholder.typicode.com/posts';

dataArr = [];

const renderPosts = (dataArr) => {
    output = '';
  dataArr.forEach(post => {
    output +=`<div class="col-lg-6 col-md-12 col-12">
                    <div class="card text-center border-0">
                        <div class="card-header">Post</div>
                        <div class="card-body">
                            <h4 class="card-id" ${post.id}>1</h4>
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                            <a href="index.html" class="card-link fw-bold" id="read-more" onclick="readPost(${post.id})">Show Less</a>
                            <a href="#" class="card-link link-danger" onclick="deletePost(${post.id})"><i class="fa-solid fa-trash-can" id="delete-post"></i></a>
                        </div>
                    </div>
                </div>` 
  });
  
  postList.innerHTML = output;
}




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