// Blog posts stored in memory or localStorage
let posts = [];
let currentPostIdx = null;

function savePosts() {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

function loadPosts() {
  const saved = localStorage.getItem('blogPosts');
  if (saved) {
    posts = JSON.parse(saved);
  } else {
    posts = [
      {
        title: "Welcome to My Blog!",
        content: "This is your first post. Click on posts to read more, or add your own!"
      }
    ];
    savePosts();
  }
}

const postsList = document.getElementById('posts-list');
const addPostBtn = document.getElementById('add-post-btn');
const addPostForm = document.getElementById('add-post-form');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const cancelBtn = document.getElementById('cancel-btn');
const postModal = document.getElementById('post-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const modalView = document.getElementById('modal-view');
const editPostBtn = document.getElementById('edit-post-btn');
const deletePostBtn = document.getElementById('delete-post-btn');
const editPostForm = document.getElementById('edit-post-form');
const editPostTitle = document.getElementById('edit-post-title');
const editPostContent = document.getElementById('edit-post-content');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

function renderPosts() {
  postsList.innerHTML = '';
  if (posts.length === 0) {
    postsList.innerHTML = '<p>No posts yet. Add one!</p>';
    return;
  }
  posts.forEach((post, idx) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.textContent = post.title;
    postDiv.onclick = () => showPost(idx);
    postsList.appendChild(postDiv);
  });
}

function showPost(idx) {
  currentPostIdx = idx;
  modalTitle.textContent = posts[idx].title;
  modalContent.textContent = posts[idx].content;
  modalView.classList.remove('hidden');
  editPostForm.classList.add('hidden');
  postModal.classList.remove('hidden');
}

function hideModal() {
  postModal.classList.add('hidden');
}

addPostBtn.onclick = () => {
  addPostForm.classList.remove('hidden');
  addPostBtn.classList.add('hidden');
};

cancelBtn.onclick = () => {
  addPostForm.classList.add('hidden');
  addPostBtn.classList.remove('hidden');
  addPostForm.reset();
};

addPostForm.onsubmit = (e) => {
  e.preventDefault();
  const title = postTitleInput.value.trim();
  const content = postContentInput.value.trim();
  if (title && content) {
    posts.unshift({ title, content });
    savePosts();
    renderPosts();
    addPostForm.classList.add('hidden');
    addPostBtn.classList.remove('hidden');
    addPostForm.reset();
  }
};

closeModal.onclick = hideModal;
postModal.onclick = (e) => {
  if (e.target === postModal) hideModal();
};

// Edit post
editPostBtn.onclick = () => {
  if (currentPostIdx === null) return;
  editPostTitle.value = posts[currentPostIdx].title;
  editPostContent.value = posts[currentPostIdx].content;
  modalView.classList.add('hidden');
  editPostForm.classList.remove('hidden');
};

cancelEditBtn.onclick = () => {
  editPostForm.classList.add('hidden');
  modalView.classList.remove('hidden');
};

editPostForm.onsubmit = (e) => {
  e.preventDefault();
  if (currentPostIdx === null) return;
  const title = editPostTitle.value.trim();
  const content = editPostContent.value.trim();
  if (title && content) {
    posts[currentPostIdx] = { title, content };
    savePosts();
    renderPosts();
    showPost(currentPostIdx);
  }
};

deletePostBtn.onclick = () => {
  if (currentPostIdx === null) return;
  if (confirm('Delete this post?')) {
    posts.splice(currentPostIdx, 1);
    savePosts();
    renderPosts();
    hideModal();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  renderPosts();
}); 
