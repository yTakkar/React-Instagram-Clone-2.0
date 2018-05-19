export const unblockU = (users, block_id) =>
  users.filter(u => u.block_id != block_id)
