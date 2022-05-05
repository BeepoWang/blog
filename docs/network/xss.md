---
title: XSS、XSRF、网络劫持
date: 2022-05-05
tags:
  - network
---

## XSS(Cross Site Script)

### 1.概念

<font color="#F08080">跨站脚本攻击</font>,原本缩写是 CSS，为了和样式表缩写有区别，所以叫 XSS。

XSS 是指，攻击者在网站上<font color="#F08080">注入恶意代码</font>，通过脚本进行<font color="#F08080">控制</font>或者<font color="#F08080">获取数据</font>。

XSS 分类： <font color="#F08080">反射性（非持久性）</font>、<font color="#F08080">存储型（持久性）</font>、<font color="#F08080">基于 DOM</font>

- 反射性（非持久性跨站）
  访问链接，获取用户信息，比如 cookie
- 存储型
  跨站代码存储在服务器
- DOM 跨站
  利用脚本，对本地 DOM 的恶意篡改利用

### 2.预防

- **使用 HTML 转义。**  
  对外部插入的内容要永远保持警惕,对所有外部插入的代码都应该做一次转义，将 script,& < > " ' /等危险字符做过滤和转义替换，同时尽量避免使用 innerHTML,document.write,outerHTML,eval 等方法，用安全性更高的 textContent,setAttribute 等方法做替代；
- **开启 CSP 防护**  
  内容安全策略（CSP）的设计就是为了防御 XSS 攻击的，通过在 HTTP 头部中设置 Content-Security-Policy,就可以配置该策略
- **设置 HttpOnly**  
  当然这已经是属于降低 XSS 危害的方法，对于所有包含敏感信息的 cookie，都应该在服务端对其设置 httpOnly，被设置了 httpOnly 的 cookie 字段无法通过 JS 获取，也就降低了 XSS 攻击时用户凭据隐私泄漏的风险。

## CSRF/XSRF(Cross Site Request Forgery)

### 1.概念

<font color="#F08080">跨站请求伪造</font>。通过第三方网站，不能获取 cookie，只是冒充用户的 cookie 请求服务器。是一种对网站的恶意利用
::: theorem
CSRF 的攻击流程：

1、受害者登录目标网站 A；  
2、受害者以某种方式接触到恶意网站 B 的链接；  
3、受害者点击链接访问网站 B, 网站 B 中的 js 代码执行, 偷偷向目标网站 A 发送某个请求；  
4、由于受害者登录过网站 A, 因此请求携带了网站 A 的相关 cookie 凭证，最后请求成功执行；  
:::

### 2.预防

- **SameSite Cookie**  
  浏览器针对 cookie 提供了 SameSite 的属性，该属性表示 Cookie 不随着跨域请求发送。该提案有 google 提出，美中不足的是目前还在试行阶段，存在兼容性问题。浏览器针对 cookie 提供了 SameSite 的属性，该属性表示 Cookie 不随着跨域请求发送。该提案有 google 提出，美中不足的是目前还在试行阶段，存在兼容性问题。
- **CSRF Token**  
  在用户访问网站时，后台服务器根据算法再生成一个 Token，然后把这个 Token 放在 seesion 中，当网站发起请求时，不仅要携带 cookie 凭证，还要把这个 Token 也带上，后台一起校验之后确认身份再执行操作。由于 SCRF Token 是放在 session 中，因此当第三方网站发起请求时，无法拿到这个 SCRF Token，故身份校验不再通过，就达到了防御攻击的效果。
- **同源检测**  
  Referer 和 Origin 是 http 请求的头部字段之一，用来标志该请求是从哪个页面链接过来的。因此后台服务器可以通过检查该字段是否是来自自己的网站链接，来避免第三方网站发起 CSRF 攻击。但是同源检测的可靠性并不高，比如在 302 重定向的时候，为了保护来源，http 请求不会携带 Origin 字段，而 Referer 字段会受到 Referer Policy 规则的限制而不发送。
- **增加二次验证**  
  针对一些有危险性的请求操作（比如删除账号，提现转账）我们可以增加用户的二次，比如发起手机或者邮箱验证码检验，进而降低 CSRF 打来的危害

### 3.区别

- XSS 利用站点内的信任用户，而 CSRF 则通过伪装成受信任用户的请求来
  利用受信任的网站。
- 与 XSS 攻击相比，CSRF 攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比 XSS 更具危险性。

## XS-Leaks

### 1.概念

XS-Leaks 即<font color="#F08080">跨站泄漏</font>。 XS-Leaks 利用了对 HTTP 缓存进行查询的机制，通过对资源缓存的判断进而推断出当前用户的相关信息。

### 2.预防

- **设置 SameSite Cookie；**
- **CSRF Token;**
- **浏览器支持缓存分区；**

## 网络劫持

### 1.概念

网络劫持一般指的是网络返回数据被篡改，按照修改数据的不同，我们将其分为两类

- <font color="#F08080">DNS 劫持 </font>  
  DNS 劫持主要是篡改域名解析后的 IP，访问 A 域名的时候，解析成 B 域名的 IP。

- <font color="#F08080">HTTP 劫持 </font>  
  HTTP 劫持主要是通过分析 HTTP 返回的数据并篡改（增删改），一般我们经常看到网页上有小广告，可能就是由于 HTTP 劫持造成的。

### 2.网络劫持的攻击者

我们遇到的网络劫持都是运营商们，如电信，联通，移动和一大堆二级代理运营商干的。所以我们也称其为运营商劫持。

### 3.防范

- DNS 劫持
  对于 DNS 劫持，我们真的没啥办法。不过国家对于运营商的 DNS 劫持行为也有明令禁止，所以一般现在不会有了。
- HTTP 劫持
  1. 投诉运营商，向运营商投诉，告知其如果不解决则向工信部投诉。
  2. 使用 API（MutationObserver）动态监听 DOM 的修改，判断异常 DOM（如 src 属性异常的 sciprt 标签，iframe）并及时移除
  3. 全站使用 HTTPS，包括 CDN 的回源（回源），使用 HTTPS 后就算运营商劫持了数据也无法分析加密后的数据，就无法轻易修改数据了。
  4. CSP，利用内容安全协议，设置域名白名单，过滤非法域名，这样就能阻止恶意脚本及 Iframe 的加载了。

## 参考文档

[面试-前端安全-你了解 xss 和 xsrf/csrf 吗](https://juejin.cn/post/7086703356492087304)  
[前端安全系列-网络劫持](https://juejin.cn/post/6896802990137540622)  
[温故知新：前端安全知多少](https://juejin.cn/post/6893320971462279175)
