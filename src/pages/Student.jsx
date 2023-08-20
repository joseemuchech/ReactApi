import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading';

const Student = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState([true]);


useEffect(() => {
    axios.get(`http://localhost:8000/api/student`).then(res=>{
       console.log(res)
       setStudents(res.data.student)
       setLoading(false)
    })
} ,[]);

const deleteStudent=(e, id) =>{
  e.preventDefault();
    
   const thisClicked = e.currentTarget;
   thisClicked.innerText = "Deleting...";

   axios.delete(`http://localhost:8000/api/student/${id}/delete`)
   .then(res=>{
      alert(res.data.message);
      thisClicked.closest("tr").remove();

   }).catch( function(error){
     if(error.response){
           if(error.response.status === 404){
             alert(error.response.message)
              thisClicked.innerText = "Delete";
         }
           if(error.response.status === 500){
               alert(error.response.data)
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

var studentDetails = "";
studentDetails = students.map((item) => {
  return(
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.course}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
         <Link to={`/student/${item.id}/edit`} className="btn btn-success" >Edit</Link>
      </td>
      <td>
          <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger">Delete</button>
      </td>
    

    </tr>
  )
})
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
           <div className="card">
            <div className="card-header">
              <h4>Student List
                <Link to="/student/create "className="btn btn-primary float-end" >Add Student</Link>
              </h4>
            </div>
            <div className="card-body">
               <table className="table table-striped table-bordered">
                 <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                 </thead>
                 <tbody>
                   {studentDetails}
                 </tbody>
               </table>
            </div>
           </div>
        </div>
      </div>


    </div>
  )
}

export default Student