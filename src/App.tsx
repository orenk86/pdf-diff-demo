import React from 'react';
import './App.css';
import { MainAppContextProvider } from './MainAppContext';
import InputsContainer from './InputsContainer';
import GenerateReportButton from './GenerateReportButton';
import ReportContainer from './ReportContainer';

function App() {
  return (
    <div className="App">
      <MainAppContextProvider>
        <InputsContainer />
        <GenerateReportButton />
        <ReportContainer />
      </MainAppContextProvider>
    </div>
  );
}

export default App;
