const User = require('../../../models/User')
const { raw } = require('objection')

const userResolver = async (obj, args, context) => {
  const user = await User.query().findById(args.id)

  if (!user) {
    return {
      error: 'User does not exist',
    }
  }

  return {
    user,
  }
}

const usersResolver = async (obj, args, context) => {
  const { substr, hometown, house, concentration, hobbies } = args

  let query = User.query()

  if (substr) query.where(raw('name'), 'like', `%${substr}%`)
  if (hometown) query.where(raw('hometown'), 'like', `%${hometown}%`)
  if (house) query.where(raw('house'), 'like', `%${house}%`)
  if (concentration)
    query.where(raw('concentration'), 'like', `%${concentration}%`)
  if (hobbies) query.where(raw('hobbies'), 'like', `%${hobbies.hobby}%`)

  const users = await query

  if (!users) {
    return {
      error: 'Could not find users',
    }
  }

  return {
    users,
  }
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
  },
}

module.exports = resolver
