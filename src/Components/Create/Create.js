import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext);
  const Firebase = useContext(FirebaseContext);
  const storage = getStorage(Firebase);
  const firestore = getFirestore(Firebase);
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Validate inputs
    if (!name || !category || !price || !image) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const storageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(storageRef);
      const productsCollection = collection(firestore, 'products');
      
      await addDoc(productsCollection, {
        name: name,
        category: category,
        price: price,
        imageUrl: imageUrl,
        userId: user.uid,
        createdAt: new Date().toDateString(),
        // Add other fields here as needed
      });
      navigate('/');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image. Please try again.'); // Set error message
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {error && <div className="error">{error}</div>} {/* Display error message if any */}
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id="fname"
            name="Name"
            placeholder="Enter name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            id="fname"
            name="category"
            placeholder="Enter category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname"
            name="Price"
            placeholder="Enter price"
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
