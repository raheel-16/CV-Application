import { useState } from 'react'; 
import './App.css';
import { Button } from '@nextui-org/react';
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";

const intro = 'Professional Business Developer with more than four years of experience in the business development processes. Involved in product testing, management, and development of new business opportunities';

const jobs = [
  { id: 0, title: 'Business Development Manager', company: 'AirState Solutions', startdate: [[9], [5]], enddate: '06/2017', place: 'New York, USA', desc: ['Successfully managed $2 - 3 million budget projects and successfully achieved the project scheduled goals.', 'Developed and implemented new marketing and sales plans and defined the strategy for the next 5 years.', 'Reviewed constantly the customer feedback and then suggested ways to improve the processes and customer service levels which increased the satisfaction rate from 81% to 95%.', 'Ensured that new clients will grow into a loyal customer base in a specialist niche market by implementing a new loyalty program.'] },
  { id: 1, title: 'Business Development Assistant', company: 'AirState Solutions', startdate: '08/2012', enddate: '09/2014', place: 'Chicago, USA', desc: ['Increased the customer satisfaction rate by 25% by improving the customer service', 'Planned, supervised, and coordinated daily activity of 3 junior business analysts', 'Improved the communication with the Marketing department to better understand the competitive position.', 'Directed the creation and implementation of a Business Continuity Plan, and the management of audit programs'] }
];

const degreesData = [
  { id: 0, title: 'Msc in Economics and Business Administration', place: 'The University of Chicago', startdate: '09/2008', enddate: '06/2010' }
];

