import React from 'react';

type DataProps = {
  name: string;
  content?: string | number;
  icon?: string;
  info?: string;
  starCount?: number;
};

const Data = (props: DataProps) => {
  return (
    <div>
      <div className='product-data-title'>
        <span>{props.name}</span>
      </div>
      <div className='product-data-content'>
        {props.content && <span>{props.content}</span>}
        {props.icon && <i className={`si ${props.icon}`}></i>}
      </div>
      <div className='product-data-info'>
        {props.info && <span>{props.info}</span>}
        {props.starCount && <Stars starCount={props.starCount} />}
      </div>
    </div>
  );
};

type StarsProps = {
  starCount: number;
};

const Stars = ({ starCount }: StarsProps) => {
  const fullStars = Math.floor(starCount);
  const halfStar = starCount % 1 != 0;
  return (
    <>
      {[...Array(fullStars)].map((elementInArray, index) => (
        <i key={index} className='si si-star-bold'></i>
      ))}
      {halfStar && <i className='si si-star-half-bold'></i>}
    </>
  );
};

export default Data;
