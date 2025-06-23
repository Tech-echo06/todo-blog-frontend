let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

function savePosts() {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
}

function addPost() {
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;

  if (title && content) {
    posts.unshift({ title, content });
    savePosts();
    displayPosts();
    document.getElementById("blogTitle").value = "";
    document.getElementById("blogContent").value = "";
  }
}

function deletePost(index) {
  posts.splice(index, 1);
  savePosts();
  displayPosts();
}

function editPost(index) {
  const newTitle = prompt("Edit title:", posts[index].title);
  const newContent = prompt("Edit content:", posts[index].content);

  if (newTitle !== null && newContent !== null) {
    posts[index].title = newTitle;
    posts[index].content = newContent;
    savePosts();
    displayPosts();
  }
}

function displayPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className = "blog-post";
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="editPost(${index})">✏️ Edit</button>
      <button onclick="deletePost(${index})">🗑️ Delete</button>
    `;
    container.appendChild(postDiv);
  });
}

// Load posts when page opens
displayPosts();
