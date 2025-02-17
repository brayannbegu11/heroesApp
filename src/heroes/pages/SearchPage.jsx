import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/HeroCard";
import { getHeroesByName } from "../helpers/getHeroesByName";

export default function SearchPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const {q = ''} = queryString.parse(location.search)
  
  const heroes = getHeroesByName(q)
  
  const {searchText, onInputChange} = useForm({
    searchText: q
  })
  const onSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`?q=${searchText.toLowerCase().trim()}`)
  }
  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label='form'>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              autoFocus
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>results</h4>
          <hr />
          {
            q === ''?<div className="alert alert-primary" aria-label="search-hero">Search a hero</div>
            : q.length > 0 && heroes.length === 0 && <div className="alert alert-danger" aria-label="not-found">No hero with <b>{q}</b></div>
          }
          
          {
            heroes.map(hero => (
              <HeroCard key={hero.id}{...hero}/>
            ))
          }
        </div>
      </div>
    </>
  );
}
