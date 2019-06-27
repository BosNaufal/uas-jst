import React from 'react'
import CaraHitungItem from './CaraHitungItem';

class CaraHitung extends React.Component {
  render() { 
    const { data } = this.props
    if (!data.length) return null
    return (
      <div>
        {data.map((row, index) => (
          <CaraHitungItem 
            key={index}
            index={index}
            row={row} 
          />
        ))}
      </div>
    );
  }
}
 
export default CaraHitung;