import './App.css';
import {Modal} from './components/Modal/Modal.js';
import {Navbar} from './components/Navbar/Navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect }from 'react';
import {db} from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc } from "firebase/firestore"; 


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
  return (
    <div className = "modal-wrappers">
      {data.map((section) => (
        <Modal section = {section} tier = {tier}/>
        ))}
    </div>
  );
}


const getData = async (tier) => {

  const docRef = doc(db, "tiers", tier);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setData(docSnap.data().sections);
  } 
  else if (tier === "admin"){
    const adminSection = [];
    const querySnapshot = await getDocs(collection(db, "sections"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      adminSection.push(doc.data())
    });
    setData(adminSection);
    console.log(adminSection);
    // sectionRef.forEach((doc) => {
    //   if (doc.data().sections) {
    //     adminSection.push(...doc.data().sections);
    //   }
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // // console.log("admin section", JSON.stringify(adminSection));
    // setData(adminSection);
    // // const docSnap = await getDoc(docRef);
    // console.log("section ref", sectionRef);
  }
  else {
    console.log("error, could not retrieve data");
  }
}

const insertValues = async () => {

  // const docData = {
  //   sections: [
  //     {
  //       title: "TITLE",
  //       description: "DESCRIPTION",
  //       logo: "URL",
  //       subsection: [
  //         {
  //           title: "SUBTITLE",
  //           description: "SUBDESC",
  //           logo: "SUBLOGO"
  //         }
  //       ]
  //     }
  //   ]
  // };
  // await setDoc(doc(db, "tiers", "vip"), docData)
  // await setDoc(doc(db, "tiers", "free"), docData)
  // await setDoc(doc(db, "tiers", "growth"), docData)
  
}

const editData = (index, section) => {

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
            </div>
          
      
          </div>
      );
    }
 
}
export default App;
