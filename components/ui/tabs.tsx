import * as React from "react"

const Tabs = ({ children, ...props }: any) => <div {...props}>{children}</div>
const TabsList = ({ children, ...props }: any) => <div {...props} className="flex border-b">{children}</div>
const TabsTrigger = ({ children, ...props }: any) => <button {...props} className="px-4 py-2">{children}</button>
const TabsContent = ({ children, ...props }: any) => <div {...props}>{children}</div>

export { Tabs, TabsList, TabsTrigger, TabsContent }
