import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading';


const StudentEdit = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const [loading, setLoading]= useState(true) 
    const [inputErrorList,setInputErrorList] = useState({})

    const [student, setStudent] = useState({});
 
    const handleInput= (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value })  
    }

    useEffect(() => {
      axios.get(`http://localhost:8000/api/student/${id}/edit`)
      .then(res=>{
         console.log(res)
         setStudent(res.data.student)
         setLoading(false)
      }).catch( function(error){
        if(error.response){
              if(error.response.status === 404){
                alert(error.response.message)
                setLoading(false)
            }
              if(error.response.status === 500){
                  alert(error.response.data)
                  setLoading(false)
              }
        }
 })
  } ,[id])

    const updateStudent = (e) =>{
        e.preventDefault();

        setLoading(true)

        const data = {
           name: student.name,
           course: student.course,
           email: student.email,
           phone: student.phone
        }
       axios.put(`http://localhost:8000/api/student/${id}/update`, data)
         .then( res => {
              alert(res.data.message);
              navigate('/student');
              setLoading(false)
       }).catch( function(error){
              if(error.response){
                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
                        setLoading(false)
                    }
                    if(error.response.status === 404){
                      alert(error.response.message)
                      setLoading(false)
                  }
                    if(error.response.status === 500){
                        alert(error.response.data)
                        setLoading(false)
                    }
              }
       })

    }

    if(loading){
        return (
          <div>
          <Loading />
        </div>
        )
      }

      if(Object.keys(student).length === 0){
        return (
          <div className="container mt-3">
            <h4 className="text-danger">No Such Student Id Found!</h4>
          </div>
        )
      }

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-12">
         <div className="card">
          <div className="card-header">
            <h4> Edit Student
              <Link to="/student "className="btn btn-primary float-end" >Back</Link>
            </h4>
          </div>
          <div className="card-body">
                 <form onSubmit={updateStudent}>
                     <div className="mb-3">
                        <label >Name</label>
                        <input type="text"  className="form-control" value={student.name} onChange={handleInput} name="name" />
                        <span className='text-danger'>{inputErrorList.name}</span>
                     </div>
                     <div className="mb-3">
                        <label >Course</label>
                        <input type="text"  className="form-control" value={student.course}  onChange={handleInput}  name="course" />
                        <span className='text-danger'>{inputErrorList.course}</span>

                     </div>
                     <div className="mb-3">
                        <label >Email</label>
                        <input type="text"  className="form-control" value={student.email}  onChange={handleInput}  name="email" />
                        <span className='text-danger'>{inputErrorList.email}</span>
                     </div>
                     <div className="mb-3">
                        <label >Phone</label>
                        <input type="text"  className="form-control" value={student.phone}  onChange={handleInput}  name="phone" />
                        <span className='text-danger'>{inputErrorList.phone}</span>
                     </div>
                     <div className="mb-3">
                       <button type="submit" className="btn btn-primary">Update Student</button>
                     </div>

                 </form>
          </div>
         </div>
      </div>
    </div>


  </div>
  )
}

export default StudentEdit