// src/components/FormInput.jsx

import React from 'react';

function FormInput({ label, type, value, onChange }) {
  return (
    <div className="formInput">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} required />
    </div>
  );
}

export default FormInput;
