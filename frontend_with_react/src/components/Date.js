import React, { useState, useEffect } from 'react';

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Mettez à jour l'heure toutes les secondes
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const radius = 80;
  const centerX = 100;
  const centerY = 100;
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondsAngle = (seconds / 60) * 360;
  const minutesAngle = ((minutes + seconds / 60) / 60) * 360;
  const hoursAngle = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">Horloge analogique</h2>
      <svg width="200" height="200">
        <circle cx={centerX} cy={centerY} r={radius} fill="white" />
        {/* Affichage des chiffres */}
        {[...Array(12).keys()].map((hour) => {
          const angle = ((hour - 3) / 12) * 360;
          const x = centerX + Math.cos((angle * Math.PI) / 180) * (radius - 10);
          const y = centerY + Math.sin((angle * Math.PI) / 180) * (radius - 10);
          return (
            <text
              key={hour}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="central"
              fontSize="16"
              fontWeight="bold"
              fill="black"
            >
              {hour + 1}
            </text>
          );
        })}
        {/* Aiguille des secondes */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.sin((secondsAngle * Math.PI) / 180) * (radius - 20)}
          y2={centerY - Math.cos((secondsAngle * Math.PI) / 180) * (radius - 20)}
          stroke="red"
          strokeWidth="2"
        />
        {/* Aiguille des minutes */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.sin((minutesAngle * Math.PI) / 180) * (radius - 30)}
          y2={centerY - Math.cos((minutesAngle * Math.PI) / 180) * (radius - 30)}
          stroke="black"
          strokeWidth="4"
        />
        {/* Aiguille des heures */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.sin((hoursAngle * Math.PI) / 180) * (radius - 40)}
          y2={centerY - Math.cos((hoursAngle * Math.PI) / 180) * (radius - 40)}
          stroke="black"
          strokeWidth="6"
        />
      </svg>
    </div>
  );
}

export default AnalogClock;
