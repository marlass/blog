import 'prismjs/themes/prism-okaidia.css'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import metadata from './../../metadata'
import './style.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title={`${metadata.title} - ${metadata.description}`}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
        { name: 'google-site-verification', content: 'Q3AorUrT8RkIuqe3M9z5pNi4gWsO5VCRxJUzhWeklOc' },
      ]}
    ></Helmet>
    <Header />
    <div id="main" role="main" className="container">
      {children}
    </div>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
