import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import './AdminStyles.css';

const locations = [
  { name: 'California', value: '40%', color: 'var(--admin-primary)' },
  { name: 'Arizona', value: '15%', color: 'var(--admin-primary)' },
  { name: 'Texas', value: '10%', color: 'var(--admin-primary)' },
  { name: 'Georgia', value: '3.5%', color: 'var(--admin-primary)' },
  { name: 'North Carolina', value: '2%', color: 'var(--admin-primary)' },
  { name: 'Florida', value: '1.5%', color: 'var(--admin-primary)' },
];

const UserLocationMap = () => {
  return (
    <div className="chart-card map-card">
      <div className="chart-header">
        <h3 className="chart-title">User Location</h3>
        <button className="action-item"><MoreHorizontal size={18} /></button>
      </div>
      
      <div className="map-container">
        <svg viewBox="0 0 1000 600" className="us-map-svg">
          {/* Simple stylized US Map paths - representational */}
          <path d="M150,100 L300,100 L350,150 L400,120 L500,150 L600,100 L800,120 L850,200 L820,300 L850,400 L800,500 L600,480 L500,550 L400,500 L200,520 L100,400 L50,300 L80,200 Z" fill="rgba(255,255,255,0.05)" stroke="var(--admin-border)" strokeWidth="1" />
          
          {/* Highlighted states */}
          <path d="M100,300 L150,250 L200,350 L150,450 Z" fill="rgba(255, 107, 0, 0.6)" /> {/* CA */}
          <path d="M450,450 L550,450 L580,550 L420,550 Z" fill="rgba(255, 107, 0, 0.8)" /> {/* TX */}
          <path d="M750,400 L820,400 L840,480 L780,480 Z" fill="rgba(255, 107, 0, 0.4)" /> {/* FL */}
          
          {/* Tooltip on map */}
          <g transform="translate(500, 480)">
            <rect x="-40" y="-30" width="80" height="30" rx="15" fill="white" />
            <text x="0" y="-10" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">Texas 10%</text>
            <path d="M-5,0 L0,5 L5,0 Z" fill="white" />
          </g>
        </svg>
      </div>
      
      <div className="map-legend">
        {locations.map((loc, index) => (
          <div className="legend-item" key={index}>
            <span className="dot" style={{ backgroundColor: loc.color, opacity: 1 - (index * 0.1) }}></span>
            <span className="label">{loc.name} <strong>{loc.value}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLocationMap;
