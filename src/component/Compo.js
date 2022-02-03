import React, { useState } from 'react';
import { add, addImage, deleteData } from './db'

function Upload() {
  const [file, setFile] = useState('')
  const [now, setNow] = useState(Date.now())
  const onFileChange = (event) => {
    setFile(event.target.files[0])
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await setNow(Date.now())
      console.log(now)
      await addImage(file, now)
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <form onSubmit={onSubmit}>
      <input 
        type='file'
        name='video'
        onChange={onFileChange}
      />
      <button type='submit'>제출</button>
    </form>
    <button onClick={deleteData}>delete</button>
    <video
      controls
      src='https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/images%2F4mEaYDqRC2yPnv3x7GuP?alt=media&token=5487c536-854b-4cb7-a3a4-1dfa80d4b3f4'
      type='video/mp4'
    />
    <h1>{now}</h1>
  </>
  );
}

export default Upload;