import React, { Component } from 'react';
import TargetForm from './TargetForm';

class LogicGateForm extends Component {
  makeTargetPayload = () => {
    return {
      p1: "",
      p2: "",
      t: "",
    }
  }

  isThereEmptyForm = () => {
    let someFormIsEmpty = false
    this.props.targetList.forEach((_, index) => {
      if (someFormIsEmpty) return false
      if (this.formIsEmpty(index)) {
        someFormIsEmpty = true
      }
    })
    return someFormIsEmpty
  }

  formIsEmpty = (index) => {
    const formPayload = this.props.targetList[index]
    let someFieldIsEmpty = false
    Object.keys(formPayload).forEach((key) => {
      if (someFieldIsEmpty) return false
      if (formPayload[key] === "") {
        console.log(formPayload)
        someFieldIsEmpty = true
      }
    })
    return someFieldIsEmpty
  }

  addTarget = () => {
    if (this.isThereEmptyForm()) return false
    const newTargetList = [
      ...this.props.targetList,
      this.makeTargetPayload(),
    ]
    this.props.onChange(newTargetList)
  }

  updateTarget = ({ index, name, value }) => {
    const newTargetList = [...this.props.targetList]
    newTargetList[index] = {
      ...(newTargetList[index]),
      [name]: value,
    }
    this.props.onChange(newTargetList)
  }

  handleTargetFormChange = (payload) => {
    this.updateTarget(payload)
  }

  render() { 
    return ( 
      <div>
        {this.props.targetList.map((target, index) => (
          <TargetForm 
            key={index} 
            index={index} 
            target={target}
            onChange={this.handleTargetFormChange}
          />
        ))}
        <button onClick={this.addTarget}>Add Target</button>
      </div>
    );
  }
}
 
export default LogicGateForm;