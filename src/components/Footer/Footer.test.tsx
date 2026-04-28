import React from 'react'
import { render } from '@testing-library/react'
import Footer from '@/components/Footer/Footer'

test('Footer text render correctly', () => {
  const { getByTestId } = render(<Footer />)
  const footer = getByTestId('footer')
  const currentYear: number = new Date().getFullYear()
  expect(footer.textContent).toBe(`Statina ©  Clinical Genomics ${currentYear}`)
})
