
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
import activityBook from "../assets/icons/activity-book.png";
import boardBooks from "../assets/icons/board-bookks.png";
import clothBooks from "../assets/icons/cloth-book.png";
import deliveryTruck from "../assets/icons/delivery-truck.png";
import fun from "../assets/icons/fun.png";
import learning from "../assets/icons/learning.png";
import search from "../assets/icons/search.png";
import jigSawPuzzle from "../assets/icons/jig-saw-puzzle.png";
import learnThroughPlay from "../assets/icons/learn-through-to-play.png";
import phonicsBook from "../assets/icons/phonics-book.png";
import pretendPlay from "../assets/icons/pretend-play.png";
import puppetBook from "../assets/icons/puppet-book.png";
import storyBook from "../assets/icons/Story-book.png";
import gamesWithFamily from "../assets/icons/games-with-family.png";
import flashCard from "../assets/icons/Flash-Card.png";
import buildingBlocks from "../assets/icons/building-blocks.png";
import set1 from "../assets/icons/1set.png";
import set2 from "../assets/icons/2set.png";
import age1 from "../assets/icons/0-2.png";
import age2 from "../assets/icons/2-5.png";
import age3 from "../assets/icons/5-7.png";
import age4 from "../assets/icons/7-99.png";
import { useHistory } from "react-router-dom";

const toyCategoriesFilter = [
    {
    categoryName:"Sports", 
    categoryImage: Sports
},
{
    categoryName:"Jig-Saw Puzzle", 
    categoryImage: jigSawPuzzle
},
{
    categoryName:"Pretend Play", 
    categoryImage: pretendPlay
},
{
    categoryName:"Building Blocks", 
    categoryImage: buildingBlocks
},
{
    categoryName:"Games for the family", 
    categoryImage: gamesWithFamily
},{
    categoryName:"Learn through play", 
    categoryImage: learnThroughPlay
},{
    categoryName:"Learning", 
    categoryImage: learning
},{
    categoryName:"Flash Cards", 
    categoryImage: flashCard
},{
    categoryName:"Fun", 
    categoryImage: fun
}
]
const bookCategoriesFilter = [
    {
        categoryName:"Storybook", 
        categoryImage: storyBook
    },
    {
        categoryName:"Board Books", 
        categoryImage: boardBooks
    },
    {
        categoryName:"Activity Books", 
        categoryImage: activityBook
    },
    {
        categoryName:"Puppet Books", 
        categoryImage: puppetBook
    },
    {
        categoryName:"Cloth Books", 
        categoryImage: clothBooks
    },{
        categoryName:"Phonics Books", 
        categoryImage: phonicsBook
    },
]
const ageGroupsFilter = [
    {
        categoryName:"0-2", 
        categoryImage: age1
    },
    {
        categoryName:"2-5", 
        categoryImage: age2
    },
    {
        categoryName:"5-7", 
        categoryImage: age3
    },
    {
        categoryName:"7-99", 
        categoryImage: age4
    }
]
const productSetFilter = [
    {
        categoryName:"1 Toy Set", 
        categoryImage: set1
    },
    {
        categoryName:"2 Toy Sets", 
        categoryImage: set2
    },
    
]

const Filters = ({addFilter, removeFilter, applyFiltersHandler}) => {
    const history = useHistory();
return(
    <div className="Filters">Filters
    
        <Accordion allowZeroExpanded={true}>
            {history.location.state==undefined || history.location.state.filteredData!=="book"?
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Toys Categories
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {toyCategoriesFilter.map(item=><FilterItem item={item} addFilter={addFilter} removeFilter={removeFilter} key={item._id}></FilterItem>)}
                <button onClick={applyFiltersHandler}>Apply Filters</button>
                </AccordionItemPanel>
            </AccordionItem>
            :null}
            {history.location.state==undefined || history.location.state.filteredData!=="toy"?

            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Books Categories
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {bookCategoriesFilter.map(item=><FilterItem item={item} addFilter={addFilter} removeFilter={removeFilter}  key={item._id}></FilterItem>)}
                <button onClick={applyFiltersHandler}>Apply Filters</button>
                </AccordionItemPanel>
            </AccordionItem>
            :null}

            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Age Groups
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {ageGroupsFilter.map(item=><FilterItem item={item} addFilter={addFilter} removeFilter={removeFilter}  key={item._id}></FilterItem>)}
                <button  onClick={applyFiltersHandler}>Apply Filters</button>

                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Product Sets
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                {productSetFilter.map(item=><FilterItem item={item} addFilter={addFilter}removeFilter={removeFilter}  key={item._id}></FilterItem>)}
                <button  onClick={applyFiltersHandler}>Apply Filters</button>

                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    
    </div>
)
}
export default Filters;