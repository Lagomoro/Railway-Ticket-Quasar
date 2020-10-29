<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">

      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab name="mails" label="车次" />
        <q-tab name="alarms" label="车站" />
        <q-tab name="movies" label="站站" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                      label="车次" :options="options" @filter="filterFn" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input filled v-model="date" fill-input label="出发日期"
                     :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <div class="q-pa-md" style="padding: 0px">
              <q-btn color="primary" class="full-width" label="查询余票" size="lg"/>
            </div>

          </q-form>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                      label="车站" :options="options" @filter="filterFn" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="row q-my-md" style="padding: 0px">
              <q-input filled v-model="date" fill-input label="出发日期" class="q-mr-auto" style="width:330px"
                       :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <div class="q-mx-sm" style="padding: 0px; width: 120px">
                <q-checkbox v-model="teal" label="只看高铁/动车" size="xs"/>
                <q-checkbox v-model="teal" label="只看学生票"  size="xs"/>
              </div>
            </div>

            <div class="q-pa-md" style="padding: 0px">
              <q-btn color="primary" class="full-width" label="查询余票" size="lg"/>
            </div>

          </q-form>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="row" style="padding: 0px">

              <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                        label="始发站" :options="options" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-space></q-space>
              <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="leftDrawerOpen = !leftDrawerOpen"/>
              <q-space></q-space>

              <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                        label="终到站" :options="options" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="row q-my-md" style="padding: 0px">
              <q-input filled v-model="date" fill-input label="出发日期" class="q-mr-auto" style="width:330px"
                       :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <div class="q-mx-sm" style="padding: 0px; width: 120px">
                <q-checkbox v-model="teal" label="只看高铁/动车" size="xs"/>
                <q-checkbox v-model="teal" label="只看学生票"  size="xs"/>
              </div>
            </div>

            <div class="q-pa-md" style="padding: 0px">
              <q-btn color="primary" class="full-width" label="查询余票" size="lg"/>
            </div>

          </q-form>
        </q-tab-panel>
      </q-tab-panels>

    </q-card>

  </q-page>
</template>

<script>
const stringOptions = [
  '北京', '北京西', 'Twitter', 'Apple', 'Oracle'
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + ' ' + i)
  }
  return acc
}, [])
import axios from 'axios'
import qs from 'qs'
export default {
  name: "ScheduleSearch",
  data () {
    return {
      name: null,
      age: null,
      accept: false,
      model: null,
      stringOptions,
      options: stringOptions,
      date: '09月23日',
      teal: false,
      tab: 'mails'
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            }
            else {
              const needle = val.toLowerCase()
              this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 300)
    },

    filterFnAutoselect (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            }
            else {
              const needle = val.toLowerCase()
              this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
              ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
            }
          }
        )
      }, 300)
    },

    abortFilterFn () {
      // console.log('delayed filter aborted')
    },

    ax(){
      axios({
        // 默认请求方式为get
        method: 'post',
        url: '/users/test',
        // 传递参数
        params: {
        },
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        console.log(res);
      }).catch(error => {
        // 请求失败，
        console.log(error);
      });
      /*this.$axios.get('/users/test', qs.stringify({

      }))
        .then(successResponse => {
          if (successResponse.data === "success") {
            console.log(successResponse.data)
            // var path = _this.$route.query.redirect
            // eslint-disable-next-line standard/object-curly-even-spacing
            _this.$router.replace({path: '/index' })
            this.$message({
              showClose: true,
              message: '登陆成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '用户名或密码错误',
              type: 'error'
            })
          }
        })*/

    }
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-top: -100px;
}
</style>
