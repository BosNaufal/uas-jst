import React, { Component } from 'react';

class TargetForm extends Component {

  makePayload = (name, value) => {
    return {
      index: this.props.index,
      name,
      value,
    }
  }

  makeItNumber = (value) => {
    const floatNumber = parseFloat(value)
    if (isNaN(floatNumber)) return 0
    return floatNumber
  }

  handleInputChange = (name) => (e) => {
    const { value } = e.target
    this.props.onChange(
      this.makePayload(name, this.makeItNumber(value))
    )
  }

  render() { 
    const { target } = this.props
    return ( 
      <div>
        <input 
          type="text" 
          placeholder="P1" 
          onChange={this.handleInputChange("p1")} 
          value={target.p1}
        />
        <input 
          type="text" 
          placeholder="P2" 
          onChange={this.handleInputChange("p2")}
          value={target.p2}
        />
        <input 
          type="text" 
          placeholder="t" 
          onChange={this.handleInputChange("t")}
          value={target.t}
        />
      </div>
    );
  }
}
 
export default TargetForm;