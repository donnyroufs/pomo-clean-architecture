import { UniqueId } from './unique-id.vo'

describe('unique-id.vo', () => {
  test('generates a id', () => {
    const uniqueId = UniqueId.make()

    expect(uniqueId.value).toEqual(expect.any(String))
  })
})
