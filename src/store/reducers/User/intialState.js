import { uData } from '../../../utils/utils'

export default {
  session: {
    id: Number(uData('session')),
    username: uData('username'),
  },
  user_details: {
    id: null,
    username: '',
    firstname: '',
    surname: '',
    email: '',
    bio: '',
    account_type: '',
    email_verified: '',
    joined: '',
    twitter: '',
    facebook: '',
    github: '',
    instagram: '',
    phone: '',
    website: '',
    isOnline: false,
    lastOnline: '',
  },
  tags: [],
  mutualUsers: [],
}
