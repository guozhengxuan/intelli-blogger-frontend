import marked from 'marked'
import blog from '@/api/blog'
import cmt from '@/api/cmt'

export default {
  data () {
    return {
      // blog info
      title: '',
      rawContent: '',
      user: {},
      createdAt: '',
      blogId: '',

      // comments
      cmtTobeCreated: '',
      comments: [],
      total: 0
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({ blogId: this.blogId}).then(res => {
      console.log(res)
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt = res.data.createdAt
      this.user = res.data.user
    })

    cmt.getComments({blogId: this.blogId}).then(result => {
      console.log(result)
      this.comments = result.data
      this.total = result.total
    })
  },

  methods: {
    onCreate() {
      cmt.createComment({content: this.cmtTobeCreated, blogId: this.blogId}).then(result => {
        this.$message.success(result.msg)
        // this.$router.push({ path: `/detail/${this.blogId}`})
        window.location.reload()
      })
    },

    selectByEmotion(command) {
      if(command === "全部") {
        cmt.getComments({blogId: this.blogId}).then(result => {
          this.comments = result.data
        })
      }
      cmt.getComments({blogId: this.blogId, emotion: command}).then(result => {
        this.comments = result.data
      })
    }
  },

  computed: {
    markdown() {
      return marked(this.rawContent)
    }
  }
}
