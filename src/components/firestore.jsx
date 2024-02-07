import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

const FireStore = () => {
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({
    name: "",
    director: "",
    releaseDate: "",
    hasOscar: false,
  });
  const [updatedName, setUpdatedName] = useState("");

  const movieCollectionRef = collection(db, "movies");

  const handleInputChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, movie);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    // Get movie doc by id
    const movieDoc = doc(db, "movies", movieId);
    await deleteDoc(movieDoc)
  };

  const hanleUpdateName = async (movieId) => {
    const movieDoc = doc(db, "movies", movieId)
    await updateDoc(movieDoc, {
      name: updatedName,
    })
  }
  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieList();
  }, []);

  return (
    <div>
      <input
        name="name"
        onChange={handleInputChange}
        placeholder="Movie name"
      />
      <input
        name="director"
        onChange={handleInputChange}
        placeholder="Director"
      />
      <input
        name="releaseDate"
        onChange={handleInputChange}
        placeholder=""
        type="date"
      />
      <input
        name="hasOscar"
        onChange={(e) =>
          setMovie((prev) => ({ ...prev, hasOscar: e.target.checked }))
        }
        id="has-oscar"
        type="checkbox"
        checked={movie.hasOscar}
      />
      <label htmlFor="has-oscar">Received Oscar</label>
      <button onClick={handleSubmit}>Create movie</button>
      
      <div style={{marginTop: "20px"}}>
        {movieList.map((movie, index) => (
          <div key={index}>
            <span>{movie.name}</span>
            <span style={{ marginLeft: "10px" }}>{movie.director}</span>
            <span style={{ marginLeft: "10px" }}>{movie.releaseDate}</span>
            <span style={{ marginLeft: "10px" }}>
              {movie.hasOscar ? "Received Oscar" : ""}
            </span>
            <button style={{cursor: "pointer", marginLeft: "10px"}} onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
            <input onChange={(e) => setUpdatedName(e.target.value)} placeholder="New title" />
            <button onClick={() => hanleUpdateName(movie.id)}>Update</button>

          </div>
        ))}
      </div>

      <pre>{JSON.stringify(movieList, null, 2)}</pre>
    </div>
  );
};

export default FireStore;
