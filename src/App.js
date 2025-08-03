import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./component/auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  //state to keep track of the list of F1 Teams
  const [teamList, setTeamList] = useState([]);
  const [driver1, setDriver1] = useState("");
  const [driver2, setDriver2] = useState("");
  const [team, setTeam] = useState("");
  const [updatedTeam, setUpdatedTeam] = useState("");

  //Reference for the collection. Put it inside the getDocs method
  //2nd param is the key (name of the colection)
  const teamsCollectionRef = collection(db, "Formula 1");
  /////////////////////////////////////////////////////////////////////

  async function GetTeamList() {
    try {
      const data = await getDocs(teamsCollectionRef);

      // getting the exact data that we want from the response
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // creating an  id property
      }));
      setTeamList(filteredData);

      //console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  }
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    GetTeamList();
  }, []);

  ////////////////////////////////////////////////////////////////////

  async function onSubmitTeam(e) {
    e.preventDefault();
    //again: 1st parameter is a ref to the collection
    //2nd param is the data (object with the data. )
    // Don't need to put an id as it will be auto generated when you add
    // the document.
    try {
      const docRef = await addDoc(teamsCollectionRef, {
        Driver1: driver1,
        Driver2: driver2,
        Team: team,
        userId: auth?.currentUser?.uid, // dif. pra auth.uid
      });

      // if it got here, it's vecause everything is alright
      console.log("Document add with ID:", docRef.id);
      alert("✅ New team has been added successfully!");

      setDriver1("");
      setDriver2("");
      setTeam("");

      GetTeamList();
    } catch (err) {
      console.error("❌ Error when adding the new data:", err);
      alert("Error when adding the new data. Try it again");
    }
  }
  ////////////////////////////////////////////////////////////////////
  async function deleteTeam(id) {
    // grab the doc you want delete (function doc)
    const teamDoc = doc(db, "Formula 1", id);
    await deleteDoc(teamDoc);
    GetTeamList();
  }
  ////////////////////////////////////////////////////////////////////
  async function updateTeamName(id) {
    // grab the doc you want delete (function doc)
    const teamDoc = doc(db, "Formula 1", id);
    await updateDoc(teamDoc, { Team: updatedTeam });
    GetTeamList();
  }
  ////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <Auth />
      <br />
      <form onSubmit={onSubmitTeam}>
        <div>
          <input
            type="text"
            placeholder="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
          <input
            type="text"
            placeholder="Driver1"
            value={driver1}
            onChange={(e) => setDriver1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Driver2"
            value={driver2}
            onChange={(e) => setDriver2(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>

      <div>
        {teamList.map((team) => (
          <div key={team.id}>
            <p>{team.Team}</p>
            <p>{team.Driver1}</p>
            <p>{team.Driver2}</p>
            <button onClick={() => deleteTeam(team.id)}>Delete</button>
            <br />
            <input
              type="text"
              placeholder="New Team"
              onChange={(e) => setUpdatedTeam(e.target.value)}
            />
            <button onClick={() => updateTeamName(team.id)}>
              Update Team Name
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
/**
 * doc = each team in our collention
 * To get only 1 doc use getDoc.
 * More than 1, getDocs.
 *
 */
