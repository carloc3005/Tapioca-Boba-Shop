import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} Boba Shop. All rights reserved.</p>
    </footer>
  );
}
