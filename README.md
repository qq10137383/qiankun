<p align="center">
  <a href="https://qiankun.umijs.org">
    <img src="https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png" alt="qiankun" width="180" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/qiankun"><img src="https://img.shields.io/npm/v/qiankun.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://codecov.io/gh/umijs/qiankun"><img src="https://img.shields.io/codecov/c/github/umijs/qiankun.svg?style=flat-square" alt="coverage" /></a>
  <a href="https://www.npmjs.com/package/qiankun"><img src="https://img.shields.io/npm/dt/qiankun.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://travis-ci.com/umijs/qiankun"><img src="https://img.shields.io/github/workflow/status/umijs/qiankun/CI.svg?style=flat-square" alt="build status" /></a>
  <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue" alt="dumi" /></a>
</p>

# qiankun（乾坤）

This project fork qiankun framework to add customized functions

- add keepAlive options  
  when the micro application is deactivated, the DOM will not be destroyed, but will be hidden. the event will be suspended temporarily. when it is reactivated, the DOM will be re displayed and the event will be restored

## how to use

```javascript
import { start } from 'qiankun';
start({
  keepAlive: true,
});
```

## release

- v1.0.0  
  base on qiankun 2.7.0，add keepAlive options

refer to [qiankun](https://github.com/umijs/qiankun) for more options
