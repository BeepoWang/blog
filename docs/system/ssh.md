---
title: windows配置多个SSH Key
date: '2022-05-03'
tags:
  - system
---

## windows 系统生成 ssh key

```bash
ssh-keygen -t rsa -C 'xxxx@xx.com'
```

![ssh-create](https://person-study.oss-cn-beijing.aliyuncs.com/ssh-create.png)

根据不同的地址生成不同的 ssh-key,通过设置生成的 ssh 文件名区分不同的 ssh,例如 `person_github`、`company_github`、`company_gitlab`

## 配置不同的 ssh-key 对应不同远程账号

在~/.shh 目录下生成 config 文件，用于配置不同的 host 对应不同的 ssh-key,每个 GitHub 账号都有一个自己的 HOST(这样就区分出了不同的 GItHub 账号)，但是每个 Host 的域名(HostName)做 CNAME 解析又都解析到 github.com(这样可以保证访问的是 GitHub, 如果你想访问码云，那么就改成码云的域名即可)。这样 SSH 就可以通过不同的 Host 区分出不同的 GitHub 账号，然后使用 Host 对应的私钥和远程的 GitHub 仓库进行连接。

```bash
Host personal.github.com
  HostName github.com # 如果要连接的远程仓库是 GitHub 保持不变，如果是其它的远程仓库就改成相应的域名
  User xxx@.xx.com # 表示用户名，可以就写 GitHub 的用户名
  IndentityFile ~/.ssh/xxx_github #  id_rsa_one 表示的是私钥名称
  PreferredAuthentications publickey

Host company.github.com
  HostName github.com
  User yyy@yy.com
  IndentityFile ~/.ssh/yyy_github
```

## 测试链接

```
ssh -T git@person.github.com

ssh -T git@company.github.com
```

## 报错提示

![ssh-warning](https://person-study.oss-cn-beijing.aliyuncs.com/shh-error.png)
解决方法：
在 config 文件中添加

```
UserKnownHostsFile ~/.ssh/known_hosts
```
