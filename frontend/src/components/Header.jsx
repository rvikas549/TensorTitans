import React from 'react';

function Header() {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold text-gray-800">
        AI-powered Breed Recognition System
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        By Team: <span className="font-semibold">Tensor Titans</span>
      </p>
    </header>
  );
}

export default Header;