class datePicker {
    constructor(dom) {
        this.init()
        this.mounted(dom)
    }
    // 渲染
    build(year, month) {
        let m =  this.getMonthData(year, month)
        let html = `<div class="v-datepicker__header">
                        <a href="javascript:void(0)" class="v-datepicker__btn prev">&lt;</a>
                        <span class="v-datepiker_current">${m.year}-${m.month}</span>
                        <a href="javascript:void(0)" class="v-datepicker__btn next">&gt;</a>
                    </div>
                    <div class="v-datapicker__body">
                        <table>
                            <thead>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                            </thead>
                            <tbody>`
        for (let i = 0; i < m.date.length; i++) {
            let date = m.date[i]
            if (i % 7 === 0) {
                html += `<tr>`
            }
            html += `<td>${date.showDate}</td>`
            if (i % 7 === 6) {
                html += `</tr>`
            }
        }
        html += `</tbody>
                    </table>
                </div>`
        return html
    }
    // 挂载
    mounted(dom) {
        let html = this.build()
        // document.body.innerHTML = html
        // div class="v-datepicker__wrapper" id="v-dp" ref="wraper"
        let wrapper = document.createElement('div')
        wrapper.className = 'v-datepicker__wrapper'
        wrapper.innerHTML = html
        document.body.appendChild(wrapper)
    }
    // 获取月份
    getMonthData(year, month) {
        let ret = []
        if (!year || !month) {
            let today = new Date()
            year = today.getFullYear()
            month = today.getMonth() + 1
        }
        let firstDay = new Date(year, month - 1, 1)
        let firstDayWeekDay = firstDay.getDay()
        if (firstDayWeekDay === 0) firstDayWeekDay = 7
        year = firstDay.getFullYear()
        month = firstDay.getMonth() + 1
        let lastDayofLastMonth = new Date(year, month -1, 0)
        let lastDateofLastMonth = lastDayofLastMonth.getDate()
        let preMonthDayCount = firstDayWeekDay - 1

        let lastDay = new Date(year, month, 0)
        let lastDate = lastDay.getDate()

        for (let i = 0; i < 7 * 6; i++) {
            let date = i - preMonthDayCount + 1
            let showDate = date
            let thisMonth = month
            // 上一月
            if (date <= 0) {
                thisMonth = month - 1
                showDate = lastDateofLastMonth + date
            } else if (date > lastDate) {
                thisMonth = month + 1
                showDate = showDate -lastDate
            }
            if (thisMonth === 0) thisMonth = 12
            if (thisMonth === 13) thisMonth = 1
            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            })
        }
        return {
            year: year,
            month: month,
            date: ret
        }
    }
    // 挂载为全局对象
    init() {
        window.datePicker = this
    }
}