<template>
  <div id="menu" class="about">
    <el-container class="el-container" v-cloak>
      <el-aside width="250px" class="el-aside">
        <el-menu :default-openeds="['1','2','3','4','5','6']" :default-active='activeIndex' @select="handleSelect">

          <el-menu-item index="1"><i class="el-icon-s-home"></i>审批系统</el-menu-item>
          <el-menu-item index="2"><i class="el-icon-s-home"></i>网厅/中介超市</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-s-home"></i>swagger</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-s-home"></i>aplanmis-rest</el-menu-item>
          <el-menu-item index="6"><i class="el-icon-s-home"></i>码云</el-menu-item>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>其他</template>
            <el-menu-item index="5-1" class="el-icon-s-custom">登录信息</el-menu-item>
            <el-menu-item index="5-2" class="el-icon-s-custom">测试</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="el-header">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>小糊涂</span>
        </el-header>

        <el-main>
          <!--审批系统-->
          <el-table :data="frontData" v-show="activeIndex=='1'">
            <el-table-column prop="name" label="名称" width="200"></el-table-column>
            <el-table-column prop="link" label="连接"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope='scope'>
                <el-button @click="openNewTab(scope.row)" type="primary" round>打开</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--中介超市-->
          <el-table :data="mallData" v-show="activeIndex=='2'">
            <el-table-column prop="name" label="名称" width="200"></el-table-column>
            <el-table-column prop="link" label="连接"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope='scope'>
                <el-button @click="openNewTab(scope.row)" type="primary" round>打开</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--swagger-->
          <el-table :data="swaggerData" v-show="activeIndex=='3'">
            <el-table-column prop="name" label="名称" width="200"></el-table-column>
            <el-table-column prop="link" label="连接"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope='scope'>
                <el-button @click="openNewTab(scope.row)" type="primary" round>打开</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- aplanmis-rest -->
          <div v-show="activeIndex=='4'">
            <el-table :data="cpRestData">
              <el-table-column prop="name" label="名称" width="200"></el-table-column>
              <el-table-column prop="link" label="连接"></el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope='scope'>
                  <el-button class="el-icon-s-promotion" @click="openNewTab(scope.row)" type="primary" round>
                  </el-button>
                  <el-button class="el-icon-edit-outline" @click="editForm(scope.row)" type="primary" round>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
            </div>
          </div>


          <!-- 码云 -->
          <el-table v-show="activeIndex=='6'" stripe :data="giteeData" style="width: 100%;margin-bottom: 20px;"
                    row-key="id" border default-expand-all :row-class-name="tableRowClassName"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="名称" width="250"></el-table-column>
            <el-table-column prop="link" label="连接"></el-table-column>
            <el-table-column prop="desc" label="备注" width="100px"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope='scope'>
                <el-button @click="openNewTab(scope.row)" type="primary" round>打开</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--loginData-->
          <el-table :data="loginData" v-show="activeIndex=='5-1'">
            <el-table-column prop="system" label="系统" width="140"></el-table-column>
            <el-table-column prop="loginName" label="登录名"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
          </el-table>

          <div v-if="activeIndex=='5-2'">
            <!-- urlParam -->
            <el-form :model="urlParam" label-width="80px" ref="urlParam">
              <el-row>
                <el-col :span="rowspan">
                  <el-form-item label="IP：" prop="ip" required>
                    <el-input placeholder="ip" v-model="urlParam.ip" @blur="joinUrlParams">
                      <template slot="prepend">Http://</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="rowspan">
                  <el-form-item label="端口：" prop="port" required @blur="joinUrlParams">
                    <el-input v-model="urlParam.port" placeholder="port"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="rowspan">
                  <el-form-item label="server：" prop="server" required>
                    <el-input v-model="urlParam.server" placeholder="server" @blur="joinUrlParams"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="rowspan">
                  <el-form-item label="方式：" prop="method" required>
                    <el-select v-model="urlParam.method" placeholder="请求方式：">
                      <el-option label="GET" value="get"></el-option>
                      <el-option label="POST" value="post"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="mapping" prop="mapping" required>
                <el-input v-model="urlParam.mapping" placeholder="mapping" @blur="joinUrlParams"></el-input>
              </el-form-item>
              <el-form-item label="url：" prop="url">
                <el-input v-model="urlParam.url" placeholder="url"></el-input>
              </el-form-item>

            </el-form>
            <!-- paramForm -->
            <el-form :model="paramForm" label-width="80px" ref="paramForm">

              <el-row>
                <el-col :span="rowspan">
                  <el-form-item label="用户名：" prop="user" required>
                    <el-input v-model="paramForm.user" placeholder="密码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="rowspan">
                  <el-form-item label="密码：" prop="password" required>
                    <el-input v-model="paramForm.password" placeholder="密码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="result" prop="result">
                <el-input type="textarea" autosize v-model="paramForm.result" placeholder="result"></el-input>
              </el-form-item>
              <el-form-item label="token" prop="token">
                <el-input type="textarea" autosize v-model="paramForm.token" placeholder="token"></el-input>
              </el-form-item>
              <el-form-item label="headers" prop="headers" v-show="paramForm.headers!=''">
                <el-input type="textarea" autosize v-model="paramForm.headers" placeholder="headers"></el-input>
              </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="resetForm('paramForm')">清 空</el-button>
              <el-button type="primary" @click="sendRequest('urlParam')">获 取</el-button>
            </div>
          </div>

        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="获取token" :visible.sync="tokenDialogVisible" center :before-close="closeTokenDialog" v-cloak>
      <el-form :model="urlParam" label-width="80px" ref="urlParam">
        <el-row>
          <el-col :span="rowspan">
            <el-form-item label="IP：" prop="ip" required>
              <el-input placeholder="ip" v-model="urlParam.ip" @blur="joinUrlParams">
                <!-- <template slot="prepend">Http://</template> -->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="rowspan">
            <el-form-item label="端口：" prop="port" required @blur="joinUrlParams">
              <el-input v-model="urlParam.port" placeholder="port"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="rowspan">
            <el-form-item label="server：" prop="server" required>
              <el-input v-model="urlParam.server" placeholder="server" @blur="joinUrlParams"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="rowspan">
            <el-form-item label="方式：" prop="method" required>
              <el-select v-model="urlParam.method" placeholder="请求方式：">
                <el-option label="GET" value="get"></el-option>
                <el-option label="POST" value="post"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="url：" prop="url">
          <el-input v-model="urlParam.url" placeholder="url"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="tokenForm" label-width="80px" ref="tokenForm">
        <el-row>
          <el-col :span="rowspan">
            <el-form-item label="用户名：" prop="user" required>
              <el-input v-model="tokenForm.user" placeholder="密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="rowspan">
            <el-form-item label="密码：" prop="password" required>
              <el-input v-model="tokenForm.password" placeholder="密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="result" prop="result">
          <el-input type="textarea" autosize v-model="tokenForm.result" placeholder="result"></el-input>
        </el-form-item>
        <el-form-item label="token" prop="token">
          <el-input type="textarea" autosize v-model="tokenForm.token" placeholder="token"></el-input>
        </el-form-item>
        <el-form-item label="headers" prop="headers" v-show="tokenForm.headers!=''">
          <el-input type="textarea" autosize v-model="tokenForm.headers" placeholder="headers"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTokenDialog()">取 消</el-button>
        <el-button type="primary" @click="getToken()">获 取</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        rowspan: 12,
        tokenDialogVisible: false,
        activeIndex: '5-2',
        frontData: [
          {name: 'front-公司', link: 'http://192.168.32.46:8083/aplanmis-front/'},
          {name: 'front-家', link: 'http://localhost:8083/aplanmis-front/'},
          {name: 'front-174', link: 'http://39.107.139.174:8083/aplanmis-front/'},
          {name: '菜单管理-公司', link: 'http://192.168.32.46:8083/aplanmis-front/opus/admin/menu/index.html'},
          {name: 'front-应用管理-公司', link: 'http://192.168.32.46:8083/aplanmis-front/opus/admin/appm/index.html'},
          {name: 'front-3.0-公司', link: 'http://192.168.32.46:8083/aplanmis-front/opus/front/index.html'},

        ],
        swaggerData: [
          {name: 'swagger-front-新', link: 'http://192.168.32.46:8083/aplanmis-front/doc.html'},
          {name: 'swagger-front-旧', link: 'http://192.168.32.46:8083/aplanmis-front/swagger-ui.html#/'},
          {name: 'swagger-mall', link: 'http://192.168.32.46:8084/aplanmis-mall/swagger-ui.html#/'},
          {name: 'swagger-cprest', link: 'http://192.168.32.46:7050/cp-rest/swagger-ui.html#'},
        ],
        mallData: [
          {name: '网厅-首页', link: 'http://192.168.32.46:8084/aplanmis-mall/rest/main/toIndexPage'},
          {name: '中介超市-首页-local', link: 'http://192.168.32.46:8084/aplanmis-mall/supermarket/main/index.html'},
          {name: '中介超市-首页-家', link: 'http://localhost:8084/aplanmis-mall/supermarket/main/index.html'},
          {name: '中介超市-agent-local', link: 'http://192.168.32.46:8084/aplanmis-mall/aea/supermarket/agentUserIndex.do'},
          {name: '中介超市-owner-local', link: 'http://192.168.32.46:8084/aplanmis-mall/aea/supermarket/ownerUserIndex.do'},
          {name: '中介超市-首页-l74', link: 'http://39.107.139.174:8084/aplanmis-mall/supermarket/main/index.html'},
        ],
        cpRestData: [
          {
            id: '1',
            name: '获取登录token',
            link: 'http://192.168.32.46:7071/aplanmis-rest/province/authentication?user=htry&password=123'
          },
          {id: '2', name: '详情首页', link: 'http://192.168.32.46:8084/aplanmis-mall/swagger-ui.html#/'},
          {
            id: '3',
            name: '蓝湖',
            link: 'https://lanhuapp.com/web/#/item/project/board?pid=74e64e67-c4b7-49e9-a9c3-b36883819ed5&teamId=016f447a-f40d-4c2b-8264-99e43e3cc9de'
          },


        ],

        loginData: [
          {system: '审批系统', loginName: 'htry', password: '123', role: '管理员'},
          {system: '审批系统', loginName: 'ckry', password: '123', role: '窗口人员'},
          {system: '中介超市', loginName: '91440904MA53E7HB22', password: 'd8o8QS31', role: '业主-管理员'},
          {system: '中介超市', loginName: '914406057247854991', password: '101hrOdH', role: '业主-管理员'},

        ],
        giteeData: [
          {
            id: 1,
            name: '4.0：planmis-project',
            link: 'https://gitee.com/fasterstrong_admin/aplanmis-project',
            desc: '4.0首页',
            children: [
              {
                id: 11,
                name: '4.0：issues',
                desc: '4.0 bug',
                link: 'https://gitee.com/fasterstrong_admin/aplanmis-project/issues'
              },
              {
                id: 12,
                name: '4.0：tags',
                link: 'https://gitee.com/fasterstrong_admin/aplanmis-project/tags',
                desc: '4.0 标签'
              },
              {
                id: 13,
                name: '4.0：branches',
                link: 'https://gitee.com/fasterstrong_admin/aplanmis-project/branches',
                desc: '4.0 分支'
              }
            ]
          },
          {
            id: 2,
            name: '3.0：construction-project',
            link: 'https://gitee.com/fasterstrong/construction-project',
            desc: '3.0首页',
            children: [
              {
                id: 21,
                name: '3.0 tags',
                link: 'https://gitee.com/fasterstrong/construction-project/tags',
                desc: '3.0标签'
              },
              {
                id: 22,
                name: '3.0 branches',
                link: 'https://gitee.com/fasterstrong/construction-project/branches',
                desc: '3.0 分支'
              }
            ]
          }
        ],
        url: '',
        tokenForm: {
          user: 'htry', password: '123', result: '', token: '', headers: '', url: '',

        },
        urlParam: {
          ip: '192.168.32.46',
          port: '7071',
          server: 'aplanmis-rest',
          method: 'get',
          mapping: '/province/authentication',
          url: ''
        },
        requestParam: {},
        paramForm: {result:'',token:'',headers:''},
        rules: {
          // account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          // checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'sang',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
      joinUrlParams: function () {
        let _this = this;
        let url = 'http://' + _this.urlParam.ip + ':' + _this.urlParam.port + '/'
            + _this.urlParam.server + '/' + _this.urlParam.mapping;
        _this.urlParam.url = url;
        return url;
      },

      closeTokenDialog: function (done) {
        this.resetForm('tokenForm');
        this.resetForm('urlParam');
        done();
      },
      //取消token彈窗
      cancelTokenDialog: function () {
        let _this = this;
        _this.resetForm('tokenForm');
        _this.resetForm('urlParam');
        _this.tokenDialogVisible = false;

      },
      resetForm: function (formName) {
        // let _this = this;
        this.resetForm('urlParam');
        // _this.resetForm(formName);
        // _this.$refs[formName].resetFields();
        // _this.$refs['urlParam'].resetFields();
      },
      handleSelect: function (key) {
        this.activeIndex = key
      },
      openNewTab: function (row) {
        window.open(row.link, '_blank')
      },
      tableRowClassName: function (row, rowIndex) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      editForm: function (row) {
        let _this = this;

        switch (row.id) {
          case '1':
            _this.tokenDialogVisible = true;
            break
        }
        _this.joinUrlParams();
      },
      getToken: function () {
        let _this = this;
        _this.axios({
          methods: _this.tokenForm.method,
          url: _this.urlParam.url,
          params: {user: _this.tokenForm.user, password: _this.tokenForm.password},
          // data: {user: _this.tokenForm.user, password: _this.tokenForm.password},
        }).then(function (response) {
          console.log(response);
          _this.tokenForm.result = JSON.stringify(response.data.result);
          _this.tokenForm.token = response.data.access_token;
          _this.tokenForm.headers = JSON.stringify(response.headers, null, "\t");
        }).catch(function (error) {
          _this.tokenForm.result = JSON.stringify(error, null, "\t")
        }).finally(function () {
        })
      },
    }
  }
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-aside {
    background-color: rgb(238, 241, 246);
    color: #333;
  }

  .el-container {
    /*height: 500px;*/
    border: 1px solid #eee
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .dialog-footer {
    text-align: center;
  }
</style>