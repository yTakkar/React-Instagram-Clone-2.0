/**
 * Socket.io Utility
 * 
 * Manages WebSocket connections for realtime notifications.
 * Maps user IDs to socket IDs for targeted notification delivery.
 */

let io = null
const userSocketMap = new Map() // userId -> socketId

/**
 * Initialize Socket.io with the HTTP server
 * @param {Object} server HTTP server instance
 */
const initSocket = (server) => {
  const socketIo = require('socket.io')
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`)

    // Register user socket mapping
    socket.on('register', (userId) => {
      if (userId) {
        userSocketMap.set(userId.toString(), socket.id)
        console.log(`📱 User ${userId} registered with socket ${socket.id}`)
      }
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      // Remove user from map
      for (let [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId)
          console.log(`📴 User ${userId} disconnected`)
          break
        }
      }
    })
  })

  return io
}

/**
 * Emit a notification to a specific user
 * @param {Number|String} userId Target user ID
 * @param {Object} data Notification data
 */
const emitNotification = (userId, data) => {
  if (!io) return

  const socketId = userSocketMap.get(userId.toString())
  if (socketId) {
    io.to(socketId).emit('notification', data)
  }
}

/**
 * Emit an event to a specific user
 * @param {Number|String} userId Target user ID
 * @param {String} event Event name
 * @param {Object} data Event data
 */
const emitToUser = (userId, event, data) => {
  if (!io) return

  const socketId = userSocketMap.get(userId.toString())
  if (socketId) {
    io.to(socketId).emit(event, data)
  }
}

/**
 * Broadcast to all connected users
 * @param {String} event Event name
 * @param {Object} data Event data
 */
const broadcast = (event, data) => {
  if (!io) return
  io.emit(event, data)
}

/**
 * Get the Socket.io instance
 */
const getIO = () => io

module.exports = {
  initSocket,
  emitNotification,
  emitToUser,
  broadcast,
  getIO,
}
