const User = require('../../models/User')

const createPost = async (obj, { content }, context) => {
  if (!context.user) {
    return {
      error: 'User not logged in',
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: 'Logged in user does not exist',
    }
  }

  const post = await user.$relatedQuery('posts').insert({ content })

  if (!post) {
    throw new Error('Could not add post')
  }

  return {
    post,
  }
}

const editPost = async (obj, args, context) => {
  const { id, newContent } = args
  if (!context.user) {
    return {
      error: 'User not logged in',
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: 'Logged in user does not exist',
    }
  }

  const post = await user.query().patchAndFetchById(id, { content: newContent })

  if (!post) {
    throw new Error('Could not edit post')
  }

  return {
    post,
  }
}

const resolver = { Mutation: { createPost, editPost } }

module.exports = resolver
