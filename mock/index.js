(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('url'), require('moment'), require('mockjs')) :
  typeof define === 'function' && define.amd ? define(['url', 'moment', 'mockjs'], factory) :
  (global.mock = factory(global.url,global.moment,global.mockjs,global.roadhogApiDoc));
}(this, ((url,moment,mockjs) => { 'use strict';

  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;
  mockjs = mockjs && mockjs.hasOwnProperty('default') ? mockjs['default'] : mockjs;

  // mock tableListDataSource
  let tableListDataSource = [];
  for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push({
      key: i,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${i}`,
      title: `一个任务名称 ${i}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      progress: Math.ceil(Math.random() * 100),
    });
  }

  function getRule(req, res, u) {
    let url$$1 = u;
    if (!url$$1 || Object.prototype.toString.call(url$$1) !== '[object String]') {
      url$$1 = req.url; // eslint-disable-line
    }

    const params = url.parse(url$$1, true).query;

    let dataSource = [...tableListDataSource];

    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }

    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource = [];
      status.forEach(s => {
        filterDataSource = filterDataSource.concat(
          [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
        );
      });
      dataSource = filterDataSource;
    }

    if (params.name) {
      dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }

    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }

    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }

  function postRule(req, res, u, b) {
    let url$$1 = u;
    if (!url$$1 || Object.prototype.toString.call(url$$1) !== '[object String]') {
      url$$1 = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const { method, name, desc, key } = body;

    switch (method) {
      /* eslint no-case-declarations:0 */
      case 'delete':
        tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
        break;
      case 'post':
        const i = Math.ceil(Math.random() * 10000);
        tableListDataSource.unshift({
          key: i,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name: `TradeCode ${i}`,
          title: `一个任务名称 ${i}`,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        });
        break;
      case 'update':
        tableListDataSource = tableListDataSource.map(item => {
          if (item.key === key) {
            return { ...item, desc, name };
          }
          return item;
        });
        break;
      default:
        break;
    }

    const result = {
      list: tableListDataSource,
      pagination: {
        total: tableListDataSource.length,
      },
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }

  const titles = [
    'Alipay',
    'Angular',
    'Ant Design',
    'Ant Design Pro',
    'Bootstrap',
    'React',
    'Vue',
    'Webpack',
  ];
  const avatars = [
    'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
    'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
    'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
    'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
    'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
    'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
    'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
    'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
  ];

  const avatars2 = [
    'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
    'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
    'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
    'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
    'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
  ];

  const covers = [
    'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
  ];
  const desc = [
    '那是一种内在的东西， 他们到达不了，也无法触及的',
    '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    '生命就像一盒巧克力，结果往往出人意料',
    '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    '那时候我只会想自己想要什么，从不想自己拥有什么',
  ];

  const user = [
    '付小小',
    '曲丽丽',
    '林东东',
    '周星星',
    '吴加好',
    '朱偏右',
    '鱼酱',
    '乐哥',
    '谭小仪',
    '仲尼',
  ];

  function fakeList(count) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      list.push({
        id: `fake-list-${i}`,
        owner: user[i % 10],
        title: titles[i % 8],
        avatar: avatars[i % 8],
        cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
        status: ['active', 'exception', 'normal'][i % 3],
        percent: Math.ceil(Math.random() * 50) + 50,
        logo: avatars[i % 8],
        href: 'https://ant.design',
        updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
        subDescription: desc[i % 5],
        description:
          '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        activeUser: Math.ceil(Math.random() * 100000) + 100000,
        newUser: Math.ceil(Math.random() * 1000) + 1000,
        star: Math.ceil(Math.random() * 100) + 100,
        like: Math.ceil(Math.random() * 100) + 100,
        message: Math.ceil(Math.random() * 10) + 10,
        content:
          '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        members: [
          {
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
            name: '曲丽丽',
            id: 'member1',
          },
          {
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
            name: '王昭君',
            id: 'member2',
          },
          {
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
            name: '董娜娜',
            id: 'member3',
          },
        ],
      });
    }

    return list;
  }

  let sourceData;

  function getFakeList(req, res) {

    const params = req.query;

    const count = params.count * 1 || 20;

    const result = fakeList(count);
    sourceData = result;

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }

  function postFakeList(req, res) {
    const { /* url = '', */ body } = req;
    // const params = getUrlParams(url);
    const { method, id, ...restParams } = body;

    // const count = (params.count * 1) || 20;
    let result = sourceData;

    switch (method) {
      case 'delete':
        result = result.filter(item => item.id !== id);
        break;
      case 'update':
        result.forEach((item, i) => {
          if (item.id === id) {
            result[i] = Object.assign(item, restParams);
          }
        });
        break;
      case 'post':
        result.unshift({
          ...restParams,
          id: `fake-list-${result.length}`,
          createdAt: new Date().getTime(),
        });
        break;
      default:
        break;
    }

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }

  const getNotice = [
    {
      id: 'xxx1',
      title: titles[0],
      logo: avatars[0],
      description: '那是一种内在的东西，他们到达不了，也无法触及的',
      updatedAt: new Date(),
      member: '科学搬砖组',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx2',
      title: titles[1],
      logo: avatars[1],
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      updatedAt: new Date('2017-07-24'),
      member: '全组都是吴彦祖',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx3',
      title: titles[2],
      logo: avatars[2],
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      updatedAt: new Date(),
      member: '中二少女团',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx4',
      title: titles[3],
      logo: avatars[3],
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
      updatedAt: new Date('2017-07-23'),
      member: '程序员日常',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx5',
      title: titles[4],
      logo: avatars[4],
      description: '凛冬将至',
      updatedAt: new Date('2017-07-23'),
      member: '高逼格设计天团',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx6',
      title: titles[5],
      logo: avatars[5],
      description: '生命就像一盒巧克力，结果往往出人意料',
      updatedAt: new Date('2017-07-23'),
      member: '骗你来学计算机',
      href: '',
      memberLink: '',
    },
  ];

  const getActivities = [
    {
      id: 'trend-1',
      updatedAt: new Date(),
      user: {
        name: '曲丽丽',
        avatar: avatars2[0],
      },
      group: {
        name: '高逼格设计天团',
        link: 'http://github.com/',
      },
      project: {
        name: '六月迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
    {
      id: 'trend-2',
      updatedAt: new Date(),
      user: {
        name: '付小小',
        avatar: avatars2[1],
      },
      group: {
        name: '高逼格设计天团',
        link: 'http://github.com/',
      },
      project: {
        name: '六月迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
    {
      id: 'trend-3',
      updatedAt: new Date(),
      user: {
        name: '林东东',
        avatar: avatars2[2],
      },
      group: {
        name: '中二少女团',
        link: 'http://github.com/',
      },
      project: {
        name: '六月迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
    {
      id: 'trend-4',
      updatedAt: new Date(),
      user: {
        name: '周星星',
        avatar: avatars2[4],
      },
      project: {
        name: '5 月日常迭代',
        link: 'http://github.com/',
      },
      template: '将 @{project} 更新至已发布状态',
    },
    {
      id: 'trend-5',
      updatedAt: new Date(),
      user: {
        name: '朱偏右',
        avatar: avatars2[3],
      },
      project: {
        name: '工程效能',
        link: 'http://github.com/',
      },
      comment: {
        name: '留言',
        link: 'http://github.com/',
      },
      template: '在 @{project} 发布了 @{comment}',
    },
    {
      id: 'trend-6',
      updatedAt: new Date(),
      user: {
        name: '乐哥',
        avatar: avatars2[5],
      },
      group: {
        name: '程序员日常',
        link: 'http://github.com/',
      },
      project: {
        name: '品牌迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
  ];

  function getFakeCaptcha(req, res) {
    if (res && res.json) {
      res.json('captcha-xxx');
    } else {
      return 'captcha-xxx';
    }
  }

  // mock data
  const visitData = [];
  const beginDay = new Date().getTime();

  const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
  for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY[i],
    });
  }

  const visitData2 = [];
  const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
  for (let i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY2[i],
    });
  }

  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  const searchData = [];
  for (let i = 0; i < 50; i += 1) {
    searchData.push({
      index: i + 1,
      keyword: `搜索关键词-${i}`,
      count: Math.floor(Math.random() * 1000),
      range: Math.floor(Math.random() * 100),
      status: Math.floor((Math.random() * 10) % 2),
    });
  }
  const salesTypeData = [
    {
      x: '家用电器',
      y: 4544,
    },
    {
      x: '食用酒水',
      y: 3321,
    },
    {
      x: '个护健康',
      y: 3113,
    },
    {
      x: '服饰箱包',
      y: 2341,
    },
    {
      x: '母婴产品',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];

  const salesTypeDataOnline = [
    {
      x: '家用电器',
      y: 244,
    },
    {
      x: '食用酒水',
      y: 321,
    },
    {
      x: '个护健康',
      y: 311,
    },
    {
      x: '服饰箱包',
      y: 41,
    },
    {
      x: '母婴产品',
      y: 121,
    },
    {
      x: '其他',
      y: 111,
    },
  ];

  const salesTypeDataOffline = [
    {
      x: '家用电器',
      y: 99,
    },
    {
      x: '个护健康',
      y: 188,
    },
    {
      x: '服饰箱包',
      y: 344,
    },
    {
      x: '母婴产品',
      y: 255,
    },
    {
      x: '其他',
      y: 65,
    },
  ];

  const offlineData = [];
  for (let i = 0; i < 10; i += 1) {
    offlineData.push({
      name: `门店${i}`,
      cvr: Math.ceil(Math.random() * 9) / 10,
    });
  }
  const offlineChartData = [];
  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  const radarOriginData = [
    {
      name: '个人',
      ref: 10,
      koubei: 8,
      output: 4,
      contribute: 5,
      hot: 7,
    },
    {
      name: '团队',
      ref: 3,
      koubei: 9,
      output: 6,
      contribute: 3,
      hot: 1,
    },
    {
      name: '部门',
      ref: 4,
      koubei: 1,
      output: 6,
      contribute: 5,
      hot: 7,
    },
  ];

  //
  const radarData = [];
  const radarTitleMap = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度',
  };
  radarOriginData.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'name') {
        radarData.push({
          name: item.name,
          label: radarTitleMap[key],
          value: item[key],
        });
      }
    });
  });

  const getFakeChartData = {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    radarData,
  };

  const basicGoods = [
    {
      id: '1234561',
      name: '矿泉水 550ml',
      barcode: '12421432143214321',
      price: '2.00',
      num: '1',
      amount: '2.00',
    },
    {
      id: '1234562',
      name: '凉茶 300ml',
      barcode: '12421432143214322',
      price: '3.00',
      num: '2',
      amount: '6.00',
    },
    {
      id: '1234563',
      name: '好吃的薯片',
      barcode: '12421432143214323',
      price: '7.00',
      num: '4',
      amount: '28.00',
    },
    {
      id: '1234564',
      name: '特别好吃的蛋卷',
      barcode: '12421432143214324',
      price: '8.50',
      num: '3',
      amount: '25.50',
    },
  ];

  const basicProgress = [
    {
      key: '1',
      time: '2017-10-01 14:10',
      rate: '联系客户',
      status: 'processing',
      operator: '取货员 ID1234',
      cost: '5mins',
    },
    {
      key: '2',
      time: '2017-10-01 14:05',
      rate: '取货员出发',
      status: 'success',
      operator: '取货员 ID1234',
      cost: '1h',
    },
    {
      key: '3',
      time: '2017-10-01 13:05',
      rate: '取货员接单',
      status: 'success',
      operator: '取货员 ID1234',
      cost: '5mins',
    },
    {
      key: '4',
      time: '2017-10-01 13:00',
      rate: '申请审批通过',
      status: 'success',
      operator: '系统',
      cost: '1h',
    },
    {
      key: '5',
      time: '2017-10-01 12:00',
      rate: '发起退货申请',
      status: 'success',
      operator: '用户',
      cost: '5mins',
    },
  ];

  const advancedOperation1 = [
    {
      key: 'op1',
      type: '订购关系生效',
      name: '曲丽丽',
      status: 'agree',
      updatedAt: '2017-10-03  19:23:12',
      memo: '-',
    },
    {
      key: 'op2',
      type: '财务复审',
      name: '付小小',
      status: 'reject',
      updatedAt: '2017-10-03  19:23:12',
      memo: '不通过原因',
    },
    {
      key: 'op3',
      type: '部门初审',
      name: '周毛毛',
      status: 'agree',
      updatedAt: '2017-10-03  19:23:12',
      memo: '-',
    },
    {
      key: 'op4',
      type: '提交订单',
      name: '林东东',
      status: 'agree',
      updatedAt: '2017-10-03  19:23:12',
      memo: '很棒',
    },
    {
      key: 'op5',
      type: '创建订单',
      name: '汗牙牙',
      status: 'agree',
      updatedAt: '2017-10-03  19:23:12',
      memo: '-',
    },
  ];

  const advancedOperation2 = [
    {
      key: 'op1',
      type: '订购关系生效',
      name: '曲丽丽',
      status: 'agree',
      updatedAt: '2017-10-03  19:23:12',
      memo: '-',
    },
  ];

  const advancedOperation3 = [
    {
      key: 'op1',
      type: '创建订单',
      name: '汗牙牙',
      status: 'agree',
      updatedAt: '2017-10-03  19:23:12',
      memo: '-',
    },
  ];

  const getProfileBasicData = {
    basicGoods,
    basicProgress,
  };

  const getProfileAdvancedData = {
    advancedOperation1,
    advancedOperation2,
    advancedOperation3,
  };

  const getNotices = (req, res) => {
    res.json([
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: '通知',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: '通知',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: '通知',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左侧图标用于区分不同的类型',
        datetime: '2017-08-07',
        type: '通知',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '内容不要超过两行字，超出时自动截断',
        datetime: '2017-08-07',
        type: '通知',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: '消息',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '标题',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
      },
      {
        id: '000000009',
        title: '任务名称',
        description: '任务需要在 2017-01-12 20:00 前启动',
        extra: '未开始',
        status: 'todo',
        type: '待办',
      },
      {
        id: '000000010',
        title: '第三方紧急代码变更',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '马上到期',
        status: 'urgent',
        type: '待办',
      },
      {
        id: '000000011',
        title: '信息安全考试',
        description: '指派竹尔于 2017-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        status: 'doing',
        type: '待办',
      },
      {
        id: '000000012',
        title: 'ABCD 版本发布',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '进行中',
        status: 'processing',
        type: '待办',
      },
    ]);
  };

  const fs = require('fs');

  function getJson(infoType) {
    const json = fs.readFileSync(`${__dirname}/geographic/${infoType}.json`, 'utf8');
    return JSON.parse(json);
  }

  function getProvince(req, res) {
    res.json(getJson('province'));
  }

  function getCity(req, res) {
    res.json(getJson('city')[req.params.province]);
  }

  // 是否禁用代理
  const noProxy = process.env.NO_PROXY === 'true';

  // 代码中会兼容本地 service mock 以及部署站点的静态数据
  const proxy = {
    // 支持值为 Object 和 Array
    'GET /api/currentUser': {
      $desc: '获取当前用户接口',
      $params: {
        pageSize: {
          desc: '分页',
          exp: 2,
        },
      },
      $body: {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        country: 'China',
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    },
    // GET POST 可省略
    'GET /api/users': [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ],
    'GET /api/project/notice': getNotice,
    'GET /api/activities': getActivities,
    'GET /api/rule': getRule,
    'POST /api/rule': {
      $params: {
        pageSize: {
          desc: '分页',
          exp: 2,
        },
      },
      $body: postRule,
    },
    'POST /api/forms': (req, res) => {
      res.send({ message: 'Ok' });
    },
    'GET /api/tags': mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
    'GET /api/fake_list': getFakeList,
    'POST /api/fake_list': postFakeList,
    'GET /api/fake_chart_data': getFakeChartData,
    'GET /api/profile/basic': getProfileBasicData,
    'GET /api/profile/advanced': getProfileAdvancedData,
    'POST /api/login/account': (req, res) => {
      const { password, userName, type } = req.body;
      if (password === '888888' && userName === 'admin') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
        });
        return;
      }
      if (password === '123456' && userName === 'user') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'user',
        });
        return;
      }
      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
      });
    },
    'POST /api/register': (req, res) => {
      res.send({ status: 'ok', currentAuthority: 'user' });
    },
    'GET /api/notices': getNotices,
    'GET /api/500': (req, res) => {
      res.status(500).send({
        timestamp: 1513932555104,
        status: 500,
        error: 'error',
        message: 'error',
        path: '/base/category/list',
      });
    },
    'GET /api/404': (req, res) => {
      res.status(404).send({
        timestamp: 1513932643431,
        status: 404,
        error: 'Not Found',
        message: 'No message available',
        path: '/base/category/list/2121212',
      });
    },
    'GET /api/403': (req, res) => {
      res.status(403).send({
        timestamp: 1513932555104,
        status: 403,
        error: 'Unauthorized',
        message: 'Unauthorized',
        path: '/base/category/list',
      });
    },
    'GET /api/401': (req, res) => {
      res.status(401).send({
        timestamp: 1513932555104,
        status: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
        path: '/base/category/list',
      });
    },
    'GET /api/geographic/province': getProvince,
    'GET /api/geographic/city/:province': getCity,
    'GET /api/captcha': getFakeCaptcha,
  };

  var _roadhogrc_mock = (noProxy ? {} : proxy);

  return _roadhogrc_mock;

})));
