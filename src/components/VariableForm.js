import React, { Component } from 'react';

class VariableForm extends Component {
  makePayload = (name, value) => {
    const newVariables = {...this.props.variables}
    newVariables[name] = value
    return newVariables
  }

  handleInputChange = (name) => (e) => {
    const { value } = e.target
    this.props.onChange(
      this.makePayload(name, value)
    )
  }
  
  render() { 
    const { variables } = this.props
    return ( 
      <div>
        <input 
          type="text" 
          placeholder="w1" 
          onChange={this.handleInputChange("w1")}
          value={variables.w1}
        />
        <input 
          type="text" 
          placeholder="w2" 
          onChange={this.handleInputChange("w2")}
          value={variables.w2}
        />
        <input 
          type="text" 
          placeholder="b" 
          onChange={this.handleInputChange("b")}
          value={variables.b}
        />
        <input 
          type="text" 
          placeholder="learning rate" 
          onChange={this.handleInputChange("learning_rate")}
          value={variables.learning_rate}
        />
      </div>
    );
  }
}
 
export default VariableForm;