import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // State pentru afișarea formularului

  const [employeeData, setEmployeeData] = useState({
    name: "",
    dob: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get("http://localhost:3001/employee")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleDeleteBtn = (employeeID) => {
    axios.delete(`http://localhost:3001/employee/${employeeID}`)
      .then((res) => {
        console.log("Employee deleted successfully");
        // Actualizează lista de angajați după ștergere
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(employeeData);
  }, [employeeData]);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/employee", employeeData)
      .then((res) => {
        console.log("Employee added successfully");
        
        setEmployeeData({
          name: "",
          dob: "",
          phone: "",
          role: "",
        });
        
        setShowAddForm(false);
        
        
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        
      });
  };

  useEffect(()=>{

    fetchEmployees();
  },[employees])

  return (
    <div className='dashboard-container'>
      <div className="left-side-dashboard">
        <div className="circle-profile-photo">
          <img src="https://s3-alpha-sig.figma.com/img/5190/4ace/2e993e1d2f261b71f62704ad3f8df3f4?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ENZYUSbducG2HyuQPbrDqn0Xt-tTkCcp-p99PmcKx9krf2KgFkH4qXxgaV2I4y16n~2pHA0u2Q-VLZp3zwXdjE1z~UeEBGRP9FKAzXB~zn70eWtEqaC9A5dn~LVhnfXQ5HNw8ZxyMx9t-vbKL9xfUgjD9HUdIH-4aPgda7jF4clr3JU48NuPvawqXrVbFnVOJ4VWkquSaeAi6z6zdR0zWIk8VE~kEk1N3bqwXYR~kLsVDnBOnUcK8Kc7Q1HTH3wyOZs5~bNZfR~VjFRFblFPXnbdwym2V7ZS-tS90gLTgL~P22ZMoT0octqmEujc-ddw7GKJ6O5Qab3UdxhK54Cxkw__" alt="Profile" />
        </div>
        <p className='employee-username'>Popescu Mihnea Petru</p>
      </div>
      <div className="right-side-dashboard">
        <h1 className='hi-manager-text'>Hi, Manager</h1>
        <div className="searh-bar-employee">
          <input type="text" placeholder=' Search : name,id, ...' />
        </div>
        <div className="employee-table">

          <button className='add-emp-btn' onClick={toggleAddForm}>Add Employee</button>

          <table border="1" >
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Dob</th>
                <th>Phone</th>
                <th>Role</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.role}</td>
                  <td><button onClick={() => handleDeleteBtn(employee.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddForm && (
        <div className="dark-overlay">
          <div className="add-form-container">
            <form  onSubmit={handleAddEmployee} className='add-employee-form'>
              <div className="input-row-add-employee">
                <label htmlFor="">Name</label>
                <input type="text" name="name" value={employeeData.name} onChange={handleEmployeeInputChange} />
              </div>
              <div className="input-row-add-employee">
                <label htmlFor="">Dob</label>
                <input type="text" name="dob" value={employeeData.dob} onChange={handleEmployeeInputChange} />
              </div>
              <div className="input-row-add-employee">
                <label htmlFor="">Phone</label>
                <input type="text" name="phone" value={employeeData.phone} onChange={handleEmployeeInputChange} />
              </div>
              <div className="input-row-add-employee">
                <label htmlFor="">Role</label>
                <input type="text" name="role" value={employeeData.role} onChange={handleEmployeeInputChange} />
              </div>
              <button type='submit' className='submit-employee-form-btn'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
