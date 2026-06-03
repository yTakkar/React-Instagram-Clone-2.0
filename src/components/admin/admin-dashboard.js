import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { Redirect } from 'react-router-dom'
import { isAdmin } from '../../utils/admin-utils'
import axios from 'axios'
import Notify from 'handy-notification'

const emptyNewUser = {
  username: '',
  firstname: '',
  surname: '',
  email: '',
  password: '',
  role: 'user',
  account_status: 'active',
  account_type: 'public',
}

const palette = {
  brand: '#bb86fc',               // Vibrant signature purple ($pric)
  info: '#38bdf8',                // Vibrant dark-mode cyan
  teal: '#2dd4bf',                // Vibrant dark-mode teal
  accent: '#fb923c',              // Vibrant dark-mode orange
  success: '#4ade80',             // Vibrant dark-mode green
  warning: '#facc15',             // Vibrant dark-mode yellow
  danger: '#f87171',              // Vibrant dark-mode red
  neutral: '#94a3b8',             // Muted slate gray
  text: '#ffffff',                // Pure white ($dark)
  textSecondary: '#e2e8f0',       // Soft off-white
  textMuted: '#b3b3b3',           // Medium gray ($d_light)
  textFaint: '#6b7280',           // Faint gray
  border: '#2c2c2c',              // Dark border color ($ee)
  borderStrong: '#3f3f46',        // Lighter gray border
  surface: '#1e1e1e',             // Dark surface card ($ff)
  surfaceAlt: '#121212',          // Pitch black background ($fb)
  surfaceSoft: '#27272a',         // Charcoal surface background
  cardUsers: '#1e1e1e',           // Unified dark card surface
  cardPosts: '#1e1e1e',           // Unified dark card surface
  cardInteractions: '#1e1e1e',    // Unified dark card surface
  cardSocial: '#1e1e1e',          // Unified dark card surface
  nsfwBg: 'rgba(248, 113, 113, 0.1)',
  nsfwText: '#f87171',
  safeBg: 'rgba(74, 222, 128, 0.1)',
  safeText: '#4ade80',
  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(0, 0, 0, 0.3)',
  gridLine: 'rgba(255, 255, 255, 0.02)',
  gridLineStrong: 'rgba(255, 255, 255, 0.05)',
}

export default class AdminDashboard extends Component {
  state = {
    stats: null,
    loading: true,
    activeTab: 'overview',
    pendingPosts: [],
    users: [],
    comments: [],
    usersPage: 1,
    userSearch: '',
    userStatusFilter: '',
    newUser: { ...emptyNewUser },
    editUser: null,
  }

  componentDidMount() {
    this.fetchStats()
    this.fetchPendingPosts()
    this.fetchUsers()
    this.fetchComments()
  }

  fetchStats = async () => {
    try {
      let { data } = await axios.post('/api/admin/get-stats')
      this.setState({ stats: data, loading: false })
    } catch (err) {
      this.setState({ loading: false })
    }
  }

  fetchPendingPosts = async () => {
    try {
      let { data } = await axios.post('/api/get-pending-posts')
      this.setState({ pendingPosts: data })
    } catch (err) { /* ignore */ }
  }

  fetchUsers = async (page = 1) => {
    try {
      let { data } = await axios.post('/api/admin/get-users', {
        page,
        search: this.state.userSearch,
        status: this.state.userStatusFilter,
      })
      this.setState({ users: data.users || [], usersPage: data.page })
    } catch (err) { /* ignore */ }
  }

  updateNewUser = (field, value) => {
    this.setState(prev => ({
      newUser: {
        ...prev.newUser,
        [field]: value,
      },
    }))
  }

  updateEditUser = (field, value) => {
    this.setState(prev => ({
      editUser: {
        ...prev.editUser,
        [field]: value,
      },
    }))
  }

