import React from 'react';

const Row = ({ data, index, targetLength }) => {
  if (!data) return null
  const TARGET_LENGTH = targetLength
  const shouldRowSpan = (index + 1) % TARGET_LENGTH === 1
  return ( 
    <tr>
      {shouldRowSpan?
        <td rowSpan={TARGET_LENGTH}>{(data.iterationNumber)}</td>
      :null}
      <td>{index + 1}</td>
      <td>{data.p1}</td>
      <td>{data.p2}</td>
      <td>{data.t}</td>
      <td>{data.w1}</td>
      <td>{data.w2}</td>
      <td>{data.b}</td>
      <td>{data.learning_rate}</td>
      <td>{data.n}</td>
      <td>{data.a}</td>
      <td>{data.e}</td>
      <td>{data.newW1}</td>
      <td>{data.newW2}</td>
    </tr>
  );
}
export default Row;