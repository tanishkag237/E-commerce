import React from 'react'

const FormInput = ({
    labelTitle,
    type = "text",
    inputValue,
    placeholder,
    required = false,
    onChange,
    name,
    isTextArea = false
}) => {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {labelTitle}
          </label>

          {isTextArea ? (
            <textarea 
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type={type}
          name={name}
          rows="3"
          value={inputValue}
          placeholder={placeholder}
          required = {required}
          onChange={onChange}
          />
          ):(
            <input 
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
          type={type}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          required = {required}
          onChange={onChange}
          />
          )}
          
    </div>
  )
}

export default FormInput