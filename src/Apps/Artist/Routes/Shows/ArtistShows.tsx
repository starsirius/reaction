import { ArtistShows_artist } from "__generated__/ArtistShows_artist.graphql"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Utils/Responsive"
import { ArtistShowBlockItem } from "./ArtistShowBlockItem"
import { ArtistShowListItem } from "./ArtistShowListItem"

interface ArtistShowsProps {
  relay: RelayRefetchProp
  artist: ArtistShows_artist
  status: string
  sort: string
  scrollTo: string
}

export const PAGE_SIZE = 4

class ArtistShows extends Component<ArtistShowsProps> {
  loadNext = () => {
    const {
      artist: {
        showsConnection: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadAfter = cursor => {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.id,
        before: null,
        last: null,
        status: this.props.status,
        sort: this.props.sort,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  render() {
    return (
      <Responsive>
        {({ xs }) => {
          const blockWidth = xs ? "100%" : "50%"
          const blockDirection = xs ? "column" : "row"
          const pr = xs ? 0 : 2
          const pb = pr

          return (
            <Row>
              <Col>
                <Row>
                  <Col>
                    {this.props.status === "running" ? (
                      <ShowBlocks flexDirection={blockDirection} flexWrap>
                        {this.props.artist.showsConnection.edges.map(
                          ({ node }, edgeKey) => {
                            return (
                              <ArtistShowBlockItem
                                key={edgeKey}
                                blockWidth={blockWidth}
                                imageUrl={node.cover_image.cropped.url}
                                partner={node.partner.name}
                                name={node.name}
                                exhibitionInfo={node.exhibition_period}
                                pr={pr}
                                pb={pb}
                                href={node.href}
                                city={node.city}
                              />
                            )
                          }
                        )}
                      </ShowBlocks>
                    ) : (
                      <ShowList>
                        {this.props.artist.showsConnection.edges.map(
                          ({ node }, edgeKey) => {
                            return (
                              <ArtistShowListItem
                                key={edgeKey}
                                city={node.city}
                                partner={node.partner.name}
                                name={node.name}
                                exhibitionInfo={node.exhibition_period}
                                href={node.href}
                              />
                            )
                          }
                        )}
                      </ShowList>
                    )}
                  </Col>
                </Row>

                {this.props.status === "running" && (
                  <Box py={2}>
                    <Separator />
                  </Box>
                )}

                <Row>
                  <Col>
                    <Flex justifyContent="flex-end">
                      <PaginationFragmentContainer
                        pageCursors={
                          this.props.artist.showsConnection.pageCursors as any
                        }
                        onClick={this.loadAfter}
                        onNext={this.loadNext}
                        scrollTo={this.props.scrollTo}
                      />
                    </Flex>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        }}
      </Responsive>
    )
  }
}

export const ArtistShowsRefetchContainer = createRefetchContainer(
  ArtistShows,
  {
    artist: graphql`
      fragment ArtistShows_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 4 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          sort: { type: "PartnerShowSorts" }
          status: { type: "String" }
        ) {
        id
        showsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          status: $status
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                }
              }
              name
              href
              exhibition_period
              cover_image {
                cropped(width: 800, height: 600) {
                  url
                }
              }
              city
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistShowsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $sort: PartnerShowSorts
      $status: String!
    ) {
      artist(id: $artistID) {
        ...ArtistShows_artist
          @arguments(
            sort: $sort
            first: $first
            last: $last
            after: $after
            before: $before
            status: $status
          )
      }
    }
  `
)

const ShowBlocks = Flex
const ShowList = Box