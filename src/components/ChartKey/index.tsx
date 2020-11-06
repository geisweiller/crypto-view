import React from 'react';

import './styles.css';

interface ChartKeyTypes {
  chartKey: string
}

export const ChartKey: React.FC<ChartKeyTypes> = (props) => {
  const { chartKey } = props;

  return (

    <div className='ChartKey'>
      {chartKey}
    </div>
  ) 
}

;