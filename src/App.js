import { useEffect, useState } from 'react';
import Upload from './component/Compo';
import { getData } from './component/db'
function App() {
  const [danceData, setDanceData] = useState([])
  
  useEffect(async ()=> {
    try {
      await getData().then(res => {
        // setDanceData([...danceData, ...res])
        // console.log(res)
      })
    } catch (err) {
      return err
    }
  }, [])
  return (
    <div className="App">
      <Upload />
      {/* <img src='https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/images%2FNqfoCG96QrtW0TAT1xsJ?alt=media&token=3d241336-5884-467b-8926-0f08cb8339e1'/> */}
    </div>
  );
}

export default App;