function App() {
  // Preloaded info
  const [fullName, setFullName] = useState('John Doe');
  const [career, setCareer] = useState('Business Development Manager');
  const [information, setInformation] = useState(intro);
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [number, setNumber] = useState('999-999-9999');
  const [address, setAddress] = useState('New York, USA');

  // Data
  const [degrees, setDegrees] = useState(degreesData);
  const [newJob, setNewJob] = useState(jobs)

  // Empty data
  const [newCareer, setNewCareer] = useState({title: '', company: '', desc: ['']})
  const [newEducation, setNewEducation] = useState({ title: '', place: '', startdate: '', enddate: '' });

  // UI state
  const [showNewCareer, setShowNewCareer] = useState(false);
  const [showNewTask, setShowNewTask] = useState([]);
  const [showExperienceInputs, setShowExperienceInputs] = useState(null)
  const [showInputs, setShowInputs] = useState(false);
  const [showSchoolInput, setSchoolInput] = useState(false);
  const [hideExperience, setExperience] = useState(false);




  const [showNewEducationSection, setShowNewEducationSection] = useState(false);

  const openSchool = (id) => {
    setSchoolInput(id === showSchoolInput ? null : id);
  };

  const openExperiences = () => {
    setExperience(!hideExperience);
  };

  const openNewExperiences = (id) => {
    setShowExperienceInputs(id === showExperienceInputs ? null : id)
  }

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  const handlePlaceChange = (e, degreeId) => {
    const updatedDegrees = degrees.map(degree => {
      if (degree.id === degreeId) {
        return { ...degree, place: e.target.value };
      }
      return degree;
    });
    setDegrees(updatedDegrees);
  };


  const handleDegreeChange = (e, degreeId) => {
    const newDegree = degrees.map(degree => {
      if (degree.id === degreeId) {
        return { ...degree, title: e.target.value };
      }
      return degree;
    });
    setDegrees(newDegree);
  };

  const handleStartDateChange = (e, degreeId) => {
    const newDegree = degrees.map(degree => {
      if (degree.id === degreeId) {
        return { ...degree, startdate: e.target.value };
      }
      return degree;
    });
    setDegrees(newDegree);
  };

  const handleEndDateChange = (e, degreeId) => {
    const newDegree = degrees.map(degree => {
      if (degree.id === degreeId) {
        return { ...degree, enddate: e.target.value };
      }
      return degree;
    });
    setDegrees(newDegree);
  };

  function handleFullNameChange(e) {
    setFullName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  function handleCareerChange(e) {
    setCareer(e.target.value);
  }

  function handleInfoChange(e) {
    setInformation(e.target.value);
  }

  function handleNewEducationChange(e) {
    const { name, value } = e.target;
    setNewEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleNewExperience(e) {
    const { name, value } = e.target;
    setNewCareer(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function addNewEducation() {
    const newId = degrees.length > 0 ? degrees[degrees.length - 1].id + 1 : 0;
    setDegrees(prevDegrees => [
      ...prevDegrees,
      {
        id: newId,
        ...newEducation
      }
    ]);
    setNewEducation({ title: '', place: '', date: '' });
    setShowNewEducationSection(false);
  }

  function addNewExperience() {
    const newId = jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 0;
    setNewJob(prevJob => [
      ...prevJob,
      {
        id: newId,
        ...newCareer
      }
    ]);
    setNewCareer({ title: '', company: '', desc: [''] });
    setShowNewCareer(false);
  }
  

  function saveEducation(degreeId) {
    const updatedDegrees = degrees.map(degree => {
      if (degree.id === degreeId) {
        return { ...degree, ...newEducation };
      }
      return degree;
    });
    setDegrees(updatedDegrees);
    setNewEducation({ title: '', place: '', date: '' });
    setShowNewEducationSection(false);
  }
  

  function cancelNewEducation() {
    setNewEducation({ title: '', place: '', date: '' });
    setShowNewEducationSection(false);
  }


  function deleteEducation(id) {
    setDegrees(prevDegrees => prevDegrees.filter(degree => degree.id !== id));
  }

  function deleteExperience(id) {
    setNewJob(prevExperince => prevExperince.filter(job => job.id !== id));
  }

  const handleAddFieldNewInput = (jobId) => {
      setShowNewTask(prevJobs => {
        const updatedJobs = prevJobs.map(job => {
          if (job.id === jobId) {
            return {
              ...job,
              desc: [...job.desc, ''] // Initialize a new task field
            };
          }
          return job;
        });
        return updatedJobs;
      })
    }
  



  function cancelNewExperience() {
    setNewCareer({ title: '', company: '', desc: '' });
    setShowNewCareer(false);
  }


  function saveExperience(jobId) {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, ...newCareer };
      }
      return job;
    });
    setNewJob(updatedJobs);
    setNewCareer({ title: '', company: '', desc: '' }); // Reset only the desc property
    setShowNewCareer(false);
  }

  const handleNewCareerChange = (e, degreeId) => {
    const newCareer = jobs.map(job => {
      if (job.id === degreeId) {
        return { ...job, title: e.target.value };
      }
      return job;
    });
    setNewJob(newCareer);
  };
  
  const handleCompanyChange = (e, jobId) => {
    const updatedJobs = newJob.map(job => {
      if (job.id === jobId) {
        return { ...job, company: e.target.value };
      }
      return job;
    });
    setNewJob(updatedJobs);
  };
  
  

  function newPage() {
    setAddress('');
    setCareer('');
    setFullName('');
    setEmail('');
    setInformation('');
    setNumber('');
  }

  function loadPage() {
    setFullName('John Doe');
    setCareer('Business Development Manager');
    setInformation(intro);
    setEmail('john.doe@gmail.com');
    setNumber('999-999-9999');
    setAddress('New York, USA');
  }

  return (
    <>
      <div className='main'>
        <div className='side-content'>
          <div className='header-buttons'>
            <div className='header-button-clear'>
              <Button className="w-full" color="danger" variant="ghost" onClick={newPage}>Clear</Button>
            </div>
            <div><Button color="primary" variant="ghost" onClick={loadPage}>Example Resume</Button></div>
          </div>
          <div className='personal-details my-5'>
            <h2 className='text-2xl font-bold'>Personal Details</h2>
            <div className='personal-input mt-5'>
              <label className="full-name">
                <p className="mb-2 mt-0 text-lg font-small leading-tight text-black">Full Name</p>
              </label>
              <Input isRequired label="Name" defaultValue="junior@nextui.org" className="max-w-xs" type="text" id="full-name-input" value={fullName} onChange={handleFullNameChange} />
            </div>
            <div className='personal-input mt-5'>
              <label className="career-input">
                <p className="mb-2 mt-0 text-lg font-small leading-tight text-black">Career</p>
              </label>
              <Input isRequired type="text" label="Career" defaultValue="junior@nextui.org" className="max-w-xs" id="career-Textinput" value={career} onChange={handleCareerChange} />
            </div>
            <div className='personal-input mt-5'>
              <label className="email-input">
                <p className="mb-2 mt-0 text-lg font-small leading-tight text-black">Email</p>
              </label>
              <Input isRequired type="email" label="Email" defaultValue="junior@nextui.org" className="max-w-xs" id="email-input" value={email} onChange={handleEmailChange} />
            </div>
            <div className='personal-input mt-5'>
              <label className="number-input">
                <p className="mb-2 mt-0 text-lg font-small leading-tight text-black">Phone Number</p>
              </label>
              <Input isRequired label="Phone Number" defaultValue="junior@nextui.org" className="max-w-xs" type='number' placeholder='Phone Number' id="number-input" value={number} onChange={handleNumberChange} />
            </div>
            <div className='personal-input mt-5'>
              <label className="address-input">
                <p className="mb-2 mt-0 text-lg font-small leading-tight text-black">Address</p>
              </label>
              <Input isRequired label="Address" defaultValue="junior@nextui.org" className="max-w-xs" type='address' placeholder='Address' id="address-input" value={address} onChange={handleAddressChange} />
            </div>
            <div className='personal-input mt-5'>
              <label className="info-input">
                <p className="mb-2 mt-0 text-lg font-small leading-tight text-black">Description</p>
              </label>
              <Textarea label="Description" value={information} onChange={handleInfoChange} placeholder="Enter your description" className="max-w-xs"/>
            </div>
          </div>
          <div className='education-input'>
            <div>
              <div className='education-input-header'>
                <div><h2 className='text-2xl font-bold'>Education</h2></div>
                <div><Button className='w-full' color="primary" variant="light" onClick={toggleInputs}>{showInputs ? 'v' : '^'}</Button></div>
              </div>

                {!showInputs && (
                  <div>
                    {degrees.map(degree => (
                      <div key={degree.id}>
                        <Button color="primary" variant="flat" onClick={() => openSchool(degree.id)}>{degree.place}</Button>
                        {showSchoolInput == degree.id && (
                          <div className='degree-inputs'>
                            <div>
                              <p>School</p>
                              <Input type='text' placeholder="School" value={degree.place} onChange={(e) => handlePlaceChange(e, degree.id)} />
                            </div>
                            <div>
                              <p>Degree</p>
                              <Input type="text" placeholder="Degree" value={degree.title} onChange={(e) => handleDegreeChange(e, degree.id)} />
                            </div>
                            <div>
                              <p>Start Date</p>
                              <Input type='date' placeholder="Start Date" value={degree.startdate} onChange={(e) => handleStartDateChange(e, degree.id)}/>
                            </div>
                            <div>
                              <p>End Date</p>
                              <Input type='date' placeholder="End Date" value={degree.enddate} onChange={(e) => handleEndDateChange(e, degree.id)}/>
                            </div>
                            <Button color="danger"variant="ghost" onClick={() => deleteEducation(degree.id)}>Delete</Button>
                            <Button color="primary" variant="ghost" onClick={() => saveEducation(degree.id)}>Save</Button>
                            
                          </div>
                        )}
                      </div>
                    ))}
                    <div>
                    {showNewEducationSection ? (
                    <div>
                      <h3>Add New Education</h3>
                      <Input type="text" name="title" placeholder="Title" value={newEducation.title} onChange={handleNewEducationChange} />
                      <Input type="text" name="place" placeholder="Place" value={newEducation.place} onChange={handleNewEducationChange} />
                      
                      <Input type="text" name="date" placeholder="Date" value={newEducation.date} onChange={handleNewEducationChange} />
                      <Button color="primary" variant="ghost" onClick={addNewEducation}>Save</Button>
                      <Button color="danger"variant="ghost" onClick={cancelNewEducation}>Cancel</Button>
                    </div>
                  ) : (
                    <Button color="primary" variant="solid" onClick={() => setShowNewEducationSection(true)}>Add New Education</Button>
                  )}
                    </div>
                  </div>
                )}
              
            </div>
          </div>
          <div className='experience-input'>
            <h2 className='text-2xl font-bold'>Experience</h2>
            <Button color="primary" variant="light" onClick={openExperiences}>{hideExperience ? 'v' : '^'}</Button>
              {!hideExperience && (
            <div className='experience-input-header'>
              {newJob.map(job => (
                <div key={job.id}>
                  <Button color="primary" variant="flat"  onClick={() => openNewExperiences(job.id)}>{job.title}</Button>
                  {showExperienceInputs === job.id && (
                    <div>
                      <div>
                        <p>Career</p>
                        <Input isRequired type="text" placeholder="Career" value={job.title} label="Career" defaultValue="junior@nextui.org" className="max-w-xs" id="career-Textinput" onChange={(e) => handleNewCareerChange(e, job.id)} />
                      </div>
                      <div>
                        <p>Company</p>
                        <Input type="text" placeholder='Company' value={job.company} onChange={(e) => handleCompanyChange(e, job.id)} />

                      </div>
                      <div>
                        <p>Tasks</p>
                        <button className='addNewTask' onClick={() => handleAddFieldNewInput(job.id)}>+</button>
                      </div>
                      <Button color="danger" variant="ghost"   onClick={() => deleteExperience(job.id)}>Delete</Button>
                      <Button color="primary" variant="ghost"  onClick={() => saveExperience(job.id)}>Save</Button>
                    </div>
                  )}
                </div>
              ))}
             <div>
                {showNewCareer ? (
                  <div className='newExperinceInput'>
                    <h3>Add New Experience</h3>
                    <Input type="text" name="title" placeholder="Title" value={newCareer.title} onChange={handleNewExperience} />
                    <Input type="text" name="company" placeholder="Company" value={newCareer.company} onChange={handleNewExperience} />
                    <Input type="text" name="desc" placeholder="Tasks" value={newCareer.desc} onChange={handleNewExperience} />
                    <Button color="danger" variant="ghost"  onClick={addNewExperience}>Save</Button>
                    <Button color="primary" variant="ghost"  onClick={cancelNewExperience}>Cancel</Button>
                  </div>
                ) : (
                  <Button color="primary" variant="solid"  onClick={() => setShowNewCareer(true)}>Add New Experience</Button>
                )}
              </div>
            </div>
            )}
          </div>
        </div>
        <div className='main-content'>
          <div className='header'>
            <div className='header-text'>
              <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">{fullName}</h1>
            </div>
            <h3 className='career-header text-gray-500 text-2xl'>{career}</h3>
            <p>{information}</p>
            <ul className='info my-5'>
              <div className='info-text'>
                <img className='size-10' src="mail.png" alt="Mail" />
                <p className="mail-input">{email}</p>
              </div>
              <div className='info-text'>
                <img className='size-10' src="phone.png" alt="" />
                <p className='phone-number-input'>{number}</p>
              </div>
              <div className='info-text'>
                <img className='size-10' src="pin.png" alt="" />
                <p className='main-address-input'>{address}</p>
              </div>
            </ul>
          </div>
          <div className='header-text'>
            <h2 className='text-2xl font-bold mb-5'>Work Experience</h2>
          </div>
          <div className='my-5'>
            {jobs.map(job => (
              <div className='my-5' key={job.id}>
                <p className='job-title'>{job.title}</p>
                <h4 className='text-xl'>{job.company}</h4>
                <div className='flex justify-between'>
                  <div className='flex italic text-gray-500'>
                    <p>{job.startdate}</p>
                    <p>-</p>
                    <p>{job.enddate}</p>
                  </div>
                  <div className='flex italic text-gray-500'>
                    <p>{job.place}</p>
                  </div>
                </div>
                <dl>
                  {job.desc.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className='education'>
            <div className='header-text'>
              <h2 className='text-2xl font-bold'>Education</h2>
            </div>
            <div className='education-area'>
              {degrees.map(degree => (
                <div className='my-3' key={degree.id}>
                  <p className='degree-title'>{degree.title}</p>
                  <p>{degree.place}</p>
                  <div className='flex italic text-gray-500'>
                    <p>{degree.startdate}</p>
                    <p>-</p>
                    <p>{degree.enddate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
