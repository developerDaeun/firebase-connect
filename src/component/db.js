import { db, storage } from './firebase'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL,
         deleteObject } from "firebase/storage";

export async function add(_title, _content) {
  const docData = {
    title: _title,
    content: _content
  }
  // const [vedioPk, setVedioPk] = useState(0)
  // const [imagePk, setImagePk] = useState(0)
  const docRef = await addDoc(collection(db, 'dance'), docData)
  console.log('작성됐따', docRef.id)
  return docRef.id
}

// Create 업로드
export async function addImage(file, fileName) {
  const imagesRef = ref(storage, 'videos/'+fileName);
  const uploadTask = uploadBytesResumable(imagesRef, file);

  uploadTask.on('state_changed',
  null,
  (error) => {
    // Handle unsuccessful uploads
    console.error('실패사유는', error);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      // updateDoc(doc(db, "dance", fileName), {
      //   url : downloadURL
      // });
    });
  }
);
}

// Read 읽어오기
export async function getData(pk) {
  const dataRef = ref(storage, 'images/'+pk)
  getDownloadURL(dataRef).then(res => {
    console.log(res)
  })
}

// export async function getData() {
//   const arr = []
//   const q = query(collection(db, 'dance'))
//   const querySnapshot = await getDocs(q) 
//   await querySnapshot.forEach(doc => {
//     console.log(doc.id, "=>", doc.data())
//     arr.push(doc.data())
//   })
//   console.log(arr)
//   return arr
// }


// Delete 삭제
export async function deleteData(pk) {
  // const deleteRef = ref(storage, 'videos/'+ pk)
  const deleteRef = ref(storage, 'videos/'+pk)

  deleteObject(deleteRef).then(() => {
    console.log(pk, '삭제완료')
  }).catch((err) => {
    console.log(err)
  })
}