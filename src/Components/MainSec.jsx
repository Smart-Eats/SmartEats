import React from "react";
import Card from "./Card";
import CardData from "../Data/CardData";
// import { Button } from "@/components/ui/button";

const MainSec = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 space-y-12">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-blue-600">Welcome to Smart Eats</h1>
        <p className="text-lg text-gray-700">Discover a smarter way to manage your meals and nutrition.</p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md">Get Started</button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CardData.map((elem) => (
          <Card
            key={elem.id}
            img={elem.img}
            title={elem.title}
            content={
              <p className="text-sm text-gray-600 leading-relaxed">
                {elem.content.slice(0, 100)}... {/* Truncate for consistency */}
              </p>
            }
            className="rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow bg-white overflow-hidden"
            style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MainSec;