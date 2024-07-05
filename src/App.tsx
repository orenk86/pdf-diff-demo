import React from 'react';
import './App.css';
import { MainAppContextProvider } from './MainAppContext';
import InputsContainer from './InputsContainer';
import GenerateReportMenu from './GenerateReportMenu';
import ReportContainer from './ReportContainer';

function App() {
  return (
    <div className="App">
      <MainAppContextProvider>
        <InputsContainer />
        <GenerateReportMenu />
        <ReportContainer />
      </MainAppContextProvider>
    </div>
  );
}

export default App;
