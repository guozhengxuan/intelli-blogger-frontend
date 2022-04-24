import request from '@/helpers/request'

const URL = {
  GET_LIST: '/blog/cmt',
  CREATE: '/blog/cmt',
  DELETE: '/blog/cmt/:commentId'
}

export default {
  getComments({ page=1, userId, atIndex } = { page: 1 }) {
    return request(URL.GET_LIST, 'GET', { page, userId, atIndex })
  },

  getIndexComments({ page=1 } = { page: 1}) {
    return this.getComments({ page, atIndex: true })
  },

  getDetail({ commentId }) {
    return request(URL.GET_DETAIL.replace(':commentId', commentId))
  },

  deleteComment({ commentId }) {
    return request(URL.DELETE.replace(':commentId', commentId), 'DELETE')
  },

  createComment({ content = '', atIndex = false} = { content: '', atIndex: false }) {
    return request(URL.CREATE, 'POST', { title, content, description, atIndex })
  }

}