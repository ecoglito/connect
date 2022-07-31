import './App.css';
import {Modal} from './components/Modal/Modal.js';
import {Navbar} from './components/Navbar/Navbar';


import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect }from 'react';
import {db} from "./firebase";
import {where, query, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc } from "firebase/firestore"; 
import { AddPopup } from './components/Popups/AddPopup';


function App() {

  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [tier, setTier] = React.useState("loading");
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const toggleAddPopup = () => {
    setIsAddOpen(!isAddOpen);
  }

  const getUserTier = async (uid) => {
    console.log(uid)
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTier(docSnap.data().tier);
      getData(docSnap.data().tier);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    //insertValues();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user); 
        getUserTier(uid);

      }
      else {
        setUser(null);
      }
    })   
  },[])



const TieredRender = () => {
  return (
    <div className = "modal-wrappers">
      {data.map((section) => (
        <Modal section = {section} tier = {tier}/>
        ))}
    </div>
  );
}



const getData = async (tier) => {

  if (tier != "admin") {
    const userSection = [];
    const q = query(collection(db, "sections"), where("tier", "==", tier));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    userSection.push(doc.data());
    });
    setData(userSection)
  } 
  else {
    const adminSection = [];
    const querySnapshot = await getDocs(collection(db, "sections"));
    querySnapshot.forEach((doc) => {
      adminSection.push(doc.data())
    });
    setData(adminSection);
    console.log(adminSection);
  }

}

const onAdd = (e, title, logo, description) => {
  e.preventDefault();
  const tiers = {
    free: true,
    growth: true,
    vip: true,
  }

  const subsections = ["empty"];

  addDoc(collection(db, "sections"), {
    title: title,
    description: description,
    logo: logo,
    tier: "free",
    tiers: tiers,
    subsections: subsections,
}).then(function (docRef) {
  updateDoc(doc(db, "sections", docRef.id), { id: docRef.id} );
}).then(() => {window.location.reload(false)});

}
//if a user isn't logged in, the render this message
  if (!user) {
    return (
      <div className ="content">
        <Navbar user = {user}/>
        <h1>Please login!</h1>
      </div>
    )
  }

//if a user is logged in, then render this message
  else {
      return(
          <div className ="content">
            <Navbar user = {user}/>  
            <div className ="modal-items">
                <h2>Marketplace</h2>
                <TieredRender/>
                {tier === "admin" && 
                <div>
                <button className = "add-section-btn" onClick= {toggleAddPopup}>Add New Section</button> 
                </div>
                }
                {isAddOpen && <AddPopup
                onAdd = {onAdd}
                handleClose={toggleAddPopup} />
                }
            </div>
            
      
          </div>
      );
    }
 
}
export default App;
