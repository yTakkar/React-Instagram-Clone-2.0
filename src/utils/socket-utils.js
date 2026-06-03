/**
 * Socket.io Client Utilities
 * 
 * Connects to the WebSocket server for realtime notifications.
 * Call initSocketConnection() after user logs in.
 */

import io from 'socket.io-client'

let socket = null
let notificationCallbacks = []

/**
 * Initialize socket connection
 * @param {Number} userId Current user's ID
 */
export const initSocketConnection = (userId) => {
  if (socket) {
    socket.disconnect()
  }

  socket = io(window.location.origin, {
    transports: ['websocket', 'polling'],
  })

  socket.on('connect', () => {
    console.log('🔌 Socket connected')
    // Register user with server
    socket.emit('register', userId)
  })

  // Listen for notifications
  socket.on('notification', (data) => {
    console.log('🔔 New notification:', data)
    // Call all registered callbacks
    notificationCallbacks.forEach(cb => cb(data))
  })

  socket.on('disconnect', () => {
    console.log('📴 Socket disconnected')
  })

  return socket
}

/**
 * Register a callback for new notifications
 * @param {Function} callback Function to call when notification received
 * @returns {Function} Unsubscribe function
 */
export const onNotification = (callback) => {
  notificationCallbacks.push(callback)
  return () => {
    notificationCallbacks = notificationCallbacks.filter(cb => cb !== callback)
  }
}

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

/**
 * Get the socket instance
 */
export const getSocket = () => socket
