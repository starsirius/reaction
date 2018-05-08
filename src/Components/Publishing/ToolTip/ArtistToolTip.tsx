import styled from "styled-components"
import React from "react"
import { map } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { garamond, unica } from "Assets/Fonts"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { FollowArtistButton } from "../../FollowButton/FollowArtistButton"
import { ToolTipDescription } from "./Components/Description"
import { NewFeature } from "./Components/NewFeature"
import { ArtistMarketData } from "./Components/ArtistMarketData"
import { ArtistToolTip_artist } from "../../../__generated__/ArtistToolTip_artist.graphql"

export interface ArtistToolTipProps {
  showMarketData?: boolean
  artist: ArtistToolTip_artist
}

export const ArtistToolTip: React.SFC<ArtistToolTipProps> = props => {
  const {
    blurb,
    carousel,
    formatted_nationality_and_birthday,
    href,
    name,
  } = props.artist
  const { showMarketData } = props
  const displayImages = map(carousel.images.slice(0, 2), "resized")
  const images = fillwidthDimensions(displayImages, 320, 15, 150)

  return (
    <Wrapper>
      <ArtistContainer href={href}>
        {images && (
          <Images>
            {images.map((img, i) => (
              <img
                key={i}
                src={img.__id}
                width={img.width}
                height={img.height}
              />
            ))}
          </Images>
        )}

        <Header>
          <TitleDate>
            <Title>{name}</Title>
            {formatted_nationality_and_birthday && (
              <Date>{formatted_nationality_and_birthday}</Date>
            )}
          </TitleDate>
          <FollowArtistButton />
        </Header>

        {showMarketData ? (
          <ArtistMarketData artist={props.artist} />
        ) : (
          blurb && <ToolTipDescription text={blurb} />
        )}
      </ArtistContainer>

      <NewFeature />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 320px;
`

export const ArtistContainer = styled.a`
  position: relative;
  text-decoration: none;
  color: black;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleDate = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Date = styled.div`
  ${unica("s14", "medium")};
`

const Images = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`

export const ArtistTooltipContainer = createFragmentContainer(
  ArtistToolTip,
  graphql`
    fragment ArtistToolTip_artist on Artist {
      name
      formatted_nationality_and_birthday
      href
      blurb
      carousel {
        images {
          resized(height: 200) {
            url
            width
            height
          }
        }
      }
      collections
      highlights {
        partners(
          first: 5
          display_on_partner_profile: true
          represented_by: true
          partner_category: ["blue-chip", "top-established", "top-emerging"]
        ) {
          edges {
            node {
              categories {
                id
              }
            }
          }
        }
      }
      auctionResults(
        recordsTrusted: true
        first: 1
        sort: PRICE_AND_DATE_DESC
      ) {
        edges {
          node {
            price_realized {
              display
            }
          }
        }
      }
      genes {
        name
      }
    }
  `
)