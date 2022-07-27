import './App.css';
import {Modal} from './components/Modal.js';
import {Navbar} from './components/Navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect }from 'react';
import {db} from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"; 


function App() {

  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [tier, setTier] = React.useState("loading");
 

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
  console.log(data);
  const userTier = tier;
  return (
    <div>
      {data.map(section => (
        <Modal section = {section} tier = {userTier}/>
        ))}
    </div>
  );
}

const Footer = () => {
  return (
    <div className = "footer">
      <p>
        customer tier: {tier}
      </p>
    </div>
  )
}

const getData = async (tier) => {

  const docRef = doc(db, "tiers", tier);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setData(docSnap.data().sections);
  } 
  else if (tier === "admin"){
    const sectionRef = await getDocs(collection(db, "tiers"));
    const adminSection = [];
    sectionRef.forEach((doc) => {
      if (doc.data().sections) {
        adminSection.push(...doc.data().sections);
      }
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    console.log("admin section", adminSection);
    setData(adminSection);
    // const docSnap = await getDoc(docRef);
    console.log("section ref", sectionRef);
  }
  else {
    console.log("error, could not retrieve data");
  }
}

const insertValues = async () => {

  const docData = {
    sections: [
      {
        title: "TITLE",
        description: "DESCRIPTION",
        logo: "URL",
        subsection: [
          {
            title: "SUBTITLE",
            description: "SUBDESC",
            logo: "SUBLOGO"
          }
        ]
      }
    ]
  };
  await setDoc(doc(db, "tiers", "vip"), docData)
  await setDoc(doc(db, "tiers", "free"), docData)
  await setDoc(doc(db, "tiers", "growth"), docData)
  
}



//if a user isn't logged in, the render this message
  if (!user) {
    return (
      <div>
        <Navbar user = {user}/>
        <p>please login</p>
      </div>
    )
  }

//if a user is logged in, then render this message
  else {
      return(
          <div className ="content">
          
            <Navbar user = {user}/>  
  
            <div className ="modal-items">
                <p>Logged in as: {user.email}</p>
                <p>User UID: {user.uid}</p>
                <p>Email:{tier}</p>
                <h2>Marketplace</h2>
                <TieredRender/>
            </div>
          
            <Footer />
          </div>
      );
    }
 
}
export default App;
