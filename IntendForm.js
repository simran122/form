import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const skillsList = [
  "HTML",
  "CSS",
  "React",
  "TypeScript",
  "CSS3",
  "Javascript",
  "JQuery",
];

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    skills: [],
    from: "",
    to: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [records, setRecords] = useState([
    {
      id: uuid(),
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
    },
    {
      id: uuid(),
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phoneNumber: "0987654321",
    },
    // add more static array values here
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const options = e.target.options;
    const selectedSkills = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSkills.push(options[i].value);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedSkills,
    }));
  };

  const handleFromDateChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      from: value,
      to: "",
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const newRecord = {
        id: uuid(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };
      setRecords([...records, newRecord]);
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        phoneNumber: "",
        email: "",
        skills: [],
        from: "",
        to: "",
        description: "",
      });
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      skills: [],
      from: "",
      to: "",
      description: "",
    });
    setFormErrors({});
  };

  const handleEdit = (recordId) => {
    const record = records.find((r) => r.id === recordId);
    setFormData({
      firstName: record.firstName,
      lastName: record.lastName,
      userName: "",
      phoneNumber: record.phoneNumber,
      email: record.email,
      skills: [],
      from: "",
      to: "",
      description: "",
    });
  };

  const handleDelete = (recordId) => {
    const newRecords = records.filter((r) => r.id !== recordId);
    setRecords(newRecords);
  };

  const validateForm = (formData) => {
    let errors = {};
    if (!formData.userName) {
      errors.userName = "Username is required";
    } else if (!/^[a-z]+$/.test(formData.userName)) {
      errors.userName = "Username should contain only small letters";
    } else if (/[\s\W]/.test(formData.userName)) {
      errors.userName = "Username should not contain any special characters or spaces";
    }
  
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number should contain 10 digits only";
    }
  
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
  
    if (!formData.skills || formData.skills.length < 2) {
      errors.skills = "Please select at least two skills";
    }
  
    if (!formData.fromDate || !formData.toDate) {
      errors.experience = "Experience is required";
    } else if (formData.fromDate >= formData.toDate) {
      errors.experience = "To date should be greater than From date";
    }
  
    if (!formData.description) {
      errors.description = "Description is required";
    }
  
    return errors;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  
  
  
  const handleEmailFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filteredRecords = records.filter((record) =>
      record.email.toLowerCase().includes(filterText)
    );
    setRecords(filteredRecords);
  };
  
  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="userName">User Name</label>
          <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="skills">Skills</label>
          <textarea name="skills" id="skills" value={formData.skills} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="totalExperience">Total Experience</label>
          <input type="number" name="totalExperience" id="totalExperience" value={formData.totalExperience} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="button-container">
          <button type="submit">{editMode ? "Update" : "Submit"}</button>
          {editMode && (
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
  }
  
  export default IntendForm;
  