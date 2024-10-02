import React from "react";

const Header = () => {
  return (
    <header
      className="bg-cover bg-center bg-no-repeat text-white py-24 text-center relative flex items-center justify-center"
      style={{
        backgroundImage: "url('https://picsum.photos/1600/900')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
      {/* Improved overlay */}
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in">
          Govt. Inter College Moltari, Uttarkashi, Uttarakhand
        </h1>
        <p className="text-xl font-light animate-fade-in delay-200">
          Dedicated to Excellence in Education
        </p>
      </div>
    </header>
  );
};

export default Header;
