<template>
    <div class="manage">
        <!-- 新增的 对话框 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址"  prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>

            <el-form :inline="true" :model="userForm">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <el-table
            height="90%"
            :data="tableData"
            style="width: 100%"
            stripe>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span >{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '@/api/index'
export default {
    name: 'myUser',

    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名'
                    }
                ],
                age: [
                    {
                        required: true,
                        message: '请输入年龄'
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: '请选择性别'
                    }
                ],
                birth: [
                    {
                        required: true,
                        message: '请选择出生日期'
                    }
                ],
                addr: [
                    {
                        required: true,
                        message: '请输入地址'
                    }
                ],
            },
            tableData: [],
            modelType: 0, //0是新增弹窗，1是编辑弹窗
            total: 0, //总条数
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
                name: ''
            }
        }
    },

    mounted() {
        this.getList()
    },

    methods: {
        //提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                // console.log(valid, 'valid')
                if (valid) {
                    // console.log(this.form)

                    if (this.modelType === 0) {
                        addUser(this.form).then(() => {
                            this.getList()
                            // console.log(this.tableData)
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }

                    //清空表单数据
                    this.$refs.form.resetFields()
                    //关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        handleEdit(row) {
            this.modelType = 1
            this.dialogVisible = true
            //如果是采用下面的引用，在先点击新增,再点击编辑，然后关闭对话框，会清空form中的数据，而from数据指向的是当前行，所以当前行会被清空
            //在先点击编辑时，会使form的数据指向当前行，再点击新增，新增中的数据变成了当前行的数据，此时再点击编辑不会再清空，因为resetFields只会返回到第一次读取form中的数据
            // this.form = row
            //改成深拷贝时，在先点击编辑，再点击新增，对话框会显示第一次编辑的数据，因为在resetFields读取之前from数据变成了第一次编辑的数据
             this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                delUser({ id: row.id }).then(() => {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    })
                })
                this.getList()
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })   
            })
        },
        handleAdd() {
            this.modelType = 0
            this.dialogVisible = true
        },
        //获取列表数据
        getList() {
            //获取列表数据
            getUser({ params: { ...this.userForm, ...this.pageData }}).then(({ data }) => {
                console.log(data)
                // console.log(typeof data.list[0].sex)
                this.tableData = data.list
                // console.log(this.tableData)

                this.total = data.count || 0
            })
        },
        //选择页码
        handlePage(currentPage) {
            // console.log(currentPage)
            this.pageData.page = currentPage 
            this.getList()
        },
        //列表查询
        onSubmit() {
            this.getList()
        }
    },
};
</script>

<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table {
        position: relative;
        height: calc(100% - 62px);
        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>