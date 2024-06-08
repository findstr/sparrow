local pb = require "pb"
local core = require "core"
local logger = require "core.logger"
local websocket = require "core.websocket"
local args = require "lib.args"
local db = require "lib.db"
local cleanup = require "lib.cleanup"
local serverlist = require "lib.conf.serverlist"
local proto = require "app.proto.gateway"
local code = require "app.code"
local packet = require "app.gateway.packet"
local userm = require "app.gateway.userm"
local role = require "app.gateway.role"
local json = require "core.json"


local pcall = core.pcall
local format = string.format
local unpack = string.unpack
local tonumber = tonumber

local encode = packet.encode
local decode = packet.decode

local dbk_uid = setmetatable({}, {__index = function(t, k)
	local dbk = format("uid:%d", k)
	t[k] = dbk
	return dbk
end})

local typeid = proto.typeid
local auth_r = typeid["auth_r"]
local login_r = typeid["login_r"]
local login_a = typeid["login_a"]
local create_r = typeid["create_r"]
local servers_r = typeid["servers_r"]
local client_max = pb.enum("gateway.CMD", "client_max")
local sock_to_account = {}
local sock_to_user = {}

local function error_msg(cmd, code_num)
	local id = typeid[cmd]
	return encode("error_a", {cmd = id, code = code_num})
end

local router = {}
local function auth(sock, _, dat)
	local req = decode("auth_r", dat)
	local account = req.account
	if account ~= "foo" then
		sock:write(error_msg("auth_a", code.args_invalid))
		logger.error("[gateway] account:", account, "is invalid")
		return false
	end
	local password = req.password
	if password ~= "123" then
		sock:write(error_msg("auth_a", code.args_invalid))
		logger.error("[gateway] account:", account, "password:", password, "error")
		return false
	end
	sock_to_account[sock] = account
	sock:write(encode("auth_a", {}))
	logger.info("[gateway] auth ok account:", account, password)
	return true
end

local function login_or_create(sock, cmd, dat)
	local account = sock_to_account[sock]
	if not account then
		logger.error("[gateway] login_r before auth")
		sock:write(error_msg(login_a, code.auth_first))
		return false
	end
	local req = decode(cmd, dat)
	local sid = req.server_id
	if not sid then
		logger.error("[gateway] account:", account, "server_id is nil")
		return false
	end
	local dbk = dbk_uid[sid]
	local ok, uid = db.hget(dbk, account)
	if not ok then
		logger.error("[gateway] account:", account, "sid", sid, "hget error", uid)
		sock:write(error_msg(cmd, code.internal_error))
		return false
	end
	if not uid then	-- 没有玩家ID, 尝试分配一个
		uid = db.newid()
		local ok, res = db.hsetnx(dbk_uid[sid], account, uid)
		if not ok then
			logger.error("[gateway] account:", account, "sid", sid, "uid", uid, "hsetnx error", res)
			sock:write(error_msg(cmd, code.internal_error))
			return false
		end
		if res ~= 1 then
			logger.error("[gateway] account:", account, "sid", sid, "uid", uid, "hsetnx res", res)
			sock:write(error_msg(cmd, code.login_race))
			return true
		end
	else
		uid = tonumber(uid)
	end
	local user = userm.new(uid, account, sock)
	if not user then
		logger.error("[gateway] new user of sock:", sock, "error")
		return false
	end
	local fd = role.assign(uid)
	if not fd then
		logger.error("[gateway] assign role of uid:", uid, "error")
		sock:write(error_msg(cmd, code.internal_error))
		return false
	end
	user:set_role(fd)
	sock_to_user[sock] = user
	return user:forward(cmd, dat)
end

local function servers(sock, _, _)
	local account = sock_to_account[sock]
	if not account then
		logger.error("[gateway] login_r before auth")
		sock:write(error_msg(login_a, code.auth_first))
		return false
	end
	local list = serverlist.get()
	logger.info("server list:", json.encode(list))
	local dat = encode("servers_a", {list = list})
	sock:write(dat)
	return true
end

router[auth_r] = auth
router[login_r] = login_or_create
router[create_r] = login_or_create
router[servers_r] = servers
local function process(sock)
	local dat, typ = sock:read()
	if not dat then
		return false
	end
	if typ == "close" then
		logger.info("[gateway] closed")
		return false
	end
	if typ ~= "binary" or #dat < 4 then
		logger.error("[gateway] unknown type", typ)
		return false
	end
	local cmd = unpack("<I4", dat)
	if cmd >= client_max then
		logger.error("[gateway] invalid cmd:", cmd)
		return false
	end
	local ok
	local user = sock_to_user[sock]
	if user then
		ok = user:forward(cmd, dat:sub(5))
	else
		local fn = router[cmd]
		if not fn then
			logger.error("[gateway] invalid cmd")
			return false
		end
		ok = fn(sock, cmd, dat:sub(5))
	end
	logger.info("[gateway] process cmd:", cmd, "ok:", ok, user)
	return ok
end

local function handler(sock)
	while true do
		local ok, res = pcall(process, sock)
		if not ok then
			logger.error("[gateway] process error", res)
			break
		end
		if not res then
			break
		end
	end
	logger.info("[app.gateway] close sock:", sock)
	sock_to_user[sock] = nil
	sock_to_account[sock] = nil
	sock:close()
end

local ok = websocket.listen {
	port = args.listen,
	handler = handler,
}
if not ok then
	cleanup()
end

role.start(userm.kick_users)

logger.info("gateway start")
