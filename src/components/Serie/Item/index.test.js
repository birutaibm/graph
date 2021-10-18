const rewire = require("rewire")
const index = rewire("./index")
const Item = index.__get__("Item")
// @ponicode
describe("Item", () => {
    test("0", () => {
        let callFunction = () => {
            Item({ x: 100, y: 520 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            Item({ x: 400, y: 30 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            Item({ x: 4, y: 90 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            Item({ x: 410, y: 90 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            Item({ x: 350, y: 1 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            Item({ x: undefined, y: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
