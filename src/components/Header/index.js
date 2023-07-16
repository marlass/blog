import { Link } from 'gatsby-link'
import React from 'react'
import metadata from './../../../metadata'

const Header = () => (
  <div className="wrapper-masthead">
    <div className="container">
      <header className="masthead clearfix">
        <div className="site-info">
          <h1 className="site-name">
            <Link to="/">{metadata.title}</Link>
          </h1>
          <p className="site-description">{metadata.description}</p>
        </div>

        <nav>
          <Link to="/">Blog</Link>
          <Link to="/daj-sie-poznac-2017/">Daj się poznać 2017</Link>
        </nav>
      </header>
    </div>
  </div>
)

export default Header
