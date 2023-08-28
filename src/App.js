import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import getUsersData from './utils/urersData';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import MoviePage from './components/MoviePage';


function App() {
  const [users, setUsers] = useState(getUsersData())
  const [currentUserId, setCurrentUserId] = useState(users[0].id)

  const addMovie = (userID, movie, price)  => {
    let userIndex = users.findIndex(user => user.id == userID)
    if (userIndex !== -1 && users[userIndex].money - price > 0) {
      let newUsers = [...users]
      newUsers[userIndex].money -= price
      newUsers[userIndex].rented.push(movie)
      setUsers(newUsers)
    }
  }
  
  const remoteMovie = (userID, movie, price) => {
    let userIndex = users.findIndex(user => user.id == userID)
    let newUsers = [...users]
    newUsers[userIndex].money += price
    let movieIndex = newUsers[userIndex].rented.findIndex(currentMovie =>currentMovie.id === movie.id)
    newUsers[userIndex].rented.splice(movieIndex, 1)
    setUsers(newUsers)
  }



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage users={users}
          setCurrentUserId={setCurrentUserId} />}/>

          <Route path="/catalog" 
            element={<CatalogPage 
              users={users}
              addMovie={addMovie}
              remoteMovie={remoteMovie}
              currentUserId={currentUserId} />} />
              
          <Route path="/movie/:movieid" 
            element={<MoviePage currentUserId={currentUserId}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
