import React from 'react'

export const SearchBox = (props) => {
  return (
    <div className='col col-sm-4'>
        <input 
        type="text"
        className='from-control'
        placeholder='do your search..'
        value={props.value}
        onChange={(e) => props.setSearchMovie(e.target.value)} />
    </div>
  )
}
