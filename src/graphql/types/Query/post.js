const Post = require('../../../models/Post')

const postResolver = async (obj, args, context) => {
  const post = await Post.query().where('id', args.id)

  if (!post) {
    throw new Error('Could not find post')
  }

  return {
    post,
  }
}

const postsResolver = async (obj, args, context) => {
  const posts = await Post.query().orderBy('date', 'desc')

  if (!posts) {
    throw new Error('Could not find post')
  }

  return {
    posts,
  }
}

const resolver = {
  Query: {
    post: postResolver,
    posts: postsResolver,
  },
}

module.exports = resolver
