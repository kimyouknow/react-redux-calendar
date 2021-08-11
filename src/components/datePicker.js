import React from 'react';

const Datepicker = ({ setToday }) => {
    const onChangeHandler = (value) => {
        const Y = Number(value.slice(0,4))
        const M = Number(value.slice(5,7))-1
        const D = Number(value.slice(8,10))
        setToday(new Date(Y,M,D))
    }
    return (
        <input type="date" onChange={(e) => onChangeHandler(e.target.value)} />
    );
};

export default Datepicker;