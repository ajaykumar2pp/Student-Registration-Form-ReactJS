import React, { useState } from 'react';
import { debounce } from './debounce';
const StudentSearch = ({ onSearch }) => {

    const [searchTerm, setSearchTerm] = useState('');

    // Create a debounced version of the search function
    const debouncedSearch = debounce((term) => {
      onSearch(term);
    }, 300); // Adjust the delay as needed

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    
        // Call the debounced search function
        debouncedSearch(term);
      };
  return (
    <div className='mt-4 mb-4'>
    <input
    
      type="text"
      className="form-control"
      placeholder="Search students"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
  )
}

export default StudentSearch