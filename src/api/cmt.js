import request from '@/helpers/request'

const URL = {
  GET_LIST: '/blog/cmt',
  CREATE: '/blog/cmt',
  DELETE: '/blog/cmt/:commentId'
}

export default {
  getComments({ blogId, emotion }) {
    return request(URL.GET_LIST, 'GET', { blogId, emotion })
  },

  deleteComment({ commentId }) {
    return request(URL.DELETE.replace(':commentId', commentId), 'DELETE')
  },

  createComment({ content = '', blogId = ''} = { content: '', blogId: '' }) {
    return request(URL.CREATE, 'POST', { content, blogId })
  }

}
