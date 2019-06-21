class RowModel {
  constructor(props) {
    this.props = props
  }

  countN = () => {
    const { target, variables } = this.props
    const { p1, p2 } = target
    const { w1, w2, b } = variables
    const result = ((p1 * w1) + (p2 * w2) - b)
    return parseFloat(result.toFixed(2))
  }

  countA = () => {
    const n = this.countN()
    return n >= 0 ? 1 : 0
  }

  countE = () => {
    const { target } = this.props
    const { t } = target
    const a = this.countA()
    return t - a
  }

  countNewWeight = (index) => {
    const { target, variables } = this.props
    const { learning_rate } = variables
    const w = variables[`w${index}`]
    const p = target[`p${index}`]
    const e = this.countE()
    const result = (w + (learning_rate * p * e))
    return parseFloat(result.toFixed(2))
  }
}
 
export default RowModel;