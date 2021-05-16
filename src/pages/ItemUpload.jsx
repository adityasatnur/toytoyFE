import React, {useState} from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import '../styles/ItemUpload.scss'
import axios from "axios";
import {PORT} from '../serverConfig'

const ItemUpload = ()=>{
    const category = [
        {name: 'sports', id: 1},
        {name: 'Jig Saw Puzzles', id: 2},
        {name:'pretend Play', id:3},
        {name: 'Building Blocks', id: 4},
        {name: 'Games for the family', id: 5},
        {name: 'Learn through play', id: 6},
        {name: 'Learning', id: 7},
        {name: 'flash cards', id: 8},
        {name: 'board books', id: 9},
        {name: 'fun', id: 10},
        {name: 'storybook', id: 11},
        {name: 'activity books', id: 12},
        {name: 'puppet books', id: 13},
        {name: 'cloth books', id: 14},
        {name: 'phonics books', id: 15},
    ];
    const [formData, setFormData] = useState({})
    const [categories, setCatgories] = useState([])
    const onSelect=(a, selectedItem)=>{
        setCatgories([...categories, selectedItem])
    }
    const onRemove=(a, removedItem)=>{
        let category = categories.filter((item)=>item.id!==removedItem.id);
        setCatgories(category)
    }

    const inputChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let form = {...formData, [name]: value}
        setFormData(form)
    }
    const createItem=async (e)=>{
        e.preventDefault();
        let data = {
            name: formData.name,
            price: formData.price,
            image: formData.image,
            category: categories,
            inventory: formData.inventory,
            type: formData.type,
            purchasable: formData.purchasable,
            description: formData.description,
            ageGroup: formData.ageGroup,
          }
          console.log(data)
        await axios.post(`${PORT}/api/addItem`, data, {
            headers: {
               // 'Content-Type': 'application/plain',
            }
        }).then((res)=>{
            console.log(res)
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
                <input type="file" name="image" id="" onChange={inputChange}/>
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
            <div>
                <label htmlFor="ageGroup">Age Group</label>
                <select name="ageGroup" id="" onChange={inputChange} >
                <option value={null}> -- select an option -- </option>
                    <option value="0" >0-2</option>
                    <option value="2">2-5</option>
                    <option value="5">5-7</option>
                    <option value="7">7-99</option>
                </select>
            </div>
        <input type="submit" value="Submit"/>
        </form>
    </div>
)
}
export default ItemUpload;