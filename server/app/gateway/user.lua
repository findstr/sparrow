local role = require "app.gateway.role".rpc()


local M = {}
local mt = {__index = M}

local setmetatable = setmetatable
local pack = string.pack

function M:new(uid, account, sock)
	return setmetatable({
		uid = uid,
		sock = sock,
		account = account,
		role = nil,
	}, mt)
end

function M:set_role(fd)
	self.role = fd
end

function M:forward(cmd, dat)
	local ack = role.forward_r(self.role, {
		uid = self.uid,
		cmd = cmd,
		body = dat,
	})
	print("fowward", cmd, ack.cmd, ack.body)
	if ack then
		self.sock:write(pack("<I4", ack.cmd) .. ack.body)
		return true
	end
	return false

end

return M