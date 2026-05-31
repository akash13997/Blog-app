import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

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
  const addPost = async () => {
    if (newPost.title && newPost.description) {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          title: newPost.title,
          description: newPost.description,
          image: newPost.image
        });
        setPosts([...posts, { id: docRef.id, ...newPost }]);
        setNewPost({ title: '', description: '', image: null });
      } catch (error) {
        console.error("Error adding post: ", error);
      }
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

  const updatePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, updatedPost);
    setPosts(posts.map((post) => post.id === id ? { ...post, ...updatedPost } : post));
    setEditingPost(null);
    setUpdatedPost({ title: '', description: '', image: null });
  };

  const handleUpdateImageUpload = (e) => {
    setUpdatedPost({
      ...updatedPost,
      image: URL.createObjectURL(e.target.files[0])
    });
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="container py-4">

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="mb-4 text-center">Add New Blog</h2>

              <input
                type="text"
                className="form-control mb-3"
                name="title"
                value={newPost.title}
                placeholder="Enter blog title"
                onChange={handleNewPostChange}
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                name="description"
                value={newPost.description}
                placeholder="Enter blog description"
                onChange={handleNewPostChange}
              />

              <input
                type="file"
                className="form-control mb-3"
                onChange={handleImageUpload}
              />

              {newPost.image && (
                <img
                  src={newPost.image}
                  alt="Preview"
                  className="img-fluid rounded mb-3"
                />
              )}

              <button
                className="btn btn-primary w-100"
                onClick={addPost}
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3>All Blog Posts</h3>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              {post.image && (
                <img
                  src={post.image}
                  alt="Cover"
                  className="card-img-top img-fluid"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div className="card-body d-flex flex-column">
                {editingPost === post.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={updatedPost.title}
                      onChange={(e) =>
                        setUpdatedPost({
                          ...updatedPost,
                          title: e.target.value,
                        })
                      }
                    />

                    <textarea
                      className="form-control mb-2"
                      rows="4"
                      value={updatedPost.description}
                      onChange={(e) =>
                        setUpdatedPost({
                          ...updatedPost,
                          description: e.target.value,
                        })
                      }
                    />

                    <input
                      type="file"
                      className="form-control mb-3"
                      onChange={handleUpdateImageUpload}
                    />

                    <button
                      className="btn btn-success w-100"
                      onClick={() => updatePost(post.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{post.title}</h5>

                    <p className="card-text flex-grow-1">
                      {post.description}
                    </p>

                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <button
                        className="btn btn-warning flex-fill mb-2 mb-sm-0"
                        onClick={() => startEditingPost(post)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger flex-fill"
                        onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Blog;
