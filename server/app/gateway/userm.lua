local user = require "app.gateway.user"
local logger = require "core.logger"

local M = {}

local uid_to_users = {}

function M.new(uid, account, sock)
	local u = uid_to_users[sock]
	if u then
		if u.account ~= account or u.uid ~= uid then
			logger.error("[userm] sock:", sock, "account:", account, u.account, "uid:", uid, u.uid)
			return nil
		end
		local sock = u.sock
		if sock then
			sock:close()
			logger.info("[userm] kick account:", u.account, "uid", u.uid)
		end
		u = nil
	end
	if not u then
		u = user:new(uid, account, sock)
		uid_to_users[uid] = u
	end
	return  u
end

function M.kick(uid)
	--TODO
end

function M.kick_users(uid_set)
	--TODO
end

function M.get(uid)
	return uid_to_users[uid]
end

return M