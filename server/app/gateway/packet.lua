local pb = require "pb"
local proto = require "app.proto.gateway"

local typemap = proto.typemap
local typeid = proto.typeid
local pack = string.pack

local M = {}

function M.decode(cmd, dat)
	local name = typemap[cmd]
	return pb.decode(name, dat)
end

function M.encode(cmd, obj)
	local id = typeid[cmd]
	local name = typemap[cmd]
	local dat = pb.encode(name, obj)
	return pack("<I4", id) .. dat
end


return M

