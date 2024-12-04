import React, { useState, useEffect } from 'react';

const DynamicForm = () => {
  const [formType, setFormType] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);

  const apiResponses = {
    userInformation: {
      fields: [
        { name: 'firstName', type: 'text', label: 'First Name', required: true },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true },
        { name: 'age', type: 'number', label: 'Age', required: false },
      ],
    },
    addressInformation: {
      fields: [
        { name: 'street', type: 'text', label: 'Street', required: true },
        { name: 'city', type: 'text', label: 'City', required: true },
        { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
        { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
      ],
    },
    paymentInformation: {
      fields: [
        { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
        { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
        { name: 'cvv', type: 'password', label: 'CVV', required: true },
        { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
      ],
    },
  };

  useEffect(() => {
    if (formType) {
      setFormFields(apiResponses[formType].fields);
      setFormData({});
      setProgress(0);
    }
  }, [formType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    calculateProgress({ ...formData, [name]: value });
  };

  const calculateProgress = (data) => {
    const totalFields = formFields.length;
    const filledFields = Object.keys(data).filter((key) => data[key]).length;
    setProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  return (
    <div className="container mx-auto p-4 mt-4 w-7/12">
      <h1 className="text-2xl font-bold mb-4">Dynamic Form</h1>
      <select
        onChange={(e) => setFormType(e.target.value)}
        value={formType}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Select Form Type</option>
        <option value="userInformation">User Information</option>
        <option value="addressInformation">Address Information</option>
        <option value="paymentInformation">Payment Information</option>
      </select>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium">
              {field.label}
              {field.required && ' *'}
            </label>
            {field.type === 'dropdown' ? (
              <select
                name={field.name}
                onChange={handleInputChange}
                required={field.required}
                className="block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                onChange={handleInputChange}
                required={field.required}
                className="block w-full p-2 border border-gray-300 rounded"
              />
            )}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Progress</h2>
        <div className="flex items-center">
          <progress value={progress} max="100" className="w-full h-4 mr-2"></progress>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
