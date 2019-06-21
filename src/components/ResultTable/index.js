import React, { Component } from 'react';

import './table.css'
import RowBrain from './RowBrain';
import RowBrainModel from './RowBrainModel';
import Row from './Row';


class ResultTable extends Component {
  state = {
    maxIteration: 15,
  }

  componentDidMount() {
    // this.iterateLikeAPro()
  }

  iterateLikeAPro = () => {
    const allVariables = this.generateVariable()
    let success = false
    allVariables.forEach((variables, index) => {
      if (success !== false) return false
      const brain = new RowBrainModel({
        maxIteration: this.state.maxIteration,
        targetList: this.props.targetList,
        variables,
      })
      const result = brain.doYourJob()
      console.log("variasi variable ke - " + index, result)
      if (result.successIteration !== 0) {
        success = result
      }
    })
    console.log(success)
  }

  generateVariable = () => {
    const range = {
      weight: [-0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5],
      bias: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      learningRate: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    }
    const allGeneratedVariables = []
    range.weight.forEach((_w1) => {
      range.weight.forEach((_w2) => {
        range.bias.forEach((_b) => {
          range.learningRate.forEach((_learning_rate) => {
            allGeneratedVariables.push({
              w1: _w1,
              w2: _w2,
              b: _b,
              learning_rate: _learning_rate,
            })
          })
        })
      })
    })
    return allGeneratedVariables
  }

  makeItNumber = (value) => {
    const floatNumber = parseFloat(value)
    if (isNaN(floatNumber)) return 0
    return floatNumber
  }

  handleInputChange = (e) => {
    const { value } = e.target
    this.setState({ maxIteration: this.makeItNumber(value) })
  }

  isThereEmptyForm = () => {
    if (this.props.targetList.length === 0) return true
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
        someFieldIsEmpty = true
      }
    })
    return someFieldIsEmpty
  }

  handleRecount = (recount) => ()=> {
    if (!this.isThereEmptyForm()) {
      recount()
    }
  }

  handleDone = ({ successIteration }) => {
    if (successIteration) {
      console.log("HERE")
    }
  }

  render() { 
    const { targetList, variables } = this.props
    return (
      <RowBrain 
        maxIteration={this.state.maxIteration}
        targetList={targetList}
        variables={variables}
        onDone={this.handleDone}
      >
        {({ allRowData, recount, message }) => (
          <div>
            {!this.isThereEmptyForm() ?
              <button onClick={this.handleRecount(recount)}>Bismillah Recount!</button>
            : null}

            <div>
              <label>Max Iteration:</label>
              <input 
                type="text" 
                placeholder="Max Iteration" 
                onChange={this.handleInputChange}
                value={this.state.maxIteration}
              />
            </div>

            <h1>{message}</h1>
            <table className="table">
              <thead>
                <tr>
                  <th rowSpan={2}>Epoh</th>
                  <th rowSpan={2}>Iterasi</th>
                  <th rowSpan={2}>P1</th>
                  <th rowSpan={2}>P2</th>
                  <th rowSpan={2}>t</th>
                  <th colSpan={2}>Bobot Awal</th>
                  <th rowSpan={2}>b</th>
                  <th rowSpan={2}>Learning Rate</th>
                  <th rowSpan={2}>n</th>
                  <th rowSpan={2}>a</th>
                  <th rowSpan={2}>e</th>
                  <th colSpan={2}>Bobot Baru</th>
                </tr>
                <tr>
                  <th>w1</th>
                  <th>w2</th>
                  <th>w1</th>
                  <th>w2</th>
                </tr>
              </thead>
              <tbody>
                {allRowData.map((data, index) => (
                  <Row 
                    key={index} 
                    index={index} 
                    data={data} 
                    targetLength={targetList.length}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </RowBrain>
      
    );
  }
}
 
export default ResultTable;