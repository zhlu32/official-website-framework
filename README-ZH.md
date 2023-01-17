# Official Website Framework
这是一个基于Gulp + Html + Jquery + Sass编写的快速、简单但功能齐全且非常高效的，用于构建官方网站的框架。  


# Official Website Framework满足了开发官方站点的哪些需求？  
* 适配所有主流浏览器，且支持手机端浏览。

* 采用`@@include`，实现一键引入公用布局文件内容，避免代码重复。如Nav、Footer等布局文件。
  
* 采用`gulp`构建脚本，实现开发和构建分离。如Sass布局文件，自动转换为浏览器可识别的CSS文件。
  
* 采用`browser-sync`，实现代码修改后的热部署，在浏览器中实时看到修改效果。

* 采用`gulp-uglify`，实现压缩JS文件；采用`gulp-cssnano`，实现压缩CSS文件。减小文件体积，加快网络请求。
  
* 采用`gulp-rev`，实现在在文件名尾部，自动添加文件hash值，解决浏览器缓存问题。如CSS、JS、图片、Json等。
  
* 采用`$.getJSON`访问站点Json数据文件，实现获取站点动态数据，无需后端开发。  


# Official Website Framework设计
## 约定大于配置
* js文件： src/js/  

* css文件：src/css/  css文件扩展名可以使用scss或css

* img图片： src/img/

* 公用组件： src/components/

* 站点动态数据： src/moke/**/*.json

* 构建临时目录： .tmp/
  
* 发布目录：    .dist/


# 快速开始
1. 全局安装node [下载node安装包](https://nodejs.org/zh-cn/download/)
   
2. 全局安装gulp-cli  `npm -g install gulp-cli`  
   
3. 在Official-Website-Framework目录下执行 `npm install`，下载项目依赖的三方库
   
4. 执行`npm run dev`，自动打开浏览器，访问模版站点


# 发布站点
1. 执行 `npm run publish`，用于发布的所有站点文件，生成在.dist目录
   
2. 在web服务器上安装apache，如在Linux系统上执行`apt install apache`
   
3. 在浏览器访问`ip:80`，如果看到默认的apache页面，代表安装成功
   
4. 通过命令自动安装的apache，配置文件在`/etc/nginx`目录，`sites-available/default`是发布的默认apache页面的配置文件，指向的web服务目录是`/var/www/html`，在该default配置文件中新增404页面配置后，执行`nginx -s reload`
     
   ```
   server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # add 404 pape config
        error_page 404 /404.html;
    }
   ```  
   
5. 在工程目录执行`sh deploy.sh`，实现把.dist目录内容上传到web服务器的`/var/www/html`目录
   
6. 访问`ip:80`，发布成功


# Web开发有价值站点
[Css动画库: Cross-browser Animations Lib](https://animate.style/)  

[Css重置库: A modern alternative to CSS resets](https://github.com/necolas/normalize.css)  

[Caniuse: 查看组件的浏览器版本支持情况](https://caniuse.com/)


