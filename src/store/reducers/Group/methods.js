export const update = (group, { name, bio, group_type }) => {
  let updated = {
    ...group,
    name,
    bio,
    group_type,
  }
  return updated
}

export const remMember = (members, member_id) =>
  members.filter(m => m.grp_member_id != member_id)

export const leftGroup = (groups, group_id) =>
  groups.filter(g => g.group_id != group_id)
