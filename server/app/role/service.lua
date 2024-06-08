local core = require "core"
local cleanup = require "lib.cleanup"
local args = require "lib.args"
local logger = require "core.logger"
local conf = require "lib.conf.service"
local cluster = require "core.cluster"
local callret = require "app.proto.callret"
local clusterp = require "app.proto.cluster"
local proto = require "app.proto.gateway"
local pb = require "pb"
local pairs = pairs
local typeid = proto.typeid
local typemap = proto.typemap
local typeack = proto.typeack
local crouter = {}

local function unmarshal(cmd, buf, sz)
	return clusterp:decode(cmd, buf, sz)
end

local function marshal(cmd, body)
	cmd = clusterp:tag(cmd)
	return cmd, clusterp:encode(cmd, body)
end

local routerx = {}

local serve = cluster.new {
	callret = callret(clusterp),
	marshal = marshal,
	unmarshal = unmarshal,
	call = function(body, cmd, fd)
		return routerx[cmd](body, fd)
	end,
	close = function(fd, errno)
	end,
}


local router = {}
function router.hello_r(req)
	logger.info("[role] hello_r", req.name, req.id)
	assert(req.name == "gateway", req.name)
	return {}
end

function router.forward_r(req, fd)
	local cmd = req.cmd
	local fn = crouter[cmd]
	if not fn then
		logger.error("[role] forward_r uid:", req.uid, "cmd:", cmd, "not found")
		return nil
	end
	local name = typemap[cmd]
	local body = pb.decode(name, req.body)
	local ack = fn(req.uid, body, fd)
	if ack then
		local ack_name = typeack[cmd]
		local id = typeid[ack_name]
		print("forward_r", cmd, ack_name , id)
		local dat = pb.encode(typemap[id], ack)
		return {cmd = id, body = dat}
	end
	return nil
end

local M = {}
function M.start(r)
	for req, fn in pairs(router) do
		routerx[clusterp:tag(req)] = fn
	end
	for cmd, fn in pairs(r) do
		crouter[typeid[cmd]] = fn
	end
	local ok, err = serve.listen(args.listen)
	if not ok then
		logger.error("[role] listen addr:", args.listen, "error:", err)
		return cleanup()
	end
end

function M.rpc()
	return serve
end

return M
