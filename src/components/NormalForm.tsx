import React, { useState, useEffect, useRef } from 'react';
import IncEditor from '../IncEditor';
import { ComboBox } from '../ComboBox';

const NormalForm = () => {
  const [date, setDate] = useState<any | null>('');
  const [choreDesc, setChoreDesc] = useState<any | null>(null);
  const [name, setName] = useState<any | null>(null);
  const [data, setData] = useState({});
  // const [comboBox, setComboBox] = useState('');
  const [comboBox] = useState('');

  const comboBoxInput: any = useRef();

  const [choreLogs, setChoreLogs] = useState([]);

  // Add a new chore log
  const addChoreLog = (log: any) => {
    let logs: any = [...choreLogs, log];
    setChoreLogs(logs);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addChoreLog([choreDesc, name, date, comboBox]);
    console.log('formData', { choreDesc, name, date, comboBox });
  };

  // Update data for another form
  const updateData = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      comboBox: ComboBox,
    });
  };

  const setDescription = (e: any) => {
    console.log('react rtf');
  };

  // Another form submission handler
  const submit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  useEffect(() => {
    comboBoxInput.current?.addEventListener('comboBoxInput', (event: any) => {
      console.log(event.detail);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>React Header</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
      />
      <form onSubmit={submit}>
        <input name="email" type="email" onChange={updateData} />
        <br />
        <input name="password" type="password" onChange={updateData} />
        <br />
        <ComboBox value={comboBox} allowInput={'true'} label="Album:"></ComboBox>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NormalForm;
