namespace gateway {
export interface proto {
  xxx_marshal() :Uint8Array;
  xxx_unmarshal(binary: Uint8Array);
  xxx_name() :string;
}
export const enum CMD {
  error_a = "error_a",
  auth_r = "auth_r",
  auth_a = "auth_a",
  servers_r = "servers_r",
  servers_a = "servers_a",
  login_r = "login_r",
  login_a = "login_a",
  logout_r = "logout_r",
  logout_a = "logout_a",
  create_r = "create_r",
  create_a = "create_a",
  client_max = "client_max",
}

export const encodeCMD: { [key: string]: number } = {
  error_a: 10000,
  auth_r: 10001,
  auth_a: 10002,
  servers_r: 10003,
  servers_a: 10004,
  login_r: 10005,
  login_a: 10006,
  logout_r: 10007,
  logout_a: 10008,
  create_r: 10009,
  create_a: 10010,
  client_max: 19999,
};

export const decodeCMD: { [key: number]: CMD } = {
  10000: CMD.error_a,
  10001: CMD.auth_r,
  10002: CMD.auth_a,
  10003: CMD.servers_r,
  10004: CMD.servers_a,
  10005: CMD.login_r,
  10006: CMD.login_a,
  10007: CMD.logout_r,
  10008: CMD.logout_a,
  10009: CMD.create_r,
  10010: CMD.create_a,
  19999: CMD.client_max,
};

export class error_a implements proto {
  cmd?: number;
  code?: number;
  xxx_marshal() :Uint8Array{
    return encodeerror_a(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodeerror_a(binary)
  }
  xxx_name() :string {
    return "error_a"
  }
}

export function encodeerror_a(message: error_a): Uint8Array {
  let bb = popByteBuffer();
  _encodeerror_a(message, bb);
  return toUint8Array(bb);
}

function _encodeerror_a(message: error_a, bb: ByteBuffer): void {
  // optional uint32 cmd = 1;
  let $cmd = message.cmd;
  if ($cmd !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $cmd);
  }

  // optional uint32 code = 2;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $code);
  }
}

export function decodeerror_a(binary: Uint8Array): error_a {
  return _decodeerror_a(wrapByteBuffer(binary));
}

