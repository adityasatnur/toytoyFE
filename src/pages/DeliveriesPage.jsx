import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import React from "react";

 
const GlobalFilter=({filter, setFilter})=>{
  return(
    <span>
      Search: {' '}
      <input value={filter || ""} onChange={e=> setFilter(e.target.value)}/>
    </span>
  )
}


 function DeliveriesPage() {
   const handleShow = (prop)=>{
    debugger;
   }
   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
         col3: 'World',
         col4: 'World',
       },
       {
        col1: 'a',
        col2: 'a',
        col3: 'a',
        col4: `a`,
      },
     ],
     []
   )
 
   const columns = React.useMemo(
     () => [
       {
         Header: 'Name',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Address',
         accessor: 'col2',
       },
       {
        Header: 'Pincode',
        accessor: 'col3',
      },

       {
        Header: 'Delivered',
        accessor: 'col4',
        Cell: props => <button className="btn1" onClick={() => handleShow(props)}>Not delivered (Click To change status to Delivered) </button>,

      },
     ],
     []
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
     state, 
     setGlobalFilter
   } = useTable({ columns, data }, useGlobalFilter, useSortBy)
 
   const {globalFilter} = state;
   return (
     <>
     <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map( column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}

                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
                 <span>
                 {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
               </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </>
   )
 }
 export default DeliveriesPage;