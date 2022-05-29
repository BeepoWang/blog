---
title: Nvm 使用与安装
date: 2017-12-28
tags:
 - node
 - vue
---

<!-- ![image](https://images.pexels.com/photos/1906667/pexels-photo-1906667.jpeg?auto=compress&cs=tinysrgb&dpr=1) -->

## :dart: 介绍

[nvm](https://github.com/nvm-sh/nvm) is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.

## :dart: Windows下载与安装

直接访问[:inbox_tray:](https://github.com/coreybutler/nvm-windows/releases)，选择 nvm-setup.zip。下载后直接安装皆可
![image](https://persongitbook.oss-cn-beijing.aliyuncs.com/nvmInstall.png)

![image](https://persongitbook.oss-cn-beijing.aliyuncs.com/nodePosition.png)

## :dart:  Linux使用 [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) 安装 node 环境

1. 运行命令,安装 nvm

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

![](https://persongitbook.oss-cn-beijing.aliyuncs.com/nvm-install.png?versionId=CAEQIxiBgMCD28nGgBgiIGRiZjc1YjRhODE4NzQ2YWZhMDRhMzcxNjlkMTdkM2Qw)

2. 查看 nvm 配置文件是生成，可以查看 .bash_profile / .bashrc 文件，查看下配置信息写入了那个文件，然后运行命令，是配置生效,运行命令安装相应的 node 版本即可

```
source .bashrc
```

![](https://persongitbook.oss-cn-beijing.aliyuncs.com/nvm-test.png?versionId=CAEQIxiBgMDM4NnGgBgiIGFmYzU3OTJlOWQ0NTRhYjJiYjFkZWFlNWU1OTM0ZTFk)

## :dart: 验证安装

打开命令行，直行 nvm -v 命令

![image](https://persongitbook.oss-cn-beijing.aliyuncs.com/nvmVerify.png)

## :dart: 常用命令

- `nvm install <version>` 安装指定版本，可模糊安装  
  安装 v4.4.0，既可 nvm install v4.4.0，又可 nvm install 4.4

- `nvm uninstall <version>` 删除已安装的指定版本
- `nvm use <version>` 切换使用指定版本的 node
- `nvm ls` 列出所有安装的版本
- `nvm ls-remote` 列出所有远程服务器的版本
- `nvm current` 显示当前的版本
- `nvm alias` 给不同的版本添加别名
- `nvm unalias` 删除已定义的别名
- `nvm reinstall-packages` 在当前版本 node 环境下，重新全局安装指定版本号的 npm 包



#### 参考文档

[nvm 介绍与使用](https://www.jianshu.com/p/d0e0935b150a)  
[nvm 常用命令](https://www.jianshu.com/p/7a33f2c19fea)
