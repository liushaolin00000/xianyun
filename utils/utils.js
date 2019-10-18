export function computeTime(){
    //
    var arr_time = this.dataList.arr_time.split(':')
    var dep_time = this.dataList.dep_time.split(':')
    //出发时间和到达时间转换成分钟数
    var arr = +arr_time[0]*60+ +arr_time[1]
    var dep = +dep_time[0]*60+ +dep_time[1]
    //到达时间减去出发时间
    var result = arr - dep
    //如果超过了一天的时间就再加上24小时
    if(result<0){
        result = arr+60*24-dep
    }
    //将分钟数转换成时分显示出来
    return `${Math.floor(result/60)}时${result%60}`
}