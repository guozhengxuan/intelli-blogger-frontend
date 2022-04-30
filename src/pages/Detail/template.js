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
      labels: '',
      labelMap: {},


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
      this.labels = res.data.labels

      this.labels.forEach(label => {
        const detail = label.split("-")

        if (this.labelMap[detail[0]] !== undefined)
          this.labelMap[detail[0]].push(detail[1])
        else
          this.labelMap[detail[0]] = [detail[1]]
      })
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
