var Checkbox = {
    template:'\
        <div :class="checkboxCls" :value="value">\
            <label class="mt-checkbox-icon">\
                <input type="checkbox" \
                    class="mt-checkbox-field"\
                    :id="id||name"\
                    :name="name" \
                    :checked="isChecked" \
                    @change="changeHandler"\
                >\
            </label>\
        </div>\
    ',
    props:{
        'id':{
            type:String,
        },
        'name':{
            type:String
        },
        'checked':{
            type:Boolean
        },
        'value':{
            default:''
        }
    },
    data:function(){
        return {
            isChecked:this.checked
        };
    },
    methods:{
        changeHandler:function(){
            this.isChecked = !this.isChecked;
            if(this.isChecked){
                this.$emit('input',this.value);
            }else{
                this.$emit('input','');
            }
        }
    },
    computed:{
        checkboxCls:function(){
            return {
                "mt-checkbox":true,
                "mt-checkbox-checked":this.isChecked
            };
        }
    }
};