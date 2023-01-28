import React, { useEffect, useState } from 'react';

const Login = () => {
    const [value, updateValue] = useState('');

    function onChange(e: React.FormEvent<HTMLInputElement>){
        updateValue(e.currentTarget.value)
    }

    return (
        <div>
            <input value = {value} onChange= {onChange}></input>
        </div>
    );
};

export default Login;