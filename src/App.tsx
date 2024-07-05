import React from 'react';
import './App.css';
import { MainAppContextProvider } from './MainAppContext';
import InputsContainer from './InputsContainer';
import GenerateReportButtons from './GenerateReportButtons';
import ReportContainer from './ReportContainer';

function App() {
  return (
    <div className="App">
      <MainAppContextProvider>
        <InputsContainer />
        <GenerateReportButtons />
        <ReportContainer />
      </MainAppContextProvider>
    </div>
  );
}

export default App;
