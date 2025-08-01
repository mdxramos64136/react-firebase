import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./component/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  //state to keep track of the list of F1 Teams
  const [teamList, setTeamList] = useState([]);
  const [driver1, setDriver1] = useState([]);
  const [driver2, setDriver2] = useState([]);
  const [team, setTeam] = useState([]);

  //Reference for the collection. Put it inside the getDocs method
  //2nd param is the key (name of the colection)
  const teamsCollectionRef = collection(db, "Formula 1");

  useEffect(() => {
    async function GetTeamList() {
      //read the date and set the movie list.
      // Get all docs inside the collection
      // you need to set the rules/ permission to read and write data
      try {
        const data = await getDocs(teamsCollectionRef);

        // getting the exact data that we want from the response
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // creating an  id property
        }));
        setTeamList(filteredData);

        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    }
    GetTeamList();
  }, []);

  return (
    <div className="App">
      <Auth />
      <br />
      <form>
        <div>
          <input type="text" placeholder="Team" />
          <input type="text" placeholder="Driver1" />
          <input type="text" placeholder="Driver2" />
        </div>
        <button>Submit</button>
      </form>

      <div>
        {teamList.map((team) => (
          <div key={team.id}>
            <p>{team.Team}</p>
            <p>{team.Driver1}</p>
            <p>{team.Driver2}</p>
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
