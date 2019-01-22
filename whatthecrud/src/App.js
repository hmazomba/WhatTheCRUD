import React, { useState, Fragment } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {
  const usersData = [
    {
      id: 1, name: 'Peter', username:'webslinger' 
    },
    {
      id: 2, name: 'TChalla', username:'darkcat'
    },
    {
      id: 3, name: 'Bruce', username: 'greenies'
    },
  ]

  const [ users, setUsers ] = useState(usersData)
  const [ editing, setEditing ] = useState(false)
  const initialFormState = {id: null, name: '', username: ''}

  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.is !== id))
  }

  const editRow = user =>
  {
    setEditing(true)
    setCurrentUser({id: user.id, name: user.name, username: user.username})
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser: user)))
  }

  return (
    <div className="container">
      <h1>WHAT THE CRUD</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit User</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ): (
            <Fragment>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />        
            </Fragment>
          )}
        </div>
        <div className="flex-large">
            <h2>View Users</h2>
            <UserTable users={users} deletUser={deleteUser} editRow={editRow}/>
        </div>        
      </div>
    </div>
  )
}

export default App
