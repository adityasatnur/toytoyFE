
import React from 'react';
import '../styles/filters.scss';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import FilterItem from './FilterItem';
import Sports from "../assets/icons/sports.png";
import Sports1 from "../assets/icons/activity-book.png";
import Sports2 from "../assets/icons/board-bookks.png";
import Sports3 from "../assets/icons/cloth-book.png";
import Sports4 from "../assets/icons/delivery-truck.png";
import Sports5 from "../assets/icons/fun.png";
import Sports6 from "../assets/icons/learning.png";
import Sports7 from "../assets/icons/search.png";

const toyCategoriesFilter = [
    {
    categoryName:"Sports", 
    categoryImage: Sports
},
{
    categoryName:"Jig-Saw Puzzle", 
    categoryImage: Sports
},
{
    categoryName:"Pretend Play", 
    categoryImage: Sports
},
{
    categoryName:"Building Blocks", 
    categoryImage: Sports
},
{
    categoryName:"Games for the family", 
    categoryImage: Sports
},{
    categoryName:"Learn through play", 
    categoryImage: Sports
},{
    categoryName:"Learning", 
    categoryImage: Sports
},{
    categoryName:"Flash Cards", 
    categoryImage: Sports
},{
    categoryName:"Fun", 
    categoryImage: Sports
}
]
const bookCategoriesFilter = [
    {
        categoryName:"Storybook", 
        categoryImage: Sports
    },
    {
        categoryName:"Board Books", 
        categoryImage: Sports
    },
    {
        categoryName:"Activity Books", 
        categoryImage: Sports
    },
    {
        categoryName:"Puppet Books", 
        categoryImage: Sports
    },
    {
        categoryName:"Cloth Books", 
        categoryImage: Sports
    },{
        categoryName:"Phonics Books", 
        categoryImage: Sports
    },
]
const ageGroupsFilter = [
    {
        categoryName:"0-2", 
        categoryImage: Sports
    },
    {
        categoryName:"2-5", 
        categoryImage: Sports
    },
    {
        categoryName:"5-7", 
        categoryImage: Sports
    },
    {
        categoryName:"7-99", 
        categoryImage: Sports
    }
]
const productSetFilter = [
    {
        categoryName:"1 Toy Set", 
        categoryImage: Sports
    },
    {
        categoryName:"2 Toy Sets", 
        categoryImage: Sports
    },
    
]

const Filters = ({addFilter, removeFilter, applyFiltersHandler}) => {
return(
    <div className="Filters">Filters
    
        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Categories
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {toyCategoriesFilter.map(item=><FilterItem item={item} addFilter={addFilter} removeFilter={removeFilter}></FilterItem>)}
                <button onClick={()=>applyFiltersHandler('category')}>Apply Filters</button>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Age Groups
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {ageGroupsFilter.map(item=><FilterItem item={item} addFilter={addFilter} removeFilter={removeFilter}></FilterItem>)}
                <button  onClick={()=>applyFiltersHandler('ageGroup')}>Apply Filters</button>

                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Product Sets
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {productSetFilter.map(item=><FilterItem item={item} addFilter={addFilter}removeFilter={removeFilter}></FilterItem>)}
                <button  onClick={()=>applyFiltersHandler('toySet')}>Apply Filters</button>

                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    
    </div>
)
}
export default Filters;