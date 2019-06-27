import React from 'react'

const CaraHitungItem = ({
  index,
  row,
}) => {
  return ( 
    <div>
      <h4>Iterasi Ke - {index + 1}</h4>
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <div>
          <div>
            <div>n = (P1 x W1) + (P2 x W2) - b</div>
            <div>n = ({row.p1} x {row.w1}) + ({row.p2} x {row.w2}) - {row.b}</div>
            <div>n = ({row.p1 * row.w1}) + ({row.p2 * row.w2}) - {row.b}</div>
            <div>n = {row.n}</div>
          </div>
          <br />
          <div>
            <div>a = n {">="} 0 -> 1 OR n {"<="} 0 -> 0 </div>
            <div>a = {row.a}</div>
          </div>
          <br />
          <div>
            <div>e = t - a</div>
            <div>e = {row.t} - {row.a}</div>
            <div>e = {row.e}</div>
          </div>
        </div>
        <div style={{ paddingLeft: 25 }}>
          <div>
            <div>w1 (baru) = w1 + (learning_rate x p1 x e)</div>
            <div>w1 (baru) = {row.w1} + ({row.learning_rate} x {row.p1} x {row.e})</div>
            <div>w1 (baru) = {row.w1} + ({row.learning_rate * row.p1 * row.e})</div>
            <div>w1 (baru) = {row.newW1}</div>
          </div>
          <br />
          <div>
            <div>w2 (baru) = w2 + (learning_rate x p2 x e)</div>
            <div>w2 (baru) = {row.w2} + ({row.learning_rate} x {row.p2} x {row.e})</div>
            <div>w2 (baru) = {row.w2} + ({row.learning_rate * row.p2 * row.e})</div>
            <div>w2 (baru) = {row.newW2}</div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
 
export default CaraHitungItem;