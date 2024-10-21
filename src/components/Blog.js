import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    mobile: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
    mobile: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleNewUserChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async () => {
    if (newUser.username && newUser.email && newUser.mobile) {
      try {
        const docRef = await addDoc(collection(db, "users"), newUser);
        setUsers([...users, { id: docRef.id, ...newUser }]);
        setNewUser({ username: '', email: '', mobile: '' });
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  };

  const startEditingUser = (user) => {
    setEditingUser(user.id);
    setUpdatedUser({
      username: user.username,
      email: user.email,
      mobile: user.mobile,
    });
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, updatedUser);
    setUsers(users.map((user) => user.id === id ? { ...user, ...updatedUser } : user));
    setEditingUser(null);
    setUpdatedUser({ username: '', email: '', mobile: '' });
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Add New User</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          name="username"
          value={newUser.username}
          placeholder="Enter username"
          onChange={handleNewUserChange}
        />
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          value={newUser.email}
          placeholder="Enter email"
          onChange={handleNewUserChange}
        />
        <input
          type="number"
          className="form-control mb-2"
          name="mobile"
          value={newUser.mobile}
          placeholder="Enter mobile number"
          onChange={handleNewUserChange}
        />
        <button className="btn btn-primary mx-3" onClick={addUser}>
          Add User
        </button>
      </div>

      <h3>All Users</h3>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {editingUser === user.id ? (
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="username"
                    value={updatedUser.username}
                    placeholder="Update username"
                    onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    placeholder="Update email"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="mobile"
                    value={updatedUser.mobile}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, mobile: e.target.value })}
                    placeholder="Update mobile number"
                  />
                  <button className="btn btn-success mx-3" onClick={() => updateUser(user.id)}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h4>{user.username}</h4>
                  <p>Email: {user.email}</p>
                  <p>Mobile: {user.mobile}</p>
                  <button
                    className="btn btn-warning btn-sm mr-2 mx-4"
                    onClick={() => startEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mr-2 mx-4"
                    onClick={() => deleteUser(user.id)}
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

export default UserDetails;
