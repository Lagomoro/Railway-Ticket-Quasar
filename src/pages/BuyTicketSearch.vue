<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section v-if="first">
        <q-form @submit="onSubmit" @reset="onReset" class="">
          <div class="row" style="padding: 0px">

            <q-select filled v-model="station_start" clearable use-input hide-selected fill-input input-debounce="0"
                      :rules="[ val => val !== null && val.length > 0 || '请选择始发站']" type="text"
                      label="始发站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-space></q-space>
            <div class="q-pt-sm q-mt-xs">
              <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="onExchange"/>
            </div>
            <q-space></q-space>

            <q-select filled v-model="station_end" clearable use-input hide-selected fill-input input-debounce="0"
                      :rules="[ val => val !== null && val.length > 0 || '请选择终到站']" type="text"
                      label="终到站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="row q-mb-md" style="padding: 0px">
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
              <q-checkbox v-model="onlyHighSpeed" label="只看高铁/动车" size="xs"/>
              <q-checkbox v-model="onlyStudent" label="只看学生票"  size="xs"/>
            </div>
          </div>

          <q-btn color="primary" type="submit" class="full-width" label="查询余票" size="lg" @click="onExchange"/>

        </q-form>
      </q-card-section>
    </q-card>

    <q-page-sticky position="top" class="bg-white text-grey-8" v-if="!first">
      <q-toolbar class="full-width" style="padding: 0px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
          <div class="row full-width q-mt-lg flex flex-center" style="min-width: 1200px">
            <div class="row q-mb-auto q-mt-md" style="padding: 0px">

              <q-select filled v-model="station_start" clearable use-input hide-selected fill-input input-debounce="0"
                        :rules="[ val => val !== null && val.length > 0 || '请选择始发站']" type="text" class="q-mx-sm"
                        label="始发站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <div class="q-pt-sm q-mt-xs">
                <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="onExchange"/>
              </div>

              <q-select filled v-model="station_end" clearable use-input hide-selected fill-input input-debounce="0"
                        :rules="[ val => val !== null && val.length > 0 || '请选择终到站']" type="text" class="q-mx-sm"
                        label="终到站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <q-input filled v-model="date" fill-input label="出发日期" class="q-mt-md q-ml-sm" style="width: 250px"
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
              <q-checkbox v-model="onlyHighSpeed" label="只看高铁/动车" size="xs"/>
              <q-checkbox v-model="onlyStudent" label="只看学生票"  size="xs"/>
            </div>

            <div class="row q-mx-sm q-mb-lg q-mt-md q-pt-sm">
              <q-btn color="primary" type="submit" label="查询余票" size="md" style="width: 150px"/>
            </div>

          </div>
        </q-form>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "BuyTicketSearch",
  data () {
    return {
      first: true,

      station_start: null,
      station_end: null,
      date: null,
      onlyHighSpeed: false,
      onlyStudent: false,

      station_opts: null,
      station_opts_tmp: null
    }
  },
  methods: {
    onSubmit () {
      this.first = false;
    },
    onReset () {
      this.station_start = null;
      this.station_end = null;
      this.date = null;
      this.onlyHighSpeed = false;
      this.onlyStudent = false;
    },
    onExchange(){
      let temp = this.station_start;
      this.station_start = this.station_end;
      this.station_end = temp;
    },
    filterFn (val, update, abort) {
      if (this.station_opts_tmp !== null) {
        update(() => {
          const needle = val.toLowerCase()
          this.station_opts = this.station_opts_tmp.filter(v => v.toLowerCase().indexOf(needle) > -1)
        }, ref => {
          if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
          }
        });
        return;
      }
      axios({
        // 默认请求方式为get
        method: 'get',
        url: 'station/list',
        // 传递参数
        params: {},
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        switch (res.status){
          case 200:
            update(() => {
              this.station_opts_tmp = res.data;
              const needle = val.toLowerCase();
              this.station_opts = this.station_opts_tmp.filter(v => v.toLowerCase().indexOf(needle) > -1);
            });
            break;
          default:
            abort();
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '系统错误，请稍后尝试。',
              icon: 'warning',
              position : 'top'
            });
            break;
        }
      }).catch(error => {
        // 请求失败，
        abort();
        console.log(error);
      });
    },
    abortFilterFn () {
      // console.log('delayed filter aborted')
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
