class datePicker {
    constructor(dom) {
        this.m = null
        this.wrapper = null
        this.show = false
        this.init()
        this.mounted(dom)
    }
    // 渲染
    build(year, month) {
        this.m =  this.getMonthData(year, month)
        let html = `<div class="v-datepicker__header">
                        <a href="javascript:void(0)" class="v-datepicker__btn prev">&lt;</a>
                        <span class="v-datepiker_current">${this.m.year}-${this.m.month}</span>
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
        for (let i = 0; i < this.m.date.length; i++) {
            let date = this.m.date[i]
            if (i % 7 === 0) {
                html += `<tr>`
            }
            html += `<td data-date="${date.date}">${date.showDate}</td>`
            if (i % 7 === 6) {
                html += `</tr>`
            }
        }
        html += `</tbody>
                    </table>
                </div>`
        return html
    }
    rendar(direction) {
        let year,month 
        if (this.m) {
            year = this.m.year
            month = this.m.month
        }
        if (direction === 'prev') month--
        if (direction === 'next') month++
        let html = this.build(year, month)
        if (!this.wrapper) {
            this.wrapper = document.createElement('div')
            document.body.appendChild(this.wrapper)
            this.wrapper.className = 'v-datepicker__wrapper'
        }
        this.wrapper.innerHTML = html
    }
    // 挂载
    mounted(dom) {
        this.rendar()
        let $input = document.querySelector('.datePicker')
        let trigger = document.querySelector('.icon')
        trigger.addEventListener('click',() => {
            if (this.show) {
                this.close()
            } else {
                this.wrapper.classList.add('show')
                let left = $input.offsetLeft
                let top = $input.offsetTop
                let h = $input.offsetHeight
                this.wrapper.style.top = top + h + 1 + 'px'
                this.wrapper.style.left = left + 'px'
                this.show = true
            }
        })
        this.wrapper.addEventListener('click', e => {
            let target = e.target
            if (!target.classList.contains('v-datepicker__btn')) return
            if (target.classList.contains('prev')) {
                this.rendar('prev')
            } else if (target.classList.contains('next')) {
                this.rendar('next')
            }
        }, false)
        this.wrapper.addEventListener('click', e => {
            let target = e.target
            if (target.tagName.toLowerCase() !== 'td') return
            let date = new Date(this.m.year, this.m.month - 1, target.dataset.date)
            $input.value = this.format(date)
            document.querySelectorAll('td').forEach(item => {
                item.classList.remove('active')
            })
            e.target.classList.add('active')
            this.close()
        })
    }
    // 关闭
    close() {
        this.wrapper.classList.remove('show')
        this.show = false
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
    // format
    format(date) {
        let ret = '';
        let padding = function(num) {
            if (num <= 9) {
                return '0' + num
            }
            return num
        }
        ret += date.getFullYear() + '-'
        ret += padding(date.getMonth() + 1) + '-'
        ret += padding(date.getDate())
        return ret
    }
}
