import React, { useState } from 'react';

export default function CreateAccountScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Account created successfully!');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-t-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}>
          <h1 className="text-5xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-purple-100 text-lg">Join us today and get started</p>
        </div>
        
        <div className="bg-white shadow-2xl rounded-b-3xl p-12 border-x border-b border-purple-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="johndoe"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full text-white font-semibold py-4 text-lg rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'}
            >
              Create Account
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-base">
              Already have an account?{' '}
               <a href="/" className="text-purple-600 hover:text-purple-700 font-semibold">
            Sign in
          </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}