function _decodeerror_a(bb: ByteBuffer): error_a {
  let message: error_a = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 cmd = 1;
      case 1: {
        message.cmd = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 code = 2;
      case 2: {
        message.code = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class auth_r implements proto {
  account?: string;
  password?: string;
  xxx_marshal() :Uint8Array{
    return encodeauth_r(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodeauth_r(binary)
  }
  xxx_name() :string {
    return "auth_r"
  }
}

export function encodeauth_r(message: auth_r): Uint8Array {
  let bb = popByteBuffer();
  _encodeauth_r(message, bb);
  return toUint8Array(bb);
}

function _encodeauth_r(message: auth_r, bb: ByteBuffer): void {
  // optional string account = 1;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $account);
  }

  // optional string password = 2;
  let $password = message.password;
  if ($password !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $password);
  }
}

export function decodeauth_r(binary: Uint8Array): auth_r {
  return _decodeauth_r(wrapByteBuffer(binary));
}

function _decodeauth_r(bb: ByteBuffer): auth_r {
  let message: auth_r = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string account = 1;
      case 1: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      // optional string password = 2;
      case 2: {
        message.password = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class auth_a implements proto {
  code?: number;
  xxx_marshal() :Uint8Array{
    return encodeauth_a(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodeauth_a(binary)
  }
  xxx_name() :string {
    return "auth_a"
  }
}

export function encodeauth_a(message: auth_a): Uint8Array {
  let bb = popByteBuffer();
  _encodeauth_a(message, bb);
  return toUint8Array(bb);
}

function _encodeauth_a(message: auth_a, bb: ByteBuffer): void {
  // optional uint32 code = 1;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $code);
  }
}

export function decodeauth_a(binary: Uint8Array): auth_a {
  return _decodeauth_a(wrapByteBuffer(binary));
}

function _decodeauth_a(bb: ByteBuffer): auth_a {
  let message: auth_a = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 code = 1;
      case 1: {
        message.code = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class server implements proto {
  id?: number;
  name?: string;
  opentime?: string;
  status?: string;
  xxx_marshal() :Uint8Array{
    return encodeserver(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodeserver(binary)
  }
  xxx_name() :string {
    return "server"
  }
}

export function encodeserver(message: server): Uint8Array {
  let bb = popByteBuffer();
  _encodeserver(message, bb);
  return toUint8Array(bb);
}

function _encodeserver(message: server, bb: ByteBuffer): void {
  // optional uint32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional string opentime = 3;
  let $opentime = message.opentime;
  if ($opentime !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $opentime);
  }

  // optional string status = 4;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $status);
  }
}

export function decodeserver(binary: Uint8Array): server {
  return _decodeserver(wrapByteBuffer(binary));
}

function _decodeserver(bb: ByteBuffer): server {
  let message: server = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string opentime = 3;
      case 3: {
        message.opentime = readString(bb, readVarint32(bb));
        break;
      }

      // optional string status = 4;
      case 4: {
        message.status = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class servers_r implements proto {
  xxx_marshal() :Uint8Array{
    return encodeservers_r(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodeservers_r(binary)
  }
  xxx_name() :string {
    return "servers_r"
  }
}

export function encodeservers_r(message: servers_r): Uint8Array {
  let bb = popByteBuffer();
  _encodeservers_r(message, bb);
  return toUint8Array(bb);
}

function _encodeservers_r(message: servers_r, bb: ByteBuffer): void {
}

export function decodeservers_r(binary: Uint8Array): servers_r {
  return _decodeservers_r(wrapByteBuffer(binary));
}

function _decodeservers_r(bb: ByteBuffer): servers_r {
  let message: servers_r = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class servers_a implements proto {
  code?: number;
  list?: server[];
  xxx_marshal() :Uint8Array{
    return encodeservers_a(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodeservers_a(binary)
  }
  xxx_name() :string {
    return "servers_a"
  }
}

export function encodeservers_a(message: servers_a): Uint8Array {
  let bb = popByteBuffer();
  _encodeservers_a(message, bb);
  return toUint8Array(bb);
}

function _encodeservers_a(message: servers_a, bb: ByteBuffer): void {
  // optional uint32 code = 1;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $code);
  }

  // repeated server list = 2;
  let array$list = message.list;
  if (array$list !== undefined) {
    for (let value of array$list) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeserver(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeservers_a(binary: Uint8Array): servers_a {
  return _decodeservers_a(wrapByteBuffer(binary));
}

function _decodeservers_a(bb: ByteBuffer): servers_a {
  let message: servers_a = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 code = 1;
      case 1: {
        message.code = readVarint32(bb) >>> 0;
        break;
      }

      // repeated server list = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.list || (message.list = []);
        values.push(_decodeserver(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class login_r implements proto {
  server_id?: number;
  xxx_marshal() :Uint8Array{
    return encodelogin_r(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodelogin_r(binary)
  }
  xxx_name() :string {
    return "login_r"
  }
}

export function encodelogin_r(message: login_r): Uint8Array {
  let bb = popByteBuffer();
  _encodelogin_r(message, bb);
  return toUint8Array(bb);
}

function _encodelogin_r(message: login_r, bb: ByteBuffer): void {
  // optional uint32 server_id = 1;
  let $server_id = message.server_id;
  if ($server_id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $server_id);
  }
}

export function decodelogin_r(binary: Uint8Array): login_r {
  return _decodelogin_r(wrapByteBuffer(binary));
}

function _decodelogin_r(bb: ByteBuffer): login_r {
  let message: login_r = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 server_id = 1;
      case 1: {
        message.server_id = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class login_a implements proto {
  code?: number;
  uid?: Long;
  xxx_marshal() :Uint8Array{
    return encodelogin_a(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodelogin_a(binary)
  }
  xxx_name() :string {
    return "login_a"
  }
}

export function encodelogin_a(message: login_a): Uint8Array {
  let bb = popByteBuffer();
  _encodelogin_a(message, bb);
  return toUint8Array(bb);
}

function _encodelogin_a(message: login_a, bb: ByteBuffer): void {
  // optional uint32 code = 1;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $code);
  }

  // optional uint64 uid = 2;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $uid);
  }
}

export function decodelogin_a(binary: Uint8Array): login_a {
  return _decodelogin_a(wrapByteBuffer(binary));
}

function _decodelogin_a(bb: ByteBuffer): login_a {
  let message: login_a = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 code = 1;
      case 1: {
        message.code = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint64 uid = 2;
      case 2: {
        message.uid = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class create_r implements proto {
  server_id?: number;
  name?: string;
  xxx_marshal() :Uint8Array{
    return encodecreate_r(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodecreate_r(binary)
  }
  xxx_name() :string {
    return "create_r"
  }
}

export function encodecreate_r(message: create_r): Uint8Array {
  let bb = popByteBuffer();
  _encodecreate_r(message, bb);
  return toUint8Array(bb);
}

function _encodecreate_r(message: create_r, bb: ByteBuffer): void {
  // optional uint32 server_id = 1;
  let $server_id = message.server_id;
  if ($server_id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $server_id);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }
}

export function decodecreate_r(binary: Uint8Array): create_r {
  return _decodecreate_r(wrapByteBuffer(binary));
}

function _decodecreate_r(bb: ByteBuffer): create_r {
  let message: create_r = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 server_id = 1;
      case 1: {
        message.server_id = readVarint32(bb) >>> 0;
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export class create_a implements proto {
  code?: number;
  uid?: Long;
  xxx_marshal() :Uint8Array{
    return encodecreate_a(this)
  }
  xxx_unmarshal(binary: Uint8Array) {
    decodecreate_a(binary)
  }
  xxx_name() :string {
    return "create_a"
  }
}

export function encodecreate_a(message: create_a): Uint8Array {
  let bb = popByteBuffer();
  _encodecreate_a(message, bb);
  return toUint8Array(bb);
}

function _encodecreate_a(message: create_a, bb: ByteBuffer): void {
  // optional uint32 code = 1;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $code);
  }

  // optional uint64 uid = 2;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $uid);
  }
}

export function decodecreate_a(binary: Uint8Array): create_a {
  return _decodecreate_a(wrapByteBuffer(binary));
}

function _decodecreate_a(bb: ByteBuffer): create_a {
  let message: create_a = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 code = 1;
      case 1: {
        message.code = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint64 uid = 2;
      case 2: {
        message.uid = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}

export const encoder: { [key: string]: Function } = {
  error_a: encodeerror_a,
  auth_r: encodeauth_r,
  auth_a: encodeauth_a,
  server: encodeserver,
  servers_r: encodeservers_r,
  servers_a: encodeservers_a,
  login_r: encodelogin_r,
  login_a: encodelogin_a,
  create_r: encodecreate_r,
  create_a: encodecreate_a,
};

export const decoder: { [key: string]: Function } = {
  error_a: decodeerror_a,
  auth_r: decodeauth_r,
  auth_a: decodeauth_a,
  server: decodeserver,
  servers_r: decodeservers_r,
  servers_a: decodeservers_a,
  login_r: decodelogin_r,
  login_a: decodelogin_a,
  create_r: decodecreate_r,
  create_a: decodecreate_a,
};

}