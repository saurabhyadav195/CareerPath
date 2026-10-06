import React from 'react';

// CareerCard Component - Reusable card displaying a single career category
function CareerCard({ icon, title, description, isSelected, onSelect }) {
  const panelClass = isSelected
    ? 'panel panel-primary category-panel'
    : 'panel panel-default category-panel';

  return (
    <div className="col-xs-12 col-sm-4 col-md-4">
      <div
        className={panelClass}
        style={{ cursor: 'pointer' }}
        onClick={() => onSelect(title, description)}
      >
        <div className="panel-body text-center">
          <div className="category-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default CareerCard;
