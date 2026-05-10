<template>
  <tr class="home-recent-item">
    <td class="td-category">[{{ post.category }}]</td>
    <td class="td-title">
      <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
        {{ post.title }}
      </router-link>
    </td>
    <td class="td-author">{{ post.author }}</td>
    <td class="td-views">{{ post.views }}</td>
    <td class="td-likes">{{ post.likes }}</td>
    <td class="td-date">{{ post.date }}</td>
  </tr>
</template>

<script>
export default {
  name: "HomeRecentItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
