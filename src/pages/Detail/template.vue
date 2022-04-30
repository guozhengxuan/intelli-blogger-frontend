<template>
  <div id="detail">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" :title="user.username" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link :to="`/user/${user.id}`">{{user.username}}</router-link> 发布于{{friendlyDate(createdAt)}}</p>
    </section>
    <section class="article" v-html="markdown"></section>
    <section class="article-label" v-for="(innerLabels, outerLabel) in labelMap">
      <el-tag effect="plain">#{{outerLabel}}</el-tag>
      <template v-for="innerLabel in innerLabels">
        <el-tag class="ml-2" type="success" effect="light">#{{innerLabel}}</el-tag>
      </template>
    </section>
    <section class="create-comment">
      <el-input type="textarea" v-model="cmtTobeCreated"  :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      <el-button @click="onCreate" class="cmt-btn">发表评论</el-button>
    </section>
    <section class="comments">
      <section class="cmt-header">
        <section class="header">评论（{{total}}）</section>
        <section class="selection">
          <el-dropdown
            size="small"
            placement="bottom"
            trigger="click"
            @command="selectByEmotion"
            style="margin-left: 10px;"
          >
            <el-button class="search-btn" size="mini">
              按情绪分类
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">
                全部
              </el-dropdown-item>
              <el-dropdown-item command="喜悦">
                喜悦
              </el-dropdown-item>
              <el-dropdown-item command="愤怒">
                愤怒
              </el-dropdown-item>
              <el-dropdown-item command="厌恶">
                厌恶
              </el-dropdown-item>
              <el-dropdown-item command="低落">
                低落
              </el-dropdown-item>
              <el-dropdown-item command=敷衍>
                敷衍
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </section>
      </section>
      <section class="comment" v-for="comment in comments">
        <img :src="comment.user.avatar" :alt="comment.user.username">
<!--        <section class="caption">{{comment.user.username}}</section>-->
        <router-link class="caption" :to="`/user/${comment.user.id}`">{{comment.user.username}}</router-link>
        <section class="create-date">{{friendlyDate(comment.createdAt)}}</section>
<!--        <section class="emotion">-->
          <img class="emotion" :src="require(`../../assets/${comment.emotion}.jpeg`)">
<!--        </section>-->
        <section class="comment-text">{{comment.content}}</section>
      </section>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
