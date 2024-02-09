import { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const Storage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/"); /* ref to images folder */

  const handleSubmit = async () => {
    if(!imageUpload) return;

    // Config path of image to save on firebase storage
    const imagesFolderRef = ref(storage, `images/${imageUpload.name }`)
    try {
      const res = await uploadBytes(imagesFolderRef, imageUpload)
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getImageList = async () => {
      const res = await listAll(imageListRef); // get all image in folder images
      const imageUrls = [];
      await Promise.all(res.items.map(async (item) => {
        const imageUrl = await getDownloadURL(item); //get URL of each image
        imageUrls.push(imageUrl)
      }))
      setImageList(imageUrls);
    }
    getImageList();
  },[])

  return (
    <div>
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {imageList.map((image, index) => (
          <img src={image} alt="item" key={index} style={{width: "300px"}} />
        ))}
      </div>
    </div>
  );
};

export default Storage;
