<template>
  <a-config-provider :locale="locale">
    <div id="app" style="overflow-y:hidden">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

// import Editor from '@tinymce/tinymce-vue'
// import tinymce from 'tinymce'
// import 'tinymce/themes/silver'
export default {
  data() {
    // const toolbarValue =
    //   'undo redo | formatselect | bold italic backcolor |' +
    //   'alignleft aligncenter alignright alignjustify |' +
    //   ' bullist numlist outdent indent | removeformat | help'
    return {
      // editorConfig: {
      //   height: 500,
      //   menubar: false,
      //   plugins: [
      //     'advlist autolink lists link image charmap print preview anchor',
      //     'searchreplace visualblocks code fullscreen',
      //     'insertdatetime media table paste code help wordcount',
      //   ],
      //   toolbar: toolbarValue,
      //   base_url: '/tinymce',
      // },
    }
  },
  // components: {
  //   Editor,
  // },
  computed: {
    locale() {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    },
  },
}
</script>
