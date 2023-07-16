import { Link } from 'gatsby-link'
import React from 'react'
import TemplateWrapper from '../layouts'
import { graphql } from 'gatsby'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <TemplateWrapper>
      <div className="posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <article className="post" key={post.id}>
                <h1>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                </h1>
                <div className="entry">
                  <p>{post.excerpt}</p>
                </div>
                <Link to={post.frontmatter.path} className="read-more">
                  Czytaj więcej
                </Link>
              </article>
            )
          })}
      </div>
    </TemplateWrapper>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
          }
        }
      }
    }
  }
`
