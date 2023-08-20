import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading';


const StudentCreate = () => {

    const navigate = useNavigate();
    const [loading, setLoading]= useState(false)
    const [inputErrorList,setInputErrorList] = useState({})

    const [student, setStudent] = useState({
        name:'',
        course:'',
        email:'',
        phone:''
    });
 
    const handleInput= (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value })  
    }

    const saveStudent = (e) =>{
        e.preventDefault();

        setLoading(true)

        const data = {
           name: student.name,
           course: student.course,
           email: student.email,
           phone: student.phone
        }
       axios.post(`http://localhost:8000/api/student`, data).then( res => {
              alert(res.data.message);
              navigate('/student');
              setLoading(false)
       }).catch( function(error){
              if(error.response){
                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
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

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-12">
         <div className="card">
          <div className="card-header">
            <h4> Create Student
              <Link to="/student "className="btn btn-primary float-end" >Back</Link>
            </h4>
          </div>
          <div className="card-body">
                 <form onSubmit={saveStudent}>
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
                       <button type="submit" className="btn btn-primary">Save Student</button>
                     </div>

                 </form>
          </div>
         </div>
      </div>
    </div>


  </div>
  )
}

export default StudentCreate