const axios = require('axios')
axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=4f57dd5f-48f6-4754-b063-581f86d4bde5', {
  "msgtype": "markdown",
   "agentid" : 1,
   "markdown": {
        "content": "#### 使用Blue Ocean生成Pipeline \n > [点击](https://jenkins.io/zh/doc/tutorials/create-a-pipeline-in-blue-ocean/)"
  }
}).then(res => console.log(res)).catch(err => console.log(err))
