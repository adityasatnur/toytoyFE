import React, {useState} from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import '../styles/ItemUpload.scss'
import axios from "axios";
import {storage} from ".././firebase/firebase"

import {PORT} from '../serverConfig'

const ItemUpload = ()=>{
    const category = [
        {name: 'Sports', id: 1},
        {name: 'Jig-Saw Puzzle', id: 2},
        {name:'Pretend Play', id:3},
        {name: 'Building Blocks', id: 4},
        {name: 'Games for the family', id: 5},
        {name: 'Learn through play', id: 6},
        {name: 'Learning', id: 7},
        {name: 'flash cards', id: 8},
        {name: 'Board Books', id: 9},
        {name: 'Fun', id: 10},
        {name: 'Storybook', id: 11},
        {name: 'Activity Books', id: 12},
        {name: 'Puppet Books', id: 13},
        {name: 'Cloth Books', id: 14},
        {name: 'Phonics Books', id: 15},
    ];
    const ageTypes = [
        {name: '0-2', id: 1},
        {name: '2-5', id: 2},
        {name:'5-7', id:3},
        {name: '7-99', id: 4},
        
    ];
    const [formData, setFormData] = useState({})
    const [categories, setCatgories] = useState([])
    const [age, setAge] = useState([])
    const [itemAdded, setItemAdded] = useState(false);

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const onSelect=(a, selectedItem)=>{
        setCatgories([...categories, selectedItem])
    }
    const onRemove=(a, removedItem)=>{
        let category = categories.filter((item)=>item.id!==removedItem.id);
        setCatgories(category)
    }
    const onSelectAge=(a, selectedItem)=>{
        setAge([...age, selectedItem])
    }
    const onRemoveAge=(a, removedItem)=>{
        let category = age.filter((item)=>item.id!==removedItem.id);
        setAge(category)
    }
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }
  
    const inputChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let form = {...formData, [name]: value}
        setFormData(form)
    }
    const getItems=async ()=>{
        await axios.get(`${PORT}/api/get/addItem`).then((res)=>{
          })
    }
        const createItem=async (e)=>{
        e.preventDefault();
        let data = {
            name: formData.name,
            cost: formData.cost,
            image: imageAsUrl.imgUrl,
            category: categories,
            inventory: formData.inventory,
            type: formData.type,
            purchasable: formData.purchasable,
            popular: formData.popular,
            description: formData.description,
            ageGroup: age,
            toySet: formData.toySet
          }
        await axios.post(`${PORT}/api/addItem`, data, {
            headers: {
               // 'Content-Type': 'application/plain',
            }
        }).then((res)=>{
            setItemAdded(()=>{

                setTimeout(()=>{
                    setItemAdded(false);
                    window.location.reload();
                }, 1000)
                return true;
            })
          })
          
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
      // async magic goes here...
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      //initiates the firebase side uploading 
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
      }, (err) => {
        //catches the errors
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
         .then(fireBaseUrl => {
           setImageAsUrl({...imageAsUrl, imgUrl: fireBaseUrl})
           
         })
      })
      }

return(

    <div className="ItemUpload">
        <form onSubmit={createItem}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="" onChange={inputChange}/>
            </div>
            <div>
                <label htmlFor="price">price</label>
                <input type="number" name="number" id="" onChange={inputChange}/>
            </div>
            <div>
                <label htmlFor="image">image</label>
                <input type="file" name="image" id="" onChange={handleImageAsFile}/>
                <button onClick={handleFireBaseUpload}>Upload</button>
                {imageAsUrl.imgUrl!==""? <p style={{color:"green"}}> Upload Success</p>:null}
            </div>
            <div>
                <label htmlFor="category">category</label>

               <Multiselect
                options={category} // Options to display in the dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                />
            </div>
            <div>
                <label htmlFor="inventory">Inventory</label>
                <input type="text" name="inventory" id="" onChange={inputChange}/>
            </div>
            <div>
            <label htmlFor="type">Type</label>
                <select name="type" id="" onChange={inputChange} >
                <option  value={null}> -- select an option -- </option>
                    <option value="toy" >Toy</option>
                    <option value="book">Book</option>
                </select>
            </div>
           <div>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="" cols="30" rows="3" onChange={inputChange}></textarea>
            </div>
            <div>
                <label htmlFor="purchasable">Purchasable</label>
                <select name="purchasable" id="" onChange={inputChange} >
                <option value={null}> -- select an option -- </option>
                    <option value={true} >yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            {formData.purchasable?
            <div>
                <label htmlFor="cost">cost</label>
                <input type="number" name="cost" id="" onChange={inputChange}/>
            </div>:null}
            <div>
                <label htmlFor="ageGroup">Age Group</label>
                <Multiselect
                options={ageTypes} // Options to display in the dropdown
                onSelect={onSelectAge} // Function will trigger on select event
                onRemove={onRemoveAge} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                />
                
            </div>
            <div>
                <label htmlFor="toySet">Toy Set</label>
                <select name="toySet" id="" onChange={inputChange} >
                <option value={null}> -- select an option -- </option>
                    <option value="1 Toy Set" >1 Toy Set</option>
                    <option value="2 Toy Sets">2 Toy Sets</option>
                </select>
            </div>
            <div>
                <label htmlFor="popular">Is Popular</label>
                <select name="popular" id="" onChange={inputChange} >
                <option value={null}> -- select an option -- </option>
                    <option value={true} >yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
        <input type="submit" value="Submit"/>
        {itemAdded && <p style={{color:"green"}}> Item Added Successfully</p>}
        </form>
    </div>
)
}
export default ItemUpload;