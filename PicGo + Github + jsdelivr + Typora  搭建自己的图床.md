## PicGo + Github + jsdelivr + Typora  搭建自己的图床

**jsDelivr** - 免费CDN加速

**https://www.jsdelivr.com/**

jsDelivr 是国外的一家优秀的公共 CDN 服务提供商，也是首个「打通中国大陆（网宿公司运营）与海外的免费 CDN 服务」

jsDelivr 有一个十分好用的功能——**它可以加速 Github 仓库的文件**。我们可以借此搭建一个免费、全球访问速度超快的图床。

### 1. github 设置

#### 1.1 创建仓库

仓库需选择为`Pubilc`，Private只有你自己能访问，显然不适合。

勾上生成README file，自动创建main分支，后面会用到，避免后续手动创建。

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/Snipaste_2020-12-13_00-53-29.jpg)

#### 1.2 获取token

进入github setting页面，在页面最下找到 `Developer settings`，点击`Generate new token`

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213010246.jpg)

勾上`repo` 就ok了，直接到最底部点击`Generate token`

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213010654.jpg)

复制token，记到小本本里面，token只会出现一次，以后就不见了。

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213010825.jpg)

### 2. 下载PicGo

#### 2.1 下载&安装

[github地址]: https://github.com/Molunerfinn/picgo/releases

#### 2.2配置

仓库名：github仓库地址

分支：创建github仓库时，默认创建的main分支

Token：github token，上面记到小本本里面的

![image-20201213011321327](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213011327.png)

### 3. 设置Typora

#### 3.1 下载&安装

[官网]: https://typora.io/#windows

#### 3.2 配置

点击左上角文件，点击偏好设置，配置好你安装的PicGo地址就ok了。

![image-20201213011812284](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213011813.png)

验证一下，大功告成。

![image-20201213012020897](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213012036.png)

#### 3.3 快速上传

在Typora里面支持ctrl + v直接粘贴图片，点击图片鼠标右键，点击上传图片就ok了。

![image-20201213012311880](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213012315.png)

### 4. jsdelivr 加速

直接使用下面的链接访问github资源就ok了

```
https://cdn.jsdelivr.net/gh/github名字/仓库名@分支
```

示例

[转换前]: https://raw.githubusercontent.com/claude-hub/cloud-img/main/2020/20201213012036.png
[转换后]: https://cdn.jsdelivr.net/gh/claude-hub/cloud-img/2020/20201213012036.png

完成文档编辑后，点开Typora左下角的启用源代码模式，ctrl + f 全局替换下路径就ok了。

### 5. 压缩图片

上传图片之前建议压缩一下，可以有效加快图片载入速度

推荐TinyPNG：[https://tinypng.com](https://link.zhihu.com/?target=https%3A//tinypng.com/)

定期把github图床仓库下载下来，使用本工具压缩后，重新上传就ok了。