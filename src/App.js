import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import StudentAdd from './StudentAdd';
import StudentUpdate from './StudentUpdate';
import { BsPlusLg } from "react-icons/bs";
import Table from 'react-bootstrap/Table';
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import StudentSearch from './StudentSearch';



function App() {

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  const handleClose = () => {
    setEditIndex(null);
    setShowUpdate(false);
  };


  useEffect(() => {
    const savedData = localStorage.getItem('studentData')
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

  }, [])

  const updateFormData = (data) => {
    const newData = [...formData, data];
    setFormData(newData);

    // save data to local storage
    localStorage.setItem('studentData', JSON.stringify(newData));
  };


  const updateStudentData = (updatedData) => {
    const updatedFormData = [...formData];
    updatedFormData[editIndex] = updatedData;
    setFormData(updatedFormData);

    // Update local storage
    localStorage.setItem('studentData', JSON.stringify(updatedFormData));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setSelectedStudent(formData[index]);
    setShowUpdate(true);
  };


  const deleteData = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);

    // Update local storage after deletion
    localStorage.setItem('studentData', JSON.stringify(newData));
  };
  
  const performSearch = (searchTerm) => {
    console.log(`Searching for students with term: ${searchTerm}`);
    // Perform the search logic to filter students based on the search term
    const results = formData.filter((student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update searchResults and searchError based on the results
    if (results.length > 0) {
      setSearchResults(results);
      setSearchError('');
    } else {
      setSearchResults([]);
      setSearchError('Student not found');
    }
  };

  return (
    <>

      <nav className="navbar bg-light py-3">
        <div className="container">
          <div >
            <span className="navbar-brand mb-0 h1">Student Directories</span>
          </div>
          <div>
            <Button className='btn-primary' onClick={handleShowForm}>
              <BsPlusLg className='me-2 text-white' />  Add Student
            </Button>
          </div>

          {/* *****  Student Add ******** */}
          <StudentAdd handleClose={handleCloseForm} show={showForm} onSubmit={updateFormData} editIndex={editIndex} formData={formData} />


        </div>


      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
          <StudentSearch onSearch={performSearch} />
          </div>
        </div>
        <div className="row justify-content-center ">
          <div className="col-md-12">
            
            {searchError ? (
              <h2 className="text-danger text-center">{searchError}</h2>
            ) : (
              <Table striped bordered hover responsive="sm">
              <thead className='text-center'>
                <tr>
                  <th>Student Name</th>
                  <th>DOB</th>
                  <th>Phone Number</th>
                  <th>Email Id</th>
                  <th>Father Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>

                {formData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.studentName}</td>
                    <td>{data.date}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.fatherName}</td>
                    <td>{data.gender}</td>
                    <td>{data.address}</td>
                    <td>
                      <div className=' shadow-sm' >
                        <Button variant='me-3 text-primary'
                          onClick={() => handleEdit(index)}
                        >
                          {/* onClick={() => setShowUpdate(true)}> */}
                          <FaPen />
                        </Button>
                        <Button variant='text-danger' onClick={() => deleteData(index)} >
                          <IoTrashBin className='text-danger' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            )}
           

            <StudentUpdate handleClose={handleClose} show={showUpdate} onUpdate={updateStudentData} studentData={selectedStudent} />
          </div>
        </div>
      </div>
    </>


  );
}

export default App;
