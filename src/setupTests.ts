import '@testing-library/jest-dom/extend-expect'

window.URL.createObjectURL = () => ''

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
HTMLCanvasElement.prototype.getContext = () => {
  console.log('test context')
}

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  }
