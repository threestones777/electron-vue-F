<template>
    <div id="systemParameter">
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>系统参数</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane label="基础信息">
                <el-form v-model="basicData">
                    <el-row>
                        <el-col :span="24">
                            <el-input placeholder="请输入内容" v-model="basicData.sys_name">
                                <template slot="prepend">系统名称</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-input placeholder="请输入内容" v-model="basicData.com_name">
                                <template slot="prepend">公司名称</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-input placeholder="请输入内容" v-model="basicData.com_tel">
                                <template slot="prepend">公司电话</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-input placeholder="请输入内容" v-model="basicData.com_address">
                                <template slot="prepend">公司地址</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form>                    
                <el-button style="float:right;margin-top:20px;" size="small" type="primary" @click="saveBase">保存基础信息</el-button>
            </el-tab-pane>
            <el-tab-pane label="功能设置">
                <el-form v-model="funData">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="funData.fazhi">
                                <template slot="prepend">默认阀值</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="funData.report_days">
                                <template slot="prepend">首页报表天数</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="funData.account">
                                <template slot="prepend">默认结算账户</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="funData.paper">
                                <template slot="prepend">默认打印纸张</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <div>
                        制单人可选：
                        <el-radio v-model="funData.admin" label="0">开启</el-radio>
                        <el-radio v-model="funData.admin" label="1">关闭</el-radio>
                        （开启后制单人可选，反之则为登录账户）
                    </div><br><br>
                    <div>
                        审核功能：
                        <el-radio v-model="funData.check" label="0">开启</el-radio>
                        <el-radio v-model="funData.check" label="1">关闭</el-radio>
                        （开启后单据需经过审核才会发生数据变化）
                    </div><br><br>
                    <div>
                        串码功能：
                        <el-radio v-model="funData.serial" label="0">开启</el-radio>
                        <el-radio v-model="funData.serial" label="1">关闭</el-radio>
                        （开启后录入单据时将启用串码功能）
                    </div><br><br>
                    <div>
                        批次功能：
                        <el-radio v-model="funData.pici" label="0">开启</el-radio>
                        <el-radio v-model="funData.pici" label="1">关闭</el-radio>
                        （开启后录入单据时将启用批次功能）
                    </div><br><br>
                    <div>
                        隔行背景：
                        <el-radio v-model="funData.gehang" label="0">开启</el-radio>
                        <el-radio v-model="funData.gehang" label="1">关闭</el-radio>
                        （开启后数据表格将加上隔行背景）
                    </div><br><br>
                </el-form> 
                <el-button style="float:right;margin-top:20px;" size="small" type="primary" @click="saveFun">保存功能设置</el-button>
            </el-tab-pane>
            <el-tab-pane label="收银设置">
                <el-form v-model="cashierData">
                    <el-row>
                        收银功能：
                        <el-radio v-model="cashierData.cashier" label="0">开启</el-radio>
                        <el-radio v-model="cashierData.cashier" label="1">关闭</el-radio>
                        （开启后将启用收银台功能）
                    </el-row><br>
                    <el-row>
                        <el-col :span="10">
                            收银标题：<el-input style="width:60%" placeholder="请输入内容" v-model="cashierData.title"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            默认客户：<el-input style="width:60%" placeholder="请输入内容" v-model="cashierData.kehu"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            默认收银账户：<el-input style="width:60%" placeholder="请输入内容" v-model="cashierData.account"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            默认收款账户：<el-input style="width:60%" placeholder="请输入内容" v-model="cashierData.fuwu"></el-input>
                        </el-col>
                    </el-row>
                    <!-- 默认收银账户：<el-select v-model="value">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select><br><br>
                    默认收款账户：<el-select v-model="value">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select><br><br> -->
                    <el-row>
                        自动打印小票：
                        <el-radio v-model="cashierData.ticket" label="0">开启</el-radio>
                        <el-radio v-model="cashierData.ticket" label="1">关闭</el-radio>
                    </el-row>
                </el-form>                    
                <el-button style="float:right;margin-top:20px;" size="small" type="primary" @click="saveCachier">保存收银设置</el-button>
            </el-tab-pane>
            <el-tab-pane label="编码规则">
                <el-form :model="formAdd" ref="form">
                    <el-row class="addline">
                        <el-col :span="4">
                            <el-form-item prop="is_open" :rules="rule">
                                <el-radio-group v-model="formAdd.is_open">
                                    <el-radio label="1">启用</el-radio>
                                    <el-radio label="0">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item prop="mokuai" :rules="rule">
                                <el-input  v-model="formAdd.mokuai">
                                    <template slot="prepend">模块名</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="prefix" :rules="rule">
                                <el-input v-model="formAdd.prefix">
                                    <template slot="prepend">编码前缀</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="start_number" :rules="rule2">
                                <el-input v-model.number="formAdd.start_number">
                                    <template slot="prepend">起始数</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item>
                                <el-input disabled v-model="examples">
                                    <template slot="prepend">示例</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" class="addicon">
                            <el-form-item>
                               
                                <el-button type="text" @click="add"> <i class="el-icon-plus"></i></el-button>
                                <el-button type="text" @click="reset"> <i class="el-icon-refresh"></i></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <el-table
                    :data="codeRuleData"
                    border
                    :row-style="{height:0}"  
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:7}"
                    class="rules"
                    style="width:100%">
                    <el-table-column
                    prop="mokuai"
                    align="center"
                    label="模块名">
                    <template slot-scope="scope"><el-input v-model="scope.row.mokuai" /></template>
                    </el-table-column>
                    <el-table-column
                    width="120"
                    :formatter="formatter"
                    label="是否启用" align="center">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.is_open" true-label="1" false-label="0"/>
                            <!-- <el-checkbox v-model="scope.row.is_open" /> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="prefix"
                    align="center"
                    label="编码前缀">
                    <template slot-scope="scope"><el-input v-model="scope.row.prefix" /></template>
                    </el-table-column>
                    <el-table-column
                    prop="start_number"
                    align="center"
                    width="100"
                    label="起始数">
                    <template slot-scope="scope"><el-input-number :controls="false" v-model="scope.row.start_number" :min="0"></el-input-number></template>
                    </el-table-column>
                    <el-table-column
                    prop="examples"
                    align="center"
                    label="示例">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    align="center"
                    label="相关操作"
                    width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">提交修改</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)" icon="el-icon-delete"></el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {
  getSystemparamData,
  savebaseinfo,
  savefuncsetting,
  savecashiersetting,
  getCoderuleList,
  getCoderuleDetail,
  addCoderule,
  editCoderule,
  delCoderule,
} from "../../api/api";
export default {
    data(){
        return {
            basicData:{
                sys_id:"",
                sys_name:"",
                com_name:"",
                com_tel:"",
                com_address:""
            },
            funData:{
                sys_id:"",
                fazhi:"",
                report_days:"",
                account:"",
                paper:"",
                admin:"",
                check:"",
                serial:"",
                pici:"",
                gehang:""
            },
            cashierData:{
                sys_id:"",
                cashier:"",
                title:"",
                kehu:"",
                account:"",
                fuwu:"",
                ticket:""
            },
            input:'',
            input3:'',
            value:'',
            radio:'1',
            options: [{
                value: '选项1',
                label: '默认'
            }],
            codeRuleData: [],
            formAdd:{is_open:'0'},
            rule: [{ required: true, message: "不能为空" }],
            rule2: [{ required: true, message: "不能为空" },{type:'number',message:'必须为数字'}],
        }
    },
    methods:{
        getParams(){
            getSystemparamData().then(res=>{
                console.log(res.data.param[0]);
                this.basicData.sys_id=res.data.param[0].id;
                this.funData.sys_id=res.data.param[0].id;
                this.cashierData.sys_id=res.data.param[0].id;
                this.basicData.sys_name=res.data.param[0].system_name;
                this.basicData.com_name=res.data.param[0].company_name;
                this.basicData.com_tel=res.data.param[0].company_tel;
                this.basicData.com_address=res.data.param[0].company_address;
                this.funData.fazhi=res.data.param[0].default_fazhi;
                this.funData.report_days=res.data.param[0].home_report_days;
                this.funData.account=res.data.param[0].default_account;
                this.funData.paper=res.data.param[0].default_print_paper;
                this.funData.admin=res.data.param[0].adminer_optional;
                this.funData.check=res.data.param[0].check_open;
                this.funData.serial=res.data.param[0].serial_open;
                this.funData.pici=res.data.param[0].pici_open;
                this.funData.gehang=res.data.param[0].gehang_bg_open;
                this.cashierData.cashier=res.data.param[0].cashier_open;
                this.cashierData.title=res.data.param[0].cashier_title;
                this.cashierData.kehu=res.data.param[0].default_kehu;
                this.cashierData.account=res.data.param[0].default_cashier_account;
                this.cashierData.fuwu=res.data.param[0].fuwu_account;
                this.cashierData.ticket=res.data.param[0].auto_small_ticket;
            });
        },
        saveBase(){
            console.log(this.basicData);
            let data=this.$qs.stringify(this.basicData)
            savebaseinfo(data).then(res=>{
                console.log(res);
                this.$alert(res.errmsg);
            }); 
        },
        saveFun(){
            console.log(this.funData);
            let data=this.$qs.stringify(this.funData)
            savefuncsetting(data).then(res=>{
                console.log(res);
                this.$alert(res.errmsg);
            }); 
        },
        saveCachier(){
            console.log(this.cashierData);
            let data=this.$qs.stringify(this.cashierData)
            savecashiersetting(data).then(res=>{
                console.log(res);
                this.$alert(res.errmsg);
            }); 
        },
        getRules() {
            getCoderuleList().then(res=>{
            console.log(res.data)
            if(res.errno == 0) {
                    this.codeRuleData = res.data
                }
            })
        },
        formatter(row) {
            return Boolean(Number(row.is_open))
        },
        edit(row) {
            console.log(row);
            let data=this.$qs.stringify(row)
            editCoderule(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.getRules();
                        }
                    });
                }else{
                    this.$alert(res.errmsg);
                }
            });
        },
        reset() {
            this.getRules()
            this.formAdd = {is_open:'0'}
            this.$refs.form.resetFields();
        },
        add() {
            console.log("add");
            let data=this.$qs.stringify(this.formAdd)
            addCoderule(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.getRules();
                        }
                    });
                }else{
                    this.$alert(res.errmsg);
                }
                    
            });
        },
        deleteRow(row){
            console.log(row.id);
            let Message=confirm("确定删除此行编码？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id
                });
                delCoderule(data).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.message,{
                            callback:action=>{
                                this.getRules()
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                });         
            }else{
                alert("用户取消操作");
            }
        },
    },
    computed: {
        examples:function() {
            let prefix = this.formAdd.prefix?this.formAdd.prefix:''
            let start_number = this.formAdd.start_number?this.formAdd.start_number:''
            return prefix + '20180914084526' + start_number
        }
    },
    created() {
        this.getParams();
        this.getRules()
    },
}
</script>
<style scoped>
#systemParameter{
    margin: 10px;
}
/* 头部面包屑 */
.main-header {
  padding: 10px;
  background: #fff;
}
.main-header .el-breadcrumb {
  margin: 8px 0 0 10px;
  align-items: center
}
.el-tabs {
    margin: 10px 0 0 0;
}
#systemParameter .rules >>> .el-input__inner,
#systemParameter .rules >>> .el-input-number {
    width: 100%;
    text-align: center;
    border: none;
}
.addline {
    display: flex;
    align-items: center;
}
.addline .el-col {
    margin-right: 8px;
}
.addicon >>> .el-form-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.addicon .el-icon-refresh,
.addicon .el-icon-plus {
    font-size: 24px;
    cursor: pointer;
}

</style>
