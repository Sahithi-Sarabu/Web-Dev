import React from 'react';

const Filter = ({onFilter, onSort, onRefresh}) =>{

    const filtertasks = (e) => {
        const filterTask  = e.target.value;
        onFilter(filterTask);
    } 

    const sortAsc = (e) => {
        onSort(e.target.value);
    }

    const sortDesc = (e) => {
        onSort(e.target.value);
    }

    const sortDone = (e) => {
        onSort(e.target.value);
    }

    const sortNotDone = (e) => {
        onSort(e.target.value);
    }

    const send = (e) => {
        e.target.previousElementSibling.value = 'All';
        onSort('');
        onFilter('All');
    }


    return (
        <div className="filters">
            <input className="radio" type="radio" id="radio" name="task" onClick={sortAsc} value="Sort Ascending Name"/>
            <label className="radio">Sort Ascending Name</label>
            <input className="radio" type= "radio" id="radio" name="task" onClick={sortDesc} value="Sort Descending Name"/>
            <label className="radio">Sort Descending Name</label>
            <input className="radio" type="radio" id="radio" name="task" onClick= {sortDone} value="Sort By Done"/>
            <label className="radio" >Sort By Done</label>
            <input className="radio" type="radio" id="radio" name="task" onClick={sortNotDone} value="Sort By Not Done"/>
            <label className="radio" >Sort By Not Done </label>
            <label className="filter" >Show</label>
            <select className="filter" onChange={ filtertasks }>
                <option>All</option>
                <option>Done</option>
                <option>Not Done</option>
            </select>
            <button className="refresh" onClick={send}>Refresh</button>
        </div>
    )
};

export default Filter;