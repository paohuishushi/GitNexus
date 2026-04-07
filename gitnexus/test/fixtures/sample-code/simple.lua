-- Module-level functions
local function helper(x) return x * 2 end
function greet(name) return "Hello, " .. name end

-- OOP pattern via metatables
Animal = {}
Animal.__index = Animal

function Animal:new(name, sound)
    return setmetatable({ name = name, sound = sound }, Animal)
end

function Animal:speak()
    return self.name .. " says " .. self.sound
end

function Animal.staticMethod()
    return "static"
end

-- require() imports
local utils = require("lib.utils")
local json = require("dkjson")
