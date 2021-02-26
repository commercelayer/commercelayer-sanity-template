const path = require('path')
const api = require('../')
const cli = require('../commands')

const fixturePath = p => path.join(__dirname, 'fixtures', p)

describe('check', () => {
  describe('CLI', () => {
    it('should not validate when missing manifest', async () => {
      const mockFn = jest.fn()
      const basedir = fixturePath('sanity-template-empty')

      try {
        await cli.check(basedir)
      } catch (err) {
        mockFn(err)
      }

      expect(mockFn.mock.calls[0][0].message).toMatch(`Unable to resolve template manifest from current working directory`)
    })

    it('should validate minimal manifest', async () => {
      const basedir = fixturePath('sanity-template-minimal')
      await cli.check(basedir)
    })

    it('should validate .sanity-template/manifest.json', async () => {
      const basedir = fixturePath('sanity-dot-template')
      await cli.check(basedir)
    })

    it('should validate simple manifest', async () => {
      const basedir = fixturePath('sanity-template-simple')
      await cli.check(basedir)
    })

    it('should validate advanced manifest', async () => {
      const basedir = fixturePath('sanity-template-advanced')
      await cli.check(basedir)
    })
  })

  describe('Node.js API', () => {
    it('should validate minimal manifest', async () => {
      const result = await api.check({
        basedir: fixturePath('sanity-template-minimal')
      })

      expect(result.type).toBe('valid')
    })

    it('should validate simple manifest', async () => {
      const result = await api.check({
        basedir: fixturePath('sanity-template-simple')
      })

      expect(result.type).toBe('valid')
    })

    it('should validate advanced manifest', async () => {
      const result = await api.check({
        basedir: fixturePath('sanity-template-advanced')
      })

      expect(result.type).toBe('valid')
    })
  })
})
