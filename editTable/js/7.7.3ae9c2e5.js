webpackJsonp([7],{"0BB5":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("SldL");var r=n("7hDC"),a=n.n(r),i=n("JXPH"),s=function(){return i["a"].get("/getServiceGroupTop5")},c=function(){return i["a"].get("/getServiceFlow")},o=function(){return i["a"].get("/getISPAccessRate")},u=function(){return i["a"].get("/getZoneQuityRank")},l=function(){return i["a"].get("/getRealTimeAbnormalFlow")},h=function(){return i["a"].get("/getServiceTypeTop5Rank")},f=n("gyMJ"),p={data:function(){return{titles:["业务分组占比top5趋势","全国流量趋势","各运营商接入速率","地域质量排名","实时异常流量","应用类型Top5排名"],tableData0:[],tableData1:[],tableData2:[],tableData3:[],tableData4:[],tableData5:[],loading:!1}},mounted:function(){this.fetchAll()},methods:{ajax:function(e,t){this.setData(e,t)},buildTable:function(e){return this["tableData".concat(e)]},fetchAll:function(){this.fetchServiceTop(),this.fetchServiceFlow(),this.fetchAccessRate(),this.fetchLocationRank(),this.fetchFlowRank(),this.fetchAPPTOP5()},setData:function(){var e=a()(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=this.$loading({lock:!0,text:"发布中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),a=["ServiceGroupTop5","ServiceFlow","ISPAccessRate","ZoneQuityRank","RealTimeAbnormalFlow","ServiceTypeTop5Rank"],e.next=4,Object(f["a"])({url:a[n],rows:"string"===typeof t?t:JSON.stringify(t)});case 4:i=e.sent,!0===i?(this.$message({type:"success",message:"发布数据成功"}),this.fetchAll()):this.$message({type:"error",message:"发布数据失败"}),r.close();case 7:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),fetchServiceTop:function(){var e=a()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,s();case 3:t=e.sent,t&&t.rows&&(this.tableData0=t.rows),this.loading=!1;case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fetchServiceFlow:function(){var e=a()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c();case 2:t=e.sent,t&&t.rows&&(this.tableData1=t.rows);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fetchAccessRate:function(){var e=a()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o();case 2:t=e.sent,t&&t.rows&&(this.tableData2=t.rows);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fetchLocationRank:function(){var e=a()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u();case 2:t=e.sent,t&&t.rows&&(this.tableData3=t.rows);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fetchFlowRank:function(){var e=a()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l();case 2:t=e.sent,t&&t.rows&&(this.tableData4=t.rows);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fetchAPPTOP5:function(){var e=a()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:t=e.sent,t&&t.rows&&(this.tableData5=t.rows);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{padding:"4px"}},[n("el-tabs",{attrs:{type:"border-card"}},e._l(e.titles,function(t,r){return n("el-tab-pane",{key:r,attrs:{label:t}},[n("editTable",{attrs:{index:r,title:t,tableData:e.buildTable(r)},on:{publish:e.ajax}})],1)}))],1)},w=[],v=n("XyMi"),d=!1,m=null,b=null,R=null,k=Object(v["a"])(p,g,w,d,m,b,R);t["default"]=k.exports}});