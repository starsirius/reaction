import { Sans, Serif } from "@artsy/palette"
import Icon from "Components/Icon"
import { Modal } from "Components/Modal/Modal"
import React, { Component, SFC } from "react"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { AuctionResultsState } from "./state"

interface Props {
  hideDetailsModal?: () => void
  auctionResult: {
    title: string
    date_text: string
    dimension_text: string
    images: {
      thumbnail: {
        url: string
      }
    }
    description: string
  }
}

export class ArtistAuctionDetailsModal extends Component<Props> {
  render() {
    return (
      <Subscribe to={[AuctionResultsState]}>
        {({ state, hideDetailsModal }: AuctionResultsState) => {
          if (!state.showModal) {
            return null
          }

          return (
            <Modal
              onClose={() => hideDetailsModal()}
              show={state.showModal}
              style={{
                maxHeight: 540,
                overflowX: "scroll",
              }}
            >
              <LotDetails
                auctionResult={state.selectedAuction.auctionResult}
                hideDetailsModal={hideDetailsModal}
              />
            </Modal>
          )
        }}
      </Subscribe>
    )
  }
}

const LotDetails: SFC<Props> = props => {
  const {
    hideDetailsModal,
    auctionResult: { title, date_text, dimension_text, images, description },
  } = props

  return (
    <React.Fragment>
      <CloseButton onClick={() => hideDetailsModal()} />

      <Flex justifyContent="center">
        <Serif size="5t" weight="semibold">
          Lot description
        </Serif>
      </Flex>

      <Spacer mb={4} />

      <Flex>
        <Box>
          <Serif size="2" italic>
            {title && title + ","}
            {date_text}
          </Serif>
          <Serif size="2" color="black60">
            {dimension_text}
          </Serif>
        </Box>

        <Spacer mr={2} />

        <Box height="auto">
          <Image width="100px" src={images.thumbnail.url} />
        </Box>
      </Flex>

      <Box my={3}>
        <Separator />
      </Box>

      <Box mb={1}>
        <Sans size="2" weight="medium">
          Description
        </Sans>
      </Box>

      <Serif size="2">{description}</Serif>
      <Spacer mb={4} />

      <Button
        variant="secondaryOutline"
        width="100%"
        onClick={() => hideDetailsModal()}
      >
        OK
      </Button>
    </React.Fragment>
  )
}

const CloseButton = props => {
  return (
    <CloseButtonWrapper {...props}>
      <Icon name="close" fontSize="16px" color="black" />
    </CloseButtonWrapper>
  )
}

const CloseButtonWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  width: 1vw;
  right: 30px;
  top: 15px;
  opacity: 0.1;

  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`
