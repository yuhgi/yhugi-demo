<template>
    <div>
        <h1>{{title}}</h1>
        <custom-message :message="message"></custom-message>
    </div>
</template>
<script>
    import Message from './components/message.vue';
    export default {
        data(){
            return {
                title:'this is title',
                message:'this is message'
            };
        },
        components:{
            'custom-message':Message
        },
        mounted(){
            this.title = '标题';
            this.message = '这是子组件';
        },
        methods:{
            setMessage(msg){
                this.message = msg;
            }
        }
    };
</script>

