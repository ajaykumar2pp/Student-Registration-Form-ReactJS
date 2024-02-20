import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import StudentAdd from './students/StudentAdd';
import StudentUpdate from './students/StudentUpdate';
import StudentSearch from './students/StudentSearch';
import { BsPlusLg } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import './App.css';

function App() {

  const [showForm, setShowForm] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  // console.log(editIndex)


  useEffect(() => {
    const savedData = localStorage.getItem('studentData')
    if (savedData) {
      setStudentData(JSON.parse(savedData));
    }

  }, [])

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  const handleClose = () => {
    setEditIndex(null);
    setShowUpdate(false);
  };

  const updateFormData = (data) => {
    let newData;
  
    if (editIndex === null) {
      // Adding new student data
      newData = [...studentData, data];
    } else {
      // Updating existing student data
      newData = [...studentData];
      newData[editIndex] = data;
    }
  
    setStudentData(newData);
  
    // Save data to local storage
    localStorage.setItem('studentData', JSON.stringify(newData));
  };
  


  const handleEdit = (studentId) => {
    const index = studentData.findIndex(student => student.id === studentId);
    
    if (index !== -1) {
      // Set the edit index and selected student
      setEditIndex(index);
      // Set the selected student data
      setSelectedStudent(studentData[index]);
      setShowUpdate(true);
    } else {
      console.error(`Student with id ${studentId} not found.`);
    }
  };


  const updateStudentData = (updatedStudent) => {
    const updatedStudents = [...studentData];
    updatedStudents[editIndex] = updatedStudent;
    setStudentData(updatedStudents);

    // Update local storage
    localStorage.setItem('studentData', JSON.stringify(updatedStudents));
  };



  const deleteData = (id) => {
    const index = studentData.findIndex(item => item.id === id);
    if (index !== -1) {
      const newData = [...studentData.slice(0, index), ...studentData.slice(index + 1)];

      // Update state
      setStudentData(newData);

      // Update local storage
      localStorage.setItem('studentData', JSON.stringify(newData));
    } else {
      console.error(`Element with id ${id} not found.`);
    }
  };

  const performSearch = (searchTerm) => {
    console.log(`Searching for students with term: ${searchTerm}`);
    const results = studentData.filter((student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchError(results.length === 0 ? 'Student not found' : '');
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
        </div>


      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <StudentSearch onSearch={performSearch} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            {searchError ? (
              <h2 className="text-danger text-center">{searchError}</h2>
            ) : (
              <Table striped bordered hover responsive="sm">
                <thead className='text-center'>
                  <tr>
                    <th>Student Image</th>
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
                  {studentData.length > 0 ? (
                    studentData.map((data) => (
                      <tr key={data.id}>
                        <td> <Image src={data.imageFile} className='rounded w-25' /></td>
                        <td>{data.studentName}</td>
                        <td>{data.date}</td>
                        <td>{data.phone}</td>
                        <td>{data.email}</td>
                        <td>{data.fatherName}</td>
                        <td>{data.gender}</td>
                        <td>{data.address}</td>
                        <td>
                          <div className='shadow-sm'>
                            <Button variant='primary me-3' size="sm" onClick={() => handleEdit(data.id)}>
                              <FaPen />
                            </Button>
                            <Button variant='danger' size="sm" onClick={() => deleteData(data.id)}>
                              <IoTrashBin />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No student data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
            {selectedStudent && (
              <StudentUpdate handleClose={handleClose} show={showUpdate} onUpdate={updateStudentData} studentData={selectedStudent}  editIndex={editIndex} 
              />
            )}
          </div>
        </div>
      </div>
      {/* *****  Student Add ******** */}
      <StudentAdd handleClose={handleCloseForm} show={showForm} onSubmit={updateFormData} studentData={studentData} />

    </>
  );
}

export default App;
