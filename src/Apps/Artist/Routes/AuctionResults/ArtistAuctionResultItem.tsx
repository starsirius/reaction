import { Serif } from "@artsy/palette"
import { ArtistAuctionResultItem_auctionResult } from "__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { ContextProps } from "Components/Artsy"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router/state"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Image } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { AuctionResultsState } from "./state"

export interface Props extends ContextProps {
  auctionResult: ArtistAuctionResultItem_auctionResult
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class ArtistAuctionResultItem extends Component<Props> {
  render() {
    return (
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const {
            mediator,
            system: { currentUser },
          } = state

          return (
            <Row>
              <Responsive>
                {({ xs, sm, md }) => {
                  if (xs) {
                    return (
                      <ExtraSmallAuctionItem
                        {...this.props}
                        mediator={mediator}
                        currentUser={currentUser}
                      />
                    )
                  } else if (sm || md) {
                    return (
                      <SmallAuctionItem
                        {...this.props}
                        mediator={mediator}
                        currentUser={currentUser}
                      />
                    )
                  } else {
                    return (
                      <LargeAuctionItem
                        {...this.props}
                        mediator={mediator}
                        currentUser={currentUser}
                      />
                    )
                  }
                }}
              </Responsive>

              <Col>
                <Box pt={2} pb={1}>
                  <Separator />
                </Box>
              </Col>
            </Row>
          )
        }}
      </Subscribe>
    )
  }
}

const LargeAuctionItem: React.SFC<Props> = (props: Props) => {
  const {
    auctionResult: {
      dimension_text,
      images,
      date_text,
      organization,
      sale_date_text,
      title,
    },
    salePrice,
    truncatedDescription,
    estimatedPrice,
  } = getProps(props)

  return (
    <Subscribe to={[AuctionResultsState]}>
      {({ state, showDetailsModal }: AuctionResultsState) => {
        return (
          <React.Fragment>
            <Col sm={1}>
              <Box height="auto" pr={2}>
                <Image width="70px" src={images.thumbnail.url} />
              </Box>
            </Col>
            <Col sm={4}>
              <Box pl={1} pr={6}>
                <Serif size="2" italic>
                  {title && title + ","}
                  {date_text}
                </Serif>
                <Serif size="2">{dimension_text}</Serif>
                <Spacer pt={1} />
                <Serif size="1" color="black60">
                  {truncatedDescription}
                </Serif>
              </Box>
            </Col>
            <Col sm={3}>
              <Box pr={2}>
                <Serif size="2">{organization}</Serif>
                <Serif size="2" color="black60">
                  {sale_date_text}
                </Serif>
                <Serif size="2" color="black60">
                  <FullDescriptionLink onClick={() => showDetailsModal(props)}>
                    Full description
                  </FullDescriptionLink>
                </Serif>
              </Box>
            </Col>
            <Col sm={4}>
              {props.currentUser && salePrice ? (
                <Serif size="2">{`Sale: ${salePrice}`}</Serif>
              ) : (
                <Button
                  onClick={() => {
                    props.mediator.trigger("open:auth", {
                      mode: "register",
                      copy: "Sign up to see full auction records — for free",
                    })
                  }}
                >
                  Sign up to see price
                </Button>
              )}
              {estimatedPrice && (
                <Serif size="2" color="black60">
                  Est: {estimatedPrice}
                </Serif>
              )}
            </Col>
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

const SmallAuctionItem: React.SFC<Props> = props => {
  const {
    auctionResult: { dimension_text, images, date_text, title },
    salePrice,
    truncatedDescription,
    estimatedPrice,
  } = getProps(props)

  return (
    <React.Fragment>
      <Col sm={6}>
        <Flex>
          <Box height="auto">
            <Image width="70px" src={images.thumbnail.url} />
          </Box>

          <Spacer mr={2} />

          <Box pr={4}>
            <Serif size="2" italic>
              {title && title + ","}
              {date_text}
            </Serif>
            <Serif size="2">{dimension_text}</Serif>
            <Spacer pt={1} />
            <Serif size="1" color="black60">
              {truncatedDescription}
            </Serif>
          </Box>
        </Flex>
      </Col>
      <Col sm={6}>
        {props.currentUser && salePrice ? (
          <Serif size="2">{`Sale: ${salePrice}`}</Serif>
        ) : (
          <Button>Sign up to see price</Button>
        )}

        {estimatedPrice && (
          <Serif size="2" color="black60">
            Est: {estimatedPrice}
          </Serif>
        )}
      </Col>
    </React.Fragment>
  )
}

const ExtraSmallAuctionItem: React.SFC<Props> = props => {
  const {
    auctionResult: {
      dimension_text,
      images,
      date_text,
      organization,
      sale_date_text,
      title,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)

  return (
    <React.Fragment>
      <Col>
        <Flex>
          <Box height="auto">
            <Image width="70px" src={images.thumbnail.url} />
          </Box>

          <Spacer mr={2} />

          <Box>
            <Serif size="2" italic>
              {title && title + ","}
              {date_text}
            </Serif>
            <Serif size="2">{dimension_text}</Serif>

            <Spacer pb={1} />

            <Serif size="2">{organization}</Serif>
            <Serif size="2" color="black60">
              {sale_date_text}
            </Serif>

            <Spacer pb={1} />

            {props.currentUser && salePrice ? (
              <Serif size="2">{`Sale: ${salePrice}`}</Serif>
            ) : (
              <Button>Sign up to see price</Button>
            )}

            {estimatedPrice && (
              <Serif size="2" color="black60">
                Est: {estimatedPrice}
              </Serif>
            )}
          </Box>
        </Flex>
      </Col>
    </React.Fragment>
  )
}

export const AuctionResultItemFragmentContainer = createFragmentContainer(
  ArtistAuctionResultItem,
  graphql`
    fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
      title
      dimension_text
      organization
      images {
        thumbnail {
          url
        }
      }
      description
      date_text
      sale_date_text
      price_realized {
        display
        cents_usd
      }
      estimate {
        display
      }
    }
  `
)

const FullDescriptionLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

// Helpers

const getSalePrice = price_realized => {
  const salePrice =
    price_realized.cents_usd === 0 ? null : price_realized.display
  return salePrice
}

const getDescription = (fullDescription: string) => {
  const truncatedDescription = fullDescription.substr(0, 200)
  return truncatedDescription + "..."
}

const getProps = props => {
  const {
    auctionResult: { description, estimate, price_realized },
  } = props

  const salePrice = getSalePrice(price_realized)
  const truncatedDescription = getDescription(description)
  const estimatedPrice = estimate.display

  return {
    ...props,
    salePrice,
    truncatedDescription,
    estimatedPrice,
  }
}
