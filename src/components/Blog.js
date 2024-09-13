import React, { useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    image: null
  });
  const [editingPost, setEditingPost] = useState(null);
  const [updatedPost, setUpdatedPost] = useState({
    title: '',
    description: '',
    image: null
  });

  const handleNewPostChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    setNewPost({
      ...newPost,
      image: URL.createObjectURL(e.target.files[0])
    });
  };

  const addPost = () => {
    if (newPost.title && newPost.description) {
      setPosts([...posts, { id: posts.length + 1, ...newPost }]);
      setNewPost({ title: '', description: '', image: null });
    }
  };
  const startEditingPost = (post) => {
    setEditingPost(post.id);
    setUpdatedPost({
      title: post.title,
      description: post.description,
      image: post.image,
    });
  };

  const updatePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
    setEditingPost(null);
    setUpdatedPost({ title: '', description: '', image: null });
  };

  const handleUpdateImageUpload = (e) => {
    setUpdatedPost({
      ...updatedPost,
      image: URL.createObjectURL(e.target.files[0])
    });
  };
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Add New Blog</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          name="title"
          value={newPost.title}
          placeholder="Enter blog title"
          onChange={handleNewPostChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          value={newPost.description}
          placeholder="Enter blog description"
          onChange={handleNewPostChange}
          rows="4"
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleImageUpload}
        />
        {newPost.image && (
          <img src={newPost.image} alt="Cover" className="img-fluid mb-2" width="100px" height="100px" />
        )}
        <button className="btn btn-primary mx-3" onClick={addPost}>
          Add Post
        </button>
      </div>

      <h3>All Blog Posts</h3>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              {editingPost === post.id ? (
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="title"
                    value={updatedPost.title}
                    placeholder="Update blog title"
                    onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-2"
                    name="description"
                    value={updatedPost.description}
                    onChange={(e) => setUpdatedPost({ ...updatedPost, description: e.target.value })}
                    rows="4"
                  />
                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={handleUpdateImageUpload}
                  />
                  {updatedPost.image && (
                    <img src={updatedPost.image} alt="Updated Cover" className="img-fluid mb-2" width="100px" height="100px"/>
                  )}
                  <button className="btn btn-success mx-3" onClick={() => updatePost(post.id)}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  {post.image && (
                    <img src={post.image} alt="Cover" className="img-fluid mb-2" width="100px" height="100px" />
                  )}
                  <button
                    className="btn btn-warning btn-sm mr-2 mx-4"
                    onClick={() => startEditingPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mr-2 mx-4"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blog;
