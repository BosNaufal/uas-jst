import React, { Component } from 'react';

import './table.css'
import RowBrain from './RowBrain';
import Row from './Row';

class ResultTable extends Component {
  state = {
    maxIteration: 15,
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

  render() { 
    const { targetList, variables } = this.props
    return (
      <RowBrain 
        maxIteration={this.state.maxIteration}
        targetList={targetList}
        variables={variables}
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