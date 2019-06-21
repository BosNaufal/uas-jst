import RowModel from './RowModel'
import _pullAll from 'lodash/pullAll'

class RowBrainModel {
  constructor(props) {
    this.props = props
  }

  state = {
    countedRows: [],
    doneIteration: 0,
    successIteration: 0,
  }

  doYourJob = () => {
    this.state = {
      ...this.state,
      countedRows: []
    }
    
    let currentIteration = 1
    let countedRows = []
    let successIteration = 0

    const doIteration = (_targetList, _variables) => {
      const { rowData, newVariables } = this.iterateRowGroup(
        _targetList, 
        this.makeVariablesNumber(_variables),
        currentIteration,
      )

      countedRows = [
        ...countedRows,
        ...rowData,
      ]
      if (this.isHasError(rowData) && currentIteration < this.props.maxIteration) {
        currentIteration++
        return doIteration(rowData, newVariables, currentIteration)
      }
      if (!this.isHasError(rowData)) {
        successIteration = currentIteration
      }
      return currentIteration
    }

    const { targetList, variables } = this.props
    const doneIteration = doIteration(targetList, variables, currentIteration)

    this.state = {
      ...this.state,
      countedRows,
      doneIteration,
      successIteration,
    }

    return this.result()
  }

  makeVariablesNumber = (variables) => {
    const newVariables = {}
    Object.keys(variables).forEach((key) => {
      newVariables[key] = parseFloat(variables[key])
    })
    return newVariables
  }

  makeRowValue = (row, index) => ({
    iterationNumber: row.props.variables.iterationNumber,
    index: index + 1,
    p1: row.props.target.p1,
    p2: row.props.target.p2,
    t: row.props.target.t,
    w1: row.props.variables.w1,
    w2: row.props.variables.w2,
    b: row.props.variables.b,
    learning_rate: row.props.variables.learning_rate,
    n: row.countN(),
    a: row.countA(),
    e: row.countE(),
    newW1: row.countNewWeight(1),
    newW2: row.countNewWeight(2),
  })

  isHasError = (rowData) => {
    const allErrorValues = rowData.map((row) => (row.e))
    const errorFound = _pullAll(allErrorValues, [0]).length > 0
    return errorFound
  }

  iterateRowGroup = (targetList, variables, iterationNumber) => {
    let newWeight = {}
    const allRowData = targetList.map((target, index) => {
      if (index === 0) {
        newWeight = {
          w1: variables.w1,
          w2: variables.w2,
        }
      }
      const row = new RowModel({
        target,
        variables: {
          iterationNumber,
          ...variables,
          ...newWeight
        },
      })

      const value = this.makeRowValue(row, index)

      newWeight = {
        w1: value.newW1,
        w2: value.newW2,
      }

      return value
    })

    return {
      rowData: allRowData,
      newVariables: {
        ...variables,
        ...newWeight,
      }
    }
  }

  result() {
    return ({
      allRowData: this.state.countedRows, 
      recount: this.doYourJob,
      successIteration: this.state.successIteration,
      message: this.state.successIteration === 0 ? "Don't Give Up!" : "Alhamdulillah, You've got it!",
    })
  }
}
 
export default RowBrainModel;