import { storiesOf } from "@storybook/react"
import React from "react"

import { Images } from "Components/Publishing/Fixtures/Components"
import Button from "../Buttons/Default"
import Modal from "../Modal/Modal"

class ModalDemo extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render(): JSX.Element {
    const { cta, hasLogo, isWide, image, title, isLong } = this.props
    return (
      <div>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          cta={cta}
          hasLogo={hasLogo}
          image={image}
          isWide={isWide}
          title={title}
          onClose={this.closeModal}
          show={this.state.isModalOpen}
        >
          <div>
            {isLong && (
              <div>
                <p>{text}</p>
                <p>{text}</p>
                <p>{text}</p>
              </div>
            )}
            <p>This is modal contents</p>
            <hr />
            <div>Even more contents</div>
          </div>
        </Modal>
      </div>
    )
  }
}

storiesOf("Components/Modal/Demo", module)
  .add("Modal", () => <ModalDemo />)
  .add("Logo", () => <ModalDemo hasLogo />)
  .add("Title", () => <ModalDemo title="The art world online" />)
  .add("Logo & Title", () => <ModalDemo hasLogo title="The art world online" />)
  .add("Cta", () => (
    <ModalDemo
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      hasLogo
      title="The art world online"
    />
  ))
  .add("Cta Scrolling", () => (
    <ModalDemo
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      hasLogo
      title="The art world online"
      isLong
    />
  ))
  .add("Cta isFixed", () => (
    <ModalDemo
      cta={{
        isFixed: true,
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      hasLogo
      title="The art world online"
      isLong
    />
  ))
  .add("Image", () => (
    <ModalDemo
      hasLogo
      image={Images[0].image}
      title="The art world online"
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
    />
  ))
  .add("Image Scrolling", () => (
    <ModalDemo
      hasLogo
      image={Images[0].image}
      title="The art world online"
      isLong
      cta={{
        isFixed: true,
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
    />
  ))
  .add("Wide", () => <ModalDemo isWide />)
  .add("Wide Cta", () => (
    <ModalDemo
      cta={{
        text: "Learn More",
        onClick: () => alert("clicked"),
      }}
      isWide
    />
  ))

const text =
  "Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor. Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo."
