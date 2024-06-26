local zproto = require "zproto"

local proto = assert(zproto:parse [[
hello_r 200000 {
	.id:uint32 1
	.name:string 2
}

hello_a 200001 {}

forward_r 200002 {
	.uid:uint64 1
	.cmd:uint32 2
	.body:blob 3
}

forward_a 200003 {
	.cmd:uint32 1
	.body:blob 2
}

kick_r 200004 {
	.uid:uint64 1
	.code:uint32 2
}

kick_a 200005 {
	.code:uint32 1
}

]])

return proto