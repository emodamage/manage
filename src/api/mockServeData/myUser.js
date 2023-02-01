import Mock from 'mockjs'

//get请求从config.url获取参数，post从config.url.body中获取参数
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|19-60' : 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    /**
     * 获取列表
     * 要带的参数 name， page， limit; name可以不填， page， limit有默认值
     * @paarm name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getUserList: config => {
        const { name, page = 1, limit = 20} = param2Obj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))


        
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
     /**
     * 增加用户
     * @param name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
     createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  }
}
