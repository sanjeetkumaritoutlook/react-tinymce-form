import React, { useState,useEffect, useRef }  from 'react';
//import logo from './logo.svg';
import './App.css';
import IncEditor from './IncEditor';
import { ComboBox } from './ComboBox';
// const {
//   solutionName,
//   setSolutionName,
//   description,
//   setDescription,
//   solutionDocuments,
//   setSolutionDocuments,
//   repo,
//   setRepo,
// } = useContext(SolutionFormContext);

function App(props: any, ref: any) {
  const [choreLogs, setChoreLogs] = useState([]);
  const addChoreLog = (log: any) => {
    let logs: any = [...choreLogs, log];
    setChoreLogs(logs);
  };

  const [choreDesc, setChoreDesc] = useState<any | null>(null);
  const [name, setName] = useState<any | null>(null);
  //https://reactjs.org/link/controlled-components
  const [date, setDate] = useState<any | null>('');
  const [comboBox] = useState<any | null>(null);
  const handleSubmit = (e: any) => {
    addChoreLog([choreDesc, name, date, comboBox]);
    console.log('formData', e);
    e.preventDefault();
  };
  // const handleComboBox = (e: any) => {
  //   // e.preventDefault();
  //   console.log('combo-box', e);
  // };

  const [data, setData] = useState({});

  const updateData = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      comboBox: comboBox,
    });
  };

  const setDescription = (e: any) => {
   console.log('react rtf');
  };

  const submit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  const comboBoxInput: any = useRef();

  useEffect(() => {
    comboBoxInput.current?.addEventListener('comboBoxInput', (event: any) => {
      console.log(event.detail);

      // setComboBox(event.detail);
    });
  }, []);


  return (
    <div>
    <div>
      <h1>React Header</h1>
    </div>
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label>Chore description:</label>
      <br />
      <input
        name="choreDesc"
        type="text"
        value={choreDesc}
        onChange={(e) => setChoreDesc(e.target.value)}
      />
      <br />
      <label>Name:</label>
      <br />
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Date:</label>
      <br />
      <input
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
     
      <br />
      <input type="submit" value="Add Log" />
    </form>
    <IncEditor
    id={'modal'}
    placeholder={'Describe your your solution in detail.'}
    value="description"
    onChange={setDescription}
   />;
    <form onSubmit={submit}>
      <input name="email" type="email" onChange={updateData} />
      <br />
      <input name="password" type="password" onChange={updateData} />
      <br />
      <ComboBox
        value={comboBox}
        allowInput={'true'}
        label="Album:"
      ></ComboBox>
      <br />
      <button>Submit</button>
    </form>
  </div>

  );
}

export default App;
