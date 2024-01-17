import React, { Fragment } from 'react';
import './App.css';

//components
import Input from './components/Input';
import ListNotes from './components/List';

function App() {
  return (
    <Fragment>
      <div className='container'>
      <Input />
      <ListNotes />
      </div> 

    </Fragment>
  )
}

export default App;
