<template>
  <div class="editor-container" v-if="editor">
    <div class="editor-toolbar">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ active: editor.isActive('bold') }"
      >
        <b>B</b>
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ active: editor.isActive('italic') }"
      >
        <i>I</i>
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ active: editor.isActive('underline') }"
      >
        <u>U</u>
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ active: editor.isActive('blockquote') }"
      >
        “
      </button>
      <button @click="addImage" class="img-btn">📷 이미지</button>
      <input
        type="file"
        ref="fileInput"
        @change="onFileSelect"
        accept="image/*"
        hidden
      />
    </div>

    <editor-content
      :editor="editor"
      class="editor-content-area"
      @drop.prevent="onDrop"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

export default {
  components: { EditorContent },
  props: ["modelValue"],
  emits: ["update:modelValue", "upload-image"],
  data() {
    return { editor: null };
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Image.configure({ allowBase64: true }), // 테스트를 위해 우선 Base64 허용
        Placeholder.configure({
          placeholder: "내용을 작성하거나 이미지를 드래그해 넣으세요...",
        }),
      ],
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });
  },
  methods: {
    addImage() {
      this.$refs.fileInput.click(); // 모바일/PC 버튼 클릭 시 파일 선택
    },
    onFileSelect(event) {
      const file = event.target.files[0];
      if (file) this.processFile(file);
    },
    onDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) this.processFile(file);
    },
    processFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editor.chain().focus().setImage({ src: e.target.result }).run();
        this.$emit("upload-image", file);
      };
      reader.readAsDataURL(file);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
