local logger = require "core.logger"
local service = require "app.role.service"
local router = require "app.role.router"

require "app.role.userm"


service.start(router)

logger.info("role start")