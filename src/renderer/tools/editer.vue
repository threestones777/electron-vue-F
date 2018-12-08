<template>
    <div id="editor">
        <p>欢迎使用 wangEditor 富文本编辑器</p>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    data(){
        return {

        }
    },
    mounted() {
        var editor = new E('#editor')
        editor.create()
    },
    props:[]
}
</script>

<style>

</style>
