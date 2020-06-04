import React, {createContext} from "react"

const LineContext = createContext()
const LineProvider =LineContext.Provider
const LineConsumer = LineContext.Consumer

export {LineContext, LineProvider, LineConsumer}