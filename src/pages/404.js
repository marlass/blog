import { Link }  from 'gatsby-link'
import React from 'react'
import img404 from '../assets/404.jpg'
import TemplateWrapper from '../layouts'

const NotFoundPage = () => (
  <TemplateWrapper>
    <article className="page">
      <h1>404 - Nie znaleziono strony</h1>

      <div className="entry">
        <p>
          Nie znaleziono takiej strony.{' '}
          <Link to="/">Powrót do strony głównej</Link>.
        </p>
        <p>
          <Link to="/">
            <img
              src={img404}
              alt="Constructocat by https://github.com/jasoncostello"
              style={{
                width: '400px',
              }}
            />
          </Link>
        </p>
      </div>
    </article>
  </TemplateWrapper>
)

export default NotFoundPage
