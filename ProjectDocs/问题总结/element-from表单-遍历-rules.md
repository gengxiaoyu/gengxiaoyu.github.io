```vue
<!-- const formData = {
    name:'',
    detailList:[
    	{},{}
    ]
} -->
<div v-for="(item, index) in formData.detailList" :key="index">
    <el-col :span="6">
        <el-form-item label="处理处置类型" :prop="'detailList.' + index + '.handleType'"
           :rules="rules.handleType"
        >
            <el-select v-model="item.handleType" value-key="id" placeholder="请选择">
                <el-option label="？？？" value="？？？"></el-option>
            </el-select>
        </el-form-item>
    </el-col>
</div>
```
- 表单项绑定：
    - :prop="'detailList.' + index + '.handleType'" 动态绑定表单项的属性，使其与 formData.detailList 数组中相应索引的 handleType 属性对应。
- 验证规则：
    - :rules="rules.handleType" 应用到这个表单项的验证规则，rules.handleType 应该是在组件的 data 或 computed 中定义的验证规则数组。
