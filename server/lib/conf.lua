local core = require "core"
local etcd = require "core.etcd"
local logger = require "core.logger"
local args = require "lib.args"
local service = require "lib.conf.service"
local worker = require "lib.conf.worker"
local db = require "lib.db"

local etcd_client

local M = {}
function M.start()
	etcd_client = etcd.newclient {
		retry = 5,
		retry_sleep = 1000,
		endpoints = {args.etcd},
		timeout = 5000,
	}
	local res, err = etcd_client:grant {
		TTL = 5,
	}
	if not res then
		logger.error("[conf.workerid] etcd grant failed:", err)
		core.exit()
	end
	local lease_id = res.ID
	service.start(etcd_client)
	worker.start(etcd_client, lease_id)
end


return M
