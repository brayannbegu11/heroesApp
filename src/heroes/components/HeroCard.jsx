import React from "react";
import { Link } from "react-router-dom";
import "animate.css";
export const HeroCard = ({
  id,
  superhero,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImageURL = `/assets/heroes/${id}.jpg`;
  return (
    <div className="col">
      <div className="card">
        <div className="row no-gutters animate__animated animate__fadeIn animate__delay-0,5s">
          <div className="col-4">
            <img src={heroImageURL} alt={superhero} className="card-img" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title"> {superhero}</h5>
              <p className="card-text">{alter_ego}</p>
              {alter_ego !== characters && <p>{characters}</p>}
              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>
              <Link to={`/hero/${id}`}>Más información</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
