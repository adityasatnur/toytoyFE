
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


const Filters = () => {
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
                    <FilterItem></FilterItem>
                    <FilterItem></FilterItem>
                    <FilterItem></FilterItem>
                    <FilterItem></FilterItem>
                    <FilterItem></FilterItem>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Age Groups
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
b                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                       Product Sets
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
c                   </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    
    </div>
)
}
export default Filters;