import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Sections } from "../Sections"
import { StandardArticle, FeatureArticle } from "../../Fixtures/Articles"
import { WrapperWithFullscreenContext } from "../../Fixtures/Helpers"
import { cloneDeep } from "lodash"
import { mount } from "enzyme"

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

const renderSnapshot = props => {
  return renderer.create(
    WrapperWithFullscreenContext(
      <Sections {...props} />
    )
  ).toJSON()
}

const mountWrapper = props => {
  return mount(
    WrapperWithFullscreenContext(
      <Sections {...props} />
    )
  )
}

describe("Sections", () => {
  let props
  beforeEach(() => props = {
    article: StandardArticle,
    DisplayPanel: () => <div>hi!</div>,
    isMobile: true
  })

  describe("snapshots", () => {
    it("renders properly", () => {
      props.isMobile = false
      const sections = renderSnapshot(props)
      expect(sections).toMatchSnapshot()
    })
  })

  describe("units", () => {
    it("doesnt throw an error on invalid markup", () => {
      const spy = jest.spyOn(global.console, "error")

      expect(() => {
        const article = cloneDeep(StandardArticle)
        article.sections = [
          {
            type: "text",
            body: "<p>busted",
          },
        ]
        props.article = article
        mountWrapper(props)
        expect(spy).toHaveBeenCalled()
      }).not.toThrowError()
    })

    it("does not inject if feature", () => {
      const article = cloneDeep(StandardArticle)
      article.layout = "feature"
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
      props.article = article
      const wrapper = mountWrapper(props).childAt(0).instance()
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(false)
      expect(spy).not.toHaveBeenCalled()
    })

    it("does not inject if desktop", () => {
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
      props.isMobile = false
      const wrapper = mountWrapper(props).childAt(0).instance()
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(false)
      expect(spy).not.toHaveBeenCalled()
    })

    it("if mobile, sets flag to inject display", () => {
      const element = document.createElement("div")
      element.id = "__mobile_display_inject__"
      document.getElementById = () => element
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")

      const wrapper = mountWrapper(props).childAt(0).instance()
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(true)
      expect(spy).toHaveBeenCalled()
    })

    it("injects a display panel marker after the second paragraph", () => {
      const { injectDisplayPanelMarker } = Sections.prototype
      const scope = {
        displayInjectId: "__to_replace__",
        props: {
          article: { id: "234" },
        },
      }
      const body = injectDisplayPanelMarker.call(
        scope,
        ["<p>hello</p>", "<p>how are you</p>", "<p>how are you</p>"].join("")
      )

      expect(body).toContain("__mobile_display_inject__234")
    })

    it("#getContentStartIndex returns the index of first text section if feature", () => {
      props.article = FeatureArticle
      const wrapper = mountWrapper(props).childAt(0).instance()
      expect(wrapper.getContentStartIndex()).toBe(0)
    })

    it("#getContentEndIndex returns the index of last text section", () => {
      props.article = FeatureArticle
      const wrapper = mountWrapper(props).childAt(0).instance()
      expect(wrapper.getContentEndIndex()).toBe(11)
    })
  })
})
