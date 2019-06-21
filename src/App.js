import React, { Component } from 'react';
import VariableForm from './components/VariableForm'
import LogicGateForm from './components/LogicGate'
import ResultTable from './components/ResultTable'

class App extends Component {

  state = {
    targetList: [],
    variables: {
      w1: "",
      w2: "",
      b: "",
      learning_rate: "",
    },
  }

  handleVariableFormChange = (variables) => {
    this.setState({ variables })
  }

  handleLogicFormChange = (targetList) => {
    this.setState({ targetList })
  }

  render() { 
    return (
      <div className="App">
        <h1>Simple JST that count :v - updated v0.2</h1>
        <LogicGateForm 
          targetList={this.state.targetList}
          onChange={this.handleLogicFormChange} 
        />
        <VariableForm 
          variables={this.state.variables}
          onChange={this.handleVariableFormChange} 
        />
        <ResultTable 
          targetList={this.state.targetList}
          variables={this.state.variables}

          // targetList={[
            // { p1: 0, p2: 0, t: 0 },
            // { p1: 0, p2: 1, t: 0 },
            // { p1: 1, p2: 0, t: 0 },
            // { p1: 1, p2: 1, t: 1 },

            // { p1: 0, p2: 0, t: 0, },
            // { p1: 0, p2: 1, t: 1, },
            // { p1: 1, p2: 0, t: 1, },
            // { p1: 1, p2: 1, t: 0, },
          // ]}
          // variables={{
          //   w1: 0.3,
          //   w2: 0.1,
          //   b: 0.2,
          //   learning_rate: 0.2,
          // }}
        />
      </div>
    );
  }

}

export default App;