  createUser = async (e) => {
    e.preventDefault()
    const { newUser } = this.state

    if (!newUser.username || !newUser.firstname || !newUser.surname || !newUser.email || !newUser.password) {
      Notify({ value: 'Please fill out all required fields.' })
      return
    }

    try {
      let { data } = await axios.post('/api/admin/create-user', newUser)
      if (data && data.success) {
        Notify({ value: data.mssg || 'User created!' })
        this.setState({ newUser: { ...emptyNewUser } })
        this.fetchUsers(1)
        this.fetchStats()
      } else {
        Notify({ value: data.mssg || 'Unable to create user.' })
      }
    } catch (err) {
      Notify({ value: 'Unable to create user.' })
    }
  }

  startEditUser = (user) => {
    this.setState({
      editUser: {
        id: user.id,
        username: user.username || '',
        firstname: user.firstname || '',
        surname: user.surname || '',
        nickname: user.nickname || '',
        email: user.email || '',
        role: user.role || 'user',
        account_status: user.account_status || 'active',
        account_type: user.account_type || 'public',
        password: '',
      },
    })
  }

  cancelEditUser = () => {
    this.setState({ editUser: null })
  }

  saveEditUser = async (e) => {
    e.preventDefault()
    const { editUser, usersPage } = this.state

    if (!editUser) return

    const payload = {
      user_id: editUser.id,
      username: editUser.username,
      firstname: editUser.firstname,
      surname: editUser.surname,
      nickname: editUser.nickname,
      email: editUser.email,
      role: editUser.role,
      account_status: editUser.account_status,
      account_type: editUser.account_type,
    }

    if (editUser.password) {
      payload.password = editUser.password
    }

    try {
      let { data } = await axios.post('/api/admin/update-user', payload)
      if (data && data.success) {
        Notify({ value: data.mssg || 'User updated!' })
        this.setState({ editUser: null })
        this.fetchUsers(usersPage)
        this.fetchStats()
      } else {
        Notify({ value: data.mssg || 'Unable to update user.' })
      }
    } catch (err) {
      Notify({ value: 'Unable to update user.' })
    }
  }

  fetchComments = async () => {
    try {
      let { data } = await axios.post('/api/admin/get-comments', { page: 1 })
      this.setState({ comments: data.comments || [] })
    } catch (err) { /* ignore */ }
  }

  approvePost = async (post_id) => {
    await axios.post('/api/approve-post', { post_id })
    this.fetchPendingPosts()
    this.fetchStats()
  }

  toggleNSFW = async (post_id, currentNSFW) => {
    await axios.post('/api/toggle-nsfw', { post_id, isNSFW: !currentNSFW })
    this.fetchPendingPosts()
    this.fetchStats()
  }

  rejectPost = async (post_id) => {
    let reason = prompt('Enter rejection reason:')
    if (reason) {
      await axios.post('/api/reject-post', { post_id, reason })
      this.fetchPendingPosts()
      this.fetchStats()
    }
  }

  lockUser = async (user_id) => {
    if (window.confirm('Are you sure you want to lock this account?')) {
      await axios.post('/api/admin/lock-user', { user_id })
      this.fetchUsers(this.state.usersPage)
      this.fetchStats()
    }
  }

  unlockUser = async (user_id) => {
    await axios.post('/api/admin/unlock-user', { user_id })
    this.fetchUsers(this.state.usersPage)
    this.fetchStats()
  }

  deleteUser = async (user_id) => {
    if (window.confirm('Are you sure you want to delete this account? This is a soft delete.')) {
      await axios.post('/api/admin/delete-user', { user_id })
      this.fetchUsers(this.state.usersPage)
      this.fetchStats()
    }
  }

  deleteComment = async (comment_id) => {
    if (window.confirm('Delete this comment?')) {
      await axios.post('/api/admin/delete-comment', { comment_id })
      this.fetchComments()
      this.fetchStats()
    }
  }

  deletePost = async (post_id) => {
    if (window.confirm('Permanently delete this post?')) {
      await axios.post('/api/admin/delete-post', { post_id })
      this.fetchPendingPosts()
      this.fetchStats()
    }
  }

