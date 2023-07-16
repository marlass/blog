import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import Helmet from 'react-helmet'
import TemplateWrapper from '../layouts'
import settings from './../../settings'
import { graphql } from 'gatsby'

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { markdownRemark: post } = data // data.markdownRemark holds our post data
  return (
    <TemplateWrapper>
      <article className="post">
        <Helmet title={`blog.marlas.pl - ${post.frontmatter.title}`} />
        <h1>{post.frontmatter.title}</h1>
        <div
          className="entry"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="date">
          Opublikowano:{' '}
          {new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
        <div className="comments">
          <ReactDisqusComments
            shortname={settings.disqus}
            title={`${post.frontmatter.title}`}
          />
        </div>
      </article>
    </TemplateWrapper>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
      }
    }
  }
`
