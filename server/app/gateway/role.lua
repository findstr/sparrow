local core = require "core"
local cleanup = require "lib.cleanup"
local args = require "lib.args"
local logger = require "core.logger"
local cluster = require "core.cluster"
local conf = require "lib.conf.service"
local callret = require "app.proto.callret"
local clusterp = require "app.proto.cluster"
local ipairs = ipairs

local kick_users
local function unmarshal(cmd, buf, size)
	return clusterp:decode(cmd, buf, size)
end

local function marshal(cmd, body)
	cmd = clusterp:tag(cmd)
	return cmd, clusterp:encode(cmd, body, true)
end

local router = {}
local fd_to_id = {}
local id_to_fd = {}
local id_to_addr = {}
local fd_uid_set = setmetatable({}, {__index = function(t, k)
	local v = {}
	t[k] = v
	return v
end})

local role

router[clusterp:tag("kick_r")] = function(body, fd)
	--TODO:
	return {}
end

local function event_addr(id, addr)
	id_to_addr[id] = addr
	if addr then
		local fd = role.connect(addr)
		if not fd then
			logger.error("[role] connect to", addr, "error")
			return
		end
		local ack = role.hello_r(fd, {
			id = id,
			name = args.service,
		})
		if ack then
			id_to_fd[id] = fd
			logger.info("[role] connect to id:", id, "addr:", addr, "success")
		end
	else
		role.close(addr)
		local fd = id_to_fd[id]
		if fd then
			id_to_fd[id] = nil
		end
	end
end

role = cluster.new {
	callret = callret(clusterp),
	marshal = marshal,
	unmarshal = unmarshal,
	call = function(body, cmd, fd)
		return router[cmd](body, fd)
	end,
	close = function(fd, errno)
		local id = fd_to_id[fd]
		if not id then
			return
		end
		fd_to_id[fd] = nil
		id_to_fd[id] = nil
		local uid_set = fd_uid_set[fd]
		fd_uid_set[fd] = nil
		kick_users(uid_set)
		local addr = id_to_addr[id]
		logger.error("[role] close id:", id, "addr:", addr, "fd:", fd, "errno:", errno)
		core.fork(function()
			event_addr(id, addr)
		end)
	end,
}

local M = {}
local cap
function M.start(kick)
	local desc = conf.get("role")
	if not desc then
		logger.error("[role] get conf error")
		return cleanup()
	end
	cap = desc.capacity
	kick_users = kick
	conf.watch("role", event_addr)
	for id, addr in ipairs(desc) do
		event_addr(id, addr)
	end
end

function M.assign(uid)
	local id = uid % cap + 1
	local fd = id_to_fd[id]
	if fd then
		fd_uid_set[fd][uid] = true
	end
	return fd
end

function M.rpc()
	return role
end

return M
