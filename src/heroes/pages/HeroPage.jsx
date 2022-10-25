import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers/getHeroById";
// import 'animate.css';

export default function HeroPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const hero =useMemo(() => getHeroById(id), [id]);
  const heroImageURL = `/assets/heroes/${id}.jpg`;

  const onNavigateBack = () => {
    navigate(-1)
  }

  if (!hero) {
    return <Navigate to="/marvel" />;
  }
  return (
    <div className="row mt-5 animate__animated animate__fadeInDownBig">
      <div className="col-4 ">
        <img
          src={heroImageURL}
          alt={hero.superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: {hero.alter_ego}</b>
          </li>
          <li className="list-group-item">
            <b>publisher: {hero.publisher}</b>
          </li>
          <li className="list-group-item">
            <b>first appearance: {hero.first_appearance}</b>
          </li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>
        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Go back
        </button>
      </div>
    </div>
  );
}
