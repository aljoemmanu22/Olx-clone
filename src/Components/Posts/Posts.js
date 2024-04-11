import React, { useEffect, useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getDocs, collection, getFirestore } from 'firebase/firestore'; // Import necessary functions
import './Post.css';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const Firebase = useContext(FirebaseContext);
  const firestore = getFirestore(Firebase);
  const [products, setProducts] = useState([]);
  const {setPostDetails}  = useContext(PostContext)
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const allProducts = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [firestore]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View More</span>
        </div>
        <div className="cards">
          {products.map(product =>{
            return <div className="card" onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }} key={product.id}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.imageUrl} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div> 
          </div>
          })}
        </div>  
      </div>
    </div>
  );
}

export default Posts;