  formatNumber = (value) => {
    const num = Number(value) || 0
    return num.toLocaleString()
  }

  renderBarChart = (items) => {
    const values = items.map(item => Number(item.value) || 0)
    const maxValue = Math.max(...values, 1)

    return (
      <div>
        {items.map((item, index) => {
          const value = Number(item.value) || 0
          const pct = Math.round((value / maxValue) * 100)
          const rowStyle = {
            ...styles.chartRow,
            ...(index === items.length - 1 ? styles.chartRowLast : {}),
          }

          return (
            <div key={item.label} style={rowStyle}>
            <div style={styles.chartLabel}>{item.label}</div>
            <div style={styles.chartBarTrack}>
              <div
                style={{
                  ...styles.chartBar,
                    width: `${Math.round((value / maxValue) * 100)}%`,
                  background: item.color,
                }}
              />
            </div>
              <div style={styles.chartValue}>
                {this.formatNumber(value)} ({pct}%)
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderPieChart = (items) => {
    const normalized = items.map(item => ({
      label: item.label,
      value: Number(item.value) || 0,
      color: item.color || palette.textMuted,
    }))
    const total = normalized.reduce((sum, item) => sum + item.value, 0)

    let slices = []
    if (total > 0) {
      let acc = 0
      normalized.forEach(item => {
        if (item.value <= 0) return
        const startPct = (acc / total) * 100
        acc += item.value
        const endPct = (acc / total) * 100
        slices.push(`${item.color} ${startPct}% ${endPct}%`)
      })
    }

    const backgroundImage =
      total > 0 && slices.length
        ? `conic-gradient(${slices.join(', ')})`
        : `conic-gradient(${palette.border} 0% 100%)`

    return (
      <div style={styles.pieWrap}>
        <div style={{ ...styles.pie, backgroundImage }}>
          <div style={styles.pieCenter}>{this.formatNumber(total)}</div>
        </div>
        <div style={styles.pieLegend}>
          {normalized.map(item => {
            const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={item.label} style={styles.pieLegendItem}>
                <span style={{ ...styles.pieSwatch, background: item.color }} />
                <span style={styles.pieLegendLabel}>{item.label}</span>
                <span style={styles.pieLegendValue}>
                  {this.formatNumber(item.value)} ({pct}%)
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    let {
      stats,
      loading,
      activeTab,
      pendingPosts,
      users,
      comments,
      newUser,
      editUser,
    } = this.state

    return (
      <div>
        {!isAdmin() && <Redirect to="/admin-login" />}

        <Title
          value="Admin Dashboard"
          desc="Manage users, posts, comments, and view system statistics"
        />

        <FadeIn duration="300ms">
          <div className="admin-dashboard" style={styles.container}>
            <h2 style={styles.heading}>📊 Admin Dashboard</h2>

            {/* Tab Navigation */}
            <div style={styles.tabs}>
              {['overview', 'users', 'posts', 'comments'].map(tab => (
                <button
                  key={tab}
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab ? styles.activeTab : {}),
                  }}
                  onClick={() => this.setState({ activeTab: tab })}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {loading && <div style={styles.loading}>Loading statistics...</div>}

            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (() => {
              const userBars = [
                { label: 'Active', value: stats.users.active, color: palette.success },
                { label: 'Locked', value: stats.users.locked, color: palette.warning },
                { label: 'Deleted', value: stats.users.deleted, color: palette.danger },
                { label: 'Admins', value: stats.users.admins, color: palette.brand },
              ]

              const postBars = [
                { label: 'Approved', value: stats.posts.approved, color: palette.success },
                { label: 'Pending', value: stats.posts.pending, color: palette.warning },
                { label: 'Rejected', value: stats.posts.rejected, color: palette.danger },
              ]

              const interactionBars = [
                { label: 'Comments', value: stats.interactions.comments, color: palette.info },
                { label: 'Likes', value: stats.interactions.likes, color: palette.teal },
                { label: 'Shares', value: stats.interactions.shares, color: palette.accent },
                { label: 'Follows', value: stats.interactions.follows, color: palette.neutral },
              ]

              const socialBars = [
                { label: 'Groups', value: stats.interactions.groups, color: palette.success },
                { label: 'Conversations', value: stats.interactions.conversations, color: palette.warning },
                { label: 'Notifications', value: stats.interactions.notifications, color: palette.danger },
              ]

              const friendStats = stats.friend_requests || { total: 0, pending: 0, accepted: 0, rejected: 0 }
              const friendBars = [
                { label: 'Pending', value: friendStats.pending, color: palette.warning },
                { label: 'Accepted', value: friendStats.accepted, color: palette.success },
                { label: 'Rejected', value: friendStats.rejected, color: palette.danger },
              ]

              return (
                <div>
                  <div style={styles.statsGrid}>
                    <div style={{ ...styles.statCard, borderLeft: `4px solid ${palette.brand}` }}>
                      <h3 style={{ color: palette.textSecondary, fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Users</h3>
                      <p style={styles.statNumber}>{stats.users.total}</p>
                      <small style={{ color: palette.textMuted }}>Active: {stats.users.active} | Locked: {stats.users.locked} | Deleted: {stats.users.deleted}</small>
                      <br/><small style={{ color: palette.textFaint }}>New (7d): {stats.users.new_7d} | Admins: {stats.users.admins}</small>
                    </div>
                    <div style={{ ...styles.statCard, borderLeft: `4px solid ${palette.success}` }}>
                      <h3 style={{ color: palette.textSecondary, fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Posts</h3>
                      <p style={styles.statNumber}>{stats.posts.total}</p>
                      <small style={{ color: palette.textMuted }}>Approved: {stats.posts.approved} | Pending: {stats.posts.pending} | Rejected: {stats.posts.rejected}</small>
                      <br/><small style={{ color: palette.textFaint }}>New (7d): {stats.posts.new_7d}</small>
                    </div>
                    <div style={{ ...styles.statCard, borderLeft: `4px solid ${palette.accent}` }}>
                      <h3 style={{ color: palette.textSecondary, fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interactions</h3>
                      <p style={styles.statNumber}>{stats.interactions.comments + stats.interactions.likes}</p>
                      <small style={{ color: palette.textMuted }}>Comments: {stats.interactions.comments} | Likes: {stats.interactions.likes}</small>
                      <br/><small style={{ color: palette.textFaint }}>Shares: {stats.interactions.shares} | Follows: {stats.interactions.follows}</small>
                    </div>
                    <div style={{ ...styles.statCard, borderLeft: `4px solid ${palette.info}` }}>
                      <h3 style={{ color: palette.textSecondary, fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social</h3>
                      <p style={styles.statNumber}>{stats.interactions.groups}</p>
                      <small style={{ color: palette.textMuted }}>Groups | Conversations: {stats.interactions.conversations}</small>
                      <br/><small style={{ color: palette.textFaint }}>Notifications: {stats.interactions.notifications}</small>
                    </div>
                  </div>

                  <div style={styles.chartsGrid}>
                    <div style={styles.chartCard}>
                      <div style={styles.chartTitle}>User status split</div>
                      {this.renderPieChart(userBars)}
                    </div>
                    <div style={styles.chartCard}>
                      <div style={styles.chartTitle}>Post status</div>
                      {this.renderBarChart(postBars)}
                    </div>
                    <div style={styles.chartCard}>
                      <div style={styles.chartTitle}>Interaction volume</div>
                      {this.renderBarChart(interactionBars)}
                    </div>
                    <div style={styles.chartCard}>
                      <div style={styles.chartTitle}>Social activity</div>
                      {this.renderBarChart(socialBars)}
                    </div>
                    <div style={styles.chartCard}>
                      <div style={styles.chartTitle}>Friend requests</div>
                      {this.renderBarChart(friendBars)}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div style={styles.filterBar}>
                  <input
                    type="text"
                    placeholder="Search users..."
                    style={styles.searchInput}
                    value={this.state.userSearch}
                    onChange={e => this.setState({ userSearch: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && this.fetchUsers(1)}
                  />
                  <select
                    style={styles.select}
                    value={this.state.userStatusFilter}
                    onChange={e => {
                      this.setState({ userStatusFilter: e.target.value }, () => this.fetchUsers(1))
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                    <option value="deleted">Deleted</option>
                  </select>
                </div>

                <div style={styles.formCard}>
                  <div style={styles.formTitle}>Create user</div>
                  <form style={styles.formGrid} onSubmit={this.createUser}>
                    <input
                      type="text"
                      placeholder="Username"
                      style={styles.formInput}
                      value={newUser.username}
                      onChange={e => this.updateNewUser('username', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="First name"
                      style={styles.formInput}
                      value={newUser.firstname}
                      onChange={e => this.updateNewUser('firstname', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Surname"
                      style={styles.formInput}
                      value={newUser.surname}
                      onChange={e => this.updateNewUser('surname', e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      style={styles.formInput}
                      value={newUser.email}
                      onChange={e => this.updateNewUser('email', e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      style={styles.formInput}
                      value={newUser.password}
                      onChange={e => this.updateNewUser('password', e.target.value)}
                      required
                    />
                    <select
                      style={styles.formSelect}
                      value={newUser.role}
                      onChange={e => this.updateNewUser('role', e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <select
                      style={styles.formSelect}
                      value={newUser.account_status}
                      onChange={e => this.updateNewUser('account_status', e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="locked">Locked</option>
                      <option value="deleted">Deleted</option>
                    </select>
                    <select
                      style={styles.formSelect}
                      value={newUser.account_type}
                      onChange={e => this.updateNewUser('account_type', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                    <div style={styles.formActions}>
                      <button type="submit" style={styles.btnSuccess}>Create</button>
                    </div>
                  </form>
                </div>

                {editUser && (
                  <div style={styles.formCard}>
                    <div style={styles.formTitle}>Edit user</div>
                    <form style={styles.formGrid} onSubmit={this.saveEditUser}>
                      <input
                        type="text"
                        placeholder="Username"
                        style={styles.formInput}
                        value={editUser.username}
                        onChange={e => this.updateEditUser('username', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="First name"
                        style={styles.formInput}
                        value={editUser.firstname}
                        onChange={e => this.updateEditUser('firstname', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Surname"
                        style={styles.formInput}
                        value={editUser.surname}
                        onChange={e => this.updateEditUser('surname', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Nickname"
                        style={styles.formInput}
                        value={editUser.nickname}
                        onChange={e => this.updateEditUser('nickname', e.target.value)}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        style={styles.formInput}
                        value={editUser.email}
                        onChange={e => this.updateEditUser('email', e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="New password (optional)"
                        style={styles.formInput}
                        value={editUser.password}
                        onChange={e => this.updateEditUser('password', e.target.value)}
                      />
                      <select
                        style={styles.formSelect}
                        value={editUser.role}
                        onChange={e => this.updateEditUser('role', e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <select
                        style={styles.formSelect}
                        value={editUser.account_status}
                        onChange={e => this.updateEditUser('account_status', e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="locked">Locked</option>
                        <option value="deleted">Deleted</option>
                      </select>
                      <select
                        style={styles.formSelect}
                        value={editUser.account_type}
                        onChange={e => this.updateEditUser('account_type', e.target.value)}
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                      <div style={styles.formActions}>
                        <button type="submit" style={styles.btnSuccess}>Save</button>
                        <button type="button" style={styles.btnWarning} onClick={this.cancelEditUser}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Username</th>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Role</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Posts</th>
                      <th style={styles.th}>Followers</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={styles.tr}>
                        <td style={styles.td}>{u.id}</td>
                        <td style={styles.td}>{u.username}</td>
                        <td style={styles.td}>{u.firstname} {u.surname}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            background: u.role === 'admin' ? palette.brand : palette.info
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            background: u.account_status === 'active' ? palette.success :
                              u.account_status === 'locked' ? palette.warning : palette.danger
                          }}>
                            {u.account_status}
                          </span>
                        </td>
                        <td style={styles.td}>{u.post_count}</td>
                        <td style={styles.td}>{u.followers_count}</td>
                        <td style={styles.td}>
                          <button style={styles.btnInfo} onClick={() => this.startEditUser(u)}>Edit</button>
                          {u.account_status === 'active' && (
                            <button style={styles.btnWarning} onClick={() => this.lockUser(u.id)}>Lock</button>
                          )}
                          {u.account_status === 'locked' && (
                            <button style={styles.btnSuccess} onClick={() => this.unlockUser(u.id)}>Unlock</button>
                          )}
                          {u.account_status !== 'deleted' && (
                            <button style={styles.btnDanger} onClick={() => this.deleteUser(u.id)}>Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Posts Tab (Pending) */}
            {activeTab === 'posts' && (
              <div>
                <h3 style={styles.subHeading}>⏳ Pending Posts ({pendingPosts.length})</h3>
                {pendingPosts.length === 0 && <p style={styles.emptyText}>No pending posts</p>}
                {pendingPosts.map(p => (
                  <div key={p.post_id} style={styles.postCard}>
                    <div style={styles.postHeader}>
                      <strong>@{p.username}</strong>
                      <span style={styles.postTime}>
                        {new Date(parseInt(p.post_time)).toLocaleString()}
                      </span>
                    </div>
                    {p.imgSrc && (
                      p.imgSrc.match(/\.(mp4|webm|mov|ogg|mkv)$/i) ? (
                        <video
                          src={`/posts/${p.imgSrc}`}
                          style={{...styles.postImage, width: '100%', maxHeight: '400px'}}
                          controls
                        />
                      ) : (
                        <img
                          src={`/posts/${p.imgSrc}`}
                          alt="Post"
                          style={styles.postImage}
                        />
                      )
                    )}
                    <p style={styles.postDesc}>{p.description}</p>
                    <div
                      style={{
                        ...styles.nsfwWarning,
                        background: p.isNSFW ? palette.nsfwBg : palette.safeBg,
                        color: p.isNSFW ? palette.nsfwText : palette.safeText,
                      }}
                    >
                      <strong>NSFW Status:</strong> {p.isNSFW ? 'YES' : 'NO'} 
                      {p.nsfwTaggedByAuthor ? ' (Tagged by Author)' : ''}
                      {p.nsfw_flagged ? ` | Auto-flagged: ${p.nsfw_words.join(', ')}` : ''}
                    </div>
                    <div style={styles.postActions}>
                      <button style={styles.btnInfo} onClick={() => this.toggleNSFW(p.post_id, p.isNSFW)}>
                        {p.isNSFW ? 'Remove NSFW' : 'Mark NSFW'}
                      </button>
                      <button style={styles.btnSuccess} onClick={() => this.approvePost(p.post_id)}>
                        ✅ Approve
                      </button>
                      <button style={styles.btnWarning} onClick={() => this.rejectPost(p.post_id)}>
                        ❌ Reject
                      </button>
                      <button style={styles.btnDanger} onClick={() => this.deletePost(p.post_id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div>
                <h3 style={styles.subHeading}>💬 Recent Comments</h3>
                {comments.length === 0 && <p style={styles.emptyText}>No comments found</p>}
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>User</th>
                      <th style={styles.th}>Post</th>
                      <th style={styles.th}>Type</th>
                      <th style={styles.th}>Content</th>
                      <th style={styles.th}>Time</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map(c => (
                      <tr key={c.comment_id} style={styles.tr}>
                        <td style={styles.td}>{c.comment_id}</td>
                        <td style={styles.td}>@{c.comment_by_username}</td>
                        <td style={styles.td}>#{c.post_id}</td>
                        <td style={styles.td}>{c.type}</td>
                        <td style={styles.td}>{c.text ? c.text.substring(0, 50) : c.commentSrc}</td>
                        <td style={styles.td}>{new Date(parseInt(c.comment_time)).toLocaleString()}</td>
                        <td style={styles.td}>
                          <button style={styles.btnDanger} onClick={() => this.deleteComment(c.comment_id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '25px',
    background: palette.surfaceAlt,
    borderRadius: '16px',
    boxShadow: `0 8px 30px ${palette.shadow}`,
    border: `1px solid ${palette.border}`,
  },
  heading: { fontSize: '26px', fontWeight: '800', marginBottom: '24px', color: palette.text, letterSpacing: '-0.02em' },
  subHeading: { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: palette.textSecondary },
  tabs: { display: 'flex', marginBottom: '24px', borderBottom: `2px solid ${palette.border}` },
  tab: {
    padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer',
    fontSize: '14px', fontWeight: '600', color: palette.textMuted, borderBottom: '2px solid transparent',
    marginBottom: '-2px', transition: 'all 0.3s ease',
  },
  activeTab: { color: palette.brand, borderBottom: `2px solid ${palette.brand}` },
  loading: { textAlign: 'center', padding: '60px', color: palette.textFaint, fontSize: '15px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  chartsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '24px' },
  statCard: {
    padding: '24px',
    borderRadius: '12px',
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    boxShadow: `0 4px 16px ${palette.shadowLight}`,
    transition: 'all 0.3s ease',
  },
  statNumber: { fontSize: '38px', fontWeight: '800', margin: '8px 0', color: palette.text, letterSpacing: '-0.03em' },
  chartCard: {
    padding: '20px',
    borderRadius: '12px',
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    boxShadow: `0 4px 16px ${palette.shadowLight}`,
    backgroundImage:
      `linear-gradient(180deg, ${palette.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${palette.gridLine} 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    fontFamily:
      "'IBM Plex Mono', 'Fira Code', 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  chartTitle: {
    fontSize: '11px',
    fontWeight: '700',
    marginBottom: '16px',
    color: palette.textSecondary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  chartRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    paddingBottom: '8px',
    borderBottom: `1px dashed ${palette.border}`,
  },
  chartRowLast: { borderBottom: 'none', marginBottom: '0', paddingBottom: '0' },
  chartLabel: {
    width: '110px',
    fontSize: '11px',
    color: palette.textMuted,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  chartBarTrack: {
    flex: 1,
    height: '10px',
    background: palette.surfaceAlt,
    borderRadius: '6px',
    overflow: 'hidden',
    border: `1px solid ${palette.border}`,
  },
  chartBar: { height: '100%', borderRadius: '6px' },
  chartValue: {
    minWidth: '85px',
    textAlign: 'right',
    fontSize: '11px',
    color: palette.text,
    fontVariantNumeric: 'tabular-nums',
  },
  pieWrap: { display: 'flex', gap: '16px', alignItems: 'center' },
  pie: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 4px 12px ${palette.shadowLight}`,
  },
  pieCenter: {
    width: '74px',
    height: '74px',
    borderRadius: '50%',
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    color: palette.text,
    fontVariantNumeric: 'tabular-nums',
    boxShadow: `inset 0 2px 4px ${palette.shadowLight}`,
  },
  pieLegend: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  pieLegendItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  pieSwatch: { width: '12px', height: '12px', borderRadius: '3px' },
  pieLegendLabel: { fontSize: '11px', color: palette.textMuted, width: '70px' },
  pieLegendValue: { fontSize: '11px', color: palette.text, fontVariantNumeric: 'tabular-nums' },
  filterBar: { display: 'flex', gap: '12px', marginBottom: '20px' },
  formCard: {
    border: `1px solid ${palette.border}`,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    background: palette.surface,
    boxShadow: `0 4px 16px ${palette.shadowLight}`,
  },
  formTitle: { fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: palette.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'center' },
  formInput: {
    padding: '10px 14px',
    border: `1px solid ${palette.borderStrong}`,
    borderRadius: '8px',
    fontSize: '13px',
    width: '100%',
    boxSizing: 'border-box',
    background: palette.surfaceAlt,
    color: palette.text,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  formSelect: {
    padding: '10px 14px',
    border: `1px solid ${palette.borderStrong}`,
    borderRadius: '8px',
    fontSize: '13px',
    width: '100%',
    boxSizing: 'border-box',
    background: palette.surfaceAlt,
    color: palette.text,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  formActions: { display: 'flex', gap: '10px', alignItems: 'center' },
  searchInput: {
    padding: '10px 16px',
    border: `1px solid ${palette.borderStrong}`,
    borderRadius: '8px',
    flex: 1,
    boxSizing: 'border-box',
    fontSize: '14px',
    background: palette.surfaceAlt,
    color: palette.text,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  select: {
    padding: '10px 16px',
    border: `1px solid ${palette.borderStrong}`,
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontSize: '14px',
    background: palette.surfaceAlt,
    color: palette.text,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${palette.border}` },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    background: palette.surface,
    borderBottom: `2px solid ${palette.border}`,
    fontWeight: '700',
    color: palette.text,
    textTransform: 'uppercase',
    fontSize: '11px',
    letterSpacing: '0.05em',
  },
  td: { padding: '14px 16px', borderBottom: `1px solid ${palette.border}`, color: palette.textSecondary },
  tr: { background: palette.surfaceAlt, transition: 'background 0.2s' },
  badge: { padding: '4px 10px', borderRadius: '20px', color: '#fff', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' },
  btnSuccess: {
    padding: '8px 16px',
    background: `linear-gradient(135deg, ${palette.success} 0%, rgba(74, 222, 128, 0.85) 100%)`,
    color: '#0f172a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '6px',
    fontSize: '12px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 4px rgba(74, 222, 128, 0.2)`,
  },
  btnInfo: {
    padding: '8px 16px',
    background: `linear-gradient(135deg, ${palette.info} 0%, rgba(56, 189, 248, 0.85) 100%)`,
    color: '#0f172a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '6px',
    fontSize: '12px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 4px rgba(56, 189, 248, 0.2)`,
  },
  btnWarning: {
    padding: '8px 16px',
    background: `linear-gradient(135deg, ${palette.warning} 0%, rgba(250, 204, 21, 0.85) 100%)`,
    color: '#0f172a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '6px',
    fontSize: '12px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 4px rgba(250, 204, 21, 0.2)`,
  },
  btnDanger: {
    padding: '8px 16px',
    background: `linear-gradient(135deg, ${palette.danger} 0%, rgba(248, 113, 113, 0.85) 100%)`,
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '6px',
    fontSize: '12px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 4px rgba(248, 113, 113, 0.2)`,
  },
  postCard: {
    border: `1px solid ${palette.border}`,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: `0 4px 16px ${palette.shadowLight}`,
    background: palette.surface,
  },
  postHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' },
  postTime: { color: palette.textFaint, fontSize: '12px' },
  postImage: { maxWidth: '100%', maxHeight: '350px', borderRadius: '8px', marginBottom: '14px', objectFit: 'contain', border: `1px solid ${palette.border}` },
  postDesc: { color: palette.text, marginBottom: '14px', fontSize: '14px', lineHeight: '1.5' },
  postActions: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  nsfwWarning: {
    background: palette.nsfwBg,
    color: palette.nsfwText,
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '14px',
    fontSize: '13px',
    border: `1px solid rgba(248, 113, 113, 0.2)`,
  },
  emptyText: { textAlign: 'center', color: palette.textFaint, padding: '40px', fontSize: '14px' },
}
