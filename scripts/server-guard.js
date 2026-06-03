const { fork } = require('child_process')
const path = require('path')

const entry = path.join(__dirname, '..', 'app.js')
const baseDelayMs = Number(process.env.RESTART_DELAY_MS) || 2000
const maxDelayMs = Number(process.env.RESTART_MAX_DELAY_MS) || 30000
const maxAttemptsRaw = Number(process.env.RESTART_MAX_ATTEMPTS)
const maxAttempts = Number.isFinite(maxAttemptsRaw) ? maxAttemptsRaw : Infinity

let attempts = 0
let child = null
let stopping = false

const startChild = () => {
  child = fork(entry, [], { stdio: 'inherit' })

  child.on('exit', (code, signal) => {
    if (stopping) return
    if (code === 0 && !signal) return

    attempts += 1
    if (attempts > maxAttempts) {
      console.error('Restart limit reached. Exiting guard process.')
      process.exit(1)
    }

    const cappedAttempts = Math.min(attempts - 1, 5)
    const delay = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, cappedAttempts))
    console.warn(
      `Server exited (code=${code}, signal=${signal}). Restarting in ${delay}ms...`
    )
    setTimeout(startChild, delay)
  })
}

const stopChild = (signal) => {
  stopping = true
  if (child && !child.killed) {
    child.kill(signal)
  }
}

process.on('SIGINT', () => stopChild('SIGINT'))
process.on('SIGTERM', () => stopChild('SIGTERM'))

startChild()